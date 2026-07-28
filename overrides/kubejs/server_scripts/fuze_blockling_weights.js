// =============================================================================
// LWI balance: WEIGHTED + LUCK-AWARE outcomes for the Fuze Lucky Blockling.
//
// Stock Fuze rolls all 22 outcomes uniformly (1/22). This rewrites the
// pre-rolled outcome (playerLuck, read by the procedure in playerDestroy) with
// a tier-weighted roll, BIASED by the full luck pipeline:
//   - the block's stored Luck (written by the Lucky Wand), captured by Lucky
//     Tweaks at BreakEvent (LuckState.CAPTURED, same server thread),
//   - gear bonuses (Lucky Ring) contributed via LuckyTweaksApi (LuckState.BONUS),
//   - Lucky Totem boost/curse flags from luckytools (DropTrackerState) -> force
//     a top/bottom-tier outcome, with the curse credit confirmed back.
// Weight shifting uses the Lucky Block mod's own formula:
//   f = 1/(1 - |luck|*0.0077); weight' = weight * f^(tier*sign(luck)).
//
// The blockling is opted into Wand/Totem usage through the luckytools
// `luckytools:luck_aware` block tag (added below) -- without this script that
// tag must NOT be set, the tools would scam the player.
//
// NOTE: outcome 13 suppression lives HERE (weight 0); fuze_outcome13.js is kept only as a safety
// net against external forcers -- do not raise weight 13 without removing that script's redirect.
// Tiers = the pack author's table (mirrored in luckytools FuzeBlocklingMapper;
// keep both in sync). Outcome 13 (pulsion chestplate) weight 0 = pack nerf.
// First-break hazing kept: a player's first blockling is ALWAYS outcome 14.
//
// Script name starts with fuze_b... so it loads BEFORE fuze_force8_TESTING
// (alphabetical): the test forcer still wins while it exists.
// Rhino note: ALL let/const at callback top level; try blocks only assign.
// =============================================================================

const BLOCKLING_W = "fuze_relics:lucky_blockling";

// Opt the blockling into Wand/Totem usage (luckytools refuses untagged lookalikes).
ServerEvents.tags("block", (event) => {
  event.add("luckytools:luck_aware", BLOCKLING_W);
});

// outcome -> tier (the pack author's table) and tier -> base weight totals:
// +3=6, +2=16(+13 at 0), +1=25, 0=34, -1=15, -2=6, -3=7.
//
// 102 / 103 are VIRTUAL "module" outcomes (not real Fuze branches): when one is rolled we write
// playerLuck=0 (which matches NO Fuze branch -> the blockling lays down NOTHING) and pop a backpack
// module instead. So a module is always a SINGLE, EXCLUSIVE drop, never a 2nd item on top of a Fuze
// loot. 103 = a tier-+3 issue (one of the 3 advanced modules); 102 = a tier-+2 issue (crafting OR anvil).
const MODULE_T3 = 103;
const MODULE_T2 = 102;
const OUTCOME_TIERS = {
  2: 3, 17: 3, 21: 3, 103: 3,          // grappin, nether portal gun, jetpack, advanced module
  13: 2, 15: 2, 19: 2, 20: 2, 102: 2,  // (13 pulsion = weight 0), bazooka, didier, tuny, utility module
  4: 1, 7: 1, 8: 1, 9: 1, 16: 1,       // 7 (capacity thief + bottles) demoted here from +3
  1: 0, 6: 0, 10: 0, 11: 0,
  5: -1, 18: -1, 22: -1,
  3: -2,
  12: -3, 14: -3,
};
const OUTCOME_WEIGHTS = {
  2: 1.5, 17: 1.5, 21: 1.5, 103: 1.5,
  13: 0, 15: 4, 19: 4, 20: 4, 102: 4,
  4: 5, 7: 5, 8: 5, 9: 5, 16: 5,
  1: 8.5, 6: 8.5, 10: 8.5, 11: 8.5,
  5: 5, 18: 5, 22: 5,
  3: 6,
  12: 3.5, 14: 3.5,
};
const TOP_OUTCOMES = [2, 17, 21, MODULE_T3];  // tier +3 (Totem boost): 25% each
const BOTTOM_OUTCOMES = [12, 14];             // tier -3 (Totem curse)
// LEGENDARY outcomes (preset.js -> PRESET.legendary.fuze = {"2":1,"21":1}): 2 = grappin, 21 = jetpack.
// The Totem boost now FORCES one of these (instead of TOP_OUTCOMES, which also held 17 + the module).
// Reaching any of these as the FINAL outcome (boost OR natural roll) plays the legendary fanfare and
// bumps the unified "legendary" counter. Both are already tier +3 in OUTCOME_TIERS -> boost-consistent.
const LEGENDARY_OUTCOMES = [2, 21];
// DELAYED reveal: on a legendary we suppress Fuze's immediate drop (playerLuck=0) and drop the item
// ourselves at the end of the drumroll, so it can no longer appear before its own fanfare ends.
const LEGENDARY_REVEAL_TICKS = 44; // ~2.2 s, just after the toast (40 t) -- matches the delay=2.2 of native LBs

// Backpack modules, split into their two tier groups (user 2026-06-25). A "module" outcome drops
// exactly ONE from its group. Advanced trio = +3; crafting/anvil = +2. (stack tier 4 = x16 per slot,
// moved here from the Yummy LB.)
const MODULES_T3 = [
  "sophisticatedbackpacks:stack_upgrade_tier_4",
  "sophisticatedbackpacks:advanced_void_upgrade",
  "sophisticatedbackpacks:advanced_magnet_upgrade",
];
const MODULES_T2 = [
  "sophisticatedbackpacks:crafting_upgrade",
  "sophisticatedbackpacks:anvil_upgrade",
];

let FuzeVarsW = null;
try {
  FuzeVarsW = Java.loadClass("net.mcreator.fuzerelics.network.FuzeRelicsModVariables");
} catch (e) {
  console.info("[fuze-weights] Fuze Relics absent -> weighted outcomes disabled");
}
// luckytools / luckytweaks PUBLIC APIs (optional: plain weighted roll without them).
let ToolsApi = null;
let TweaksApi = null;
try {
  ToolsApi = Java.loadClass("com.lwi.luckytools.api.LuckyToolsApi");
} catch (e) {
  console.info("[fuze-weights] luckytools absent -> no Totem support");
}
try {
  TweaksApi = Java.loadClass("com.lwi.luckytweaks.api.LuckyTweaksApi");
} catch (e) {
  console.info("[fuze-weights] luckytweaks absent -> no luck biasing");
}

function rollWeightedOutcome(luck) {
  // Same shape as the Lucky Block mod: f blows up near |luck|~130, clamp like Lucky Tweaks does.
  let l = Math.max(-100, Math.min(120, luck));
  let f = 1 / (1 - Math.abs(l) * 0.0077);
  let sign = l > 0 ? 1 : l < 0 ? -1 : 0;
  let keys = Object.keys(OUTCOME_TIERS);
  let total = 0;
  let weights = {};
  for (let k of keys) {
    let w = OUTCOME_WEIGHTS[k] * (sign === 0 ? 1 : Math.pow(f, OUTCOME_TIERS[k] * sign));
    weights[k] = w;
    total += w;
  }
  let r = Math.random() * total;
  for (let k of keys) {
    r -= weights[k];
    if (r < 0) return Number(k);
  }
  return 10; // unreachable fallback: a neutral outcome
}

function pickFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function isLegendaryOutcome(outcome) {
  let i;
  for (i = 0; i < LEGENDARY_OUTCOMES.length; i++) {
    if (LEGENDARY_OUTCOMES[i] === outcome) return true;
  }
  return false;
}

// Centralised legendary feedback for the Fuze blockling. The blockling is NOT a real Lucky Block and
// never flows through the mod-Lucky drop pipeline, so luckytweaks' draw-time legendary hook never sees
// it -> THIS is the only place the fanfare/counter run for a Fuze legendary, no double-count. Called
// exactly once, only when the FINAL outcome is legendary (boost or natural roll). Sound via vanilla
// `playsound` (the pack's validated pattern, chaos_tptroll / chaos_gauntlet): pling x5 FLAT pitch 1.0
// (0/0.4/0.8/1.2/1.6 s) then challenge_complete (2.0 s), plus particle bursts -- same sound/timeline as
// the yummy tier-3 fanfare. scheduleInTicks(ticks, cb) is the 2-arg KubeJS form.
function rc(server, s) { try { server.runCommandSilent(s); } catch (e) {} }

// `playsound`/`particle` accept an explicit world position, so the WHOLE fanfare is anchored AT THE
// BROKEN BLOCK (its centre, passed as bx/by/bz) and broadcast to `@a`: every nearby player hears the
// spatialised drumroll and sees the bursts exactly where the blockling was -- and the effect STAYS PUT
// even if the breaker walks off during the 2 s suspense. (Earlier this re-rooted `~ ~ ~` at the player
// via `execute as <player> at @s`, which made the whole fanfare FOLLOW the player around -- a visible bug.)

// One scheduled pling, fired AT THE BLOCK. MUST be its own function so `pitch`/`ticks`/coords are captured
// BY PARAMETER (a fresh scope): a `cb => {}` declared inside the loop would close over the loop variable and
// every deferred pling would fire at the LAST pitch. Same trick as chaos_tptroll.js' scheduleTp().
// The green (happy_villager) + flame bursts ride EACH pling so the suspense is VISIBLE even with sound off.
function schedulePling(server, bx, by, bz, ticks, pitch) {
  server.scheduleInTicks(ticks, cb => {
    rc(server, "playsound minecraft:block.note_block.pling master @a " + bx + " " + by + " " + bz + " 1.0 " + pitch);
    rc(server, "particle minecraft:happy_villager " + bx + " " + by + " " + bz + " 0.4 0.6 0.4 0.05 12 force @a");
    rc(server, "particle minecraft:flame " + bx + " " + by + " " + bz + " 0.4 0.6 0.4 0.02 8 force @a");
  });
}

function playLegendaryFanfare(server, bx, by, bz) {
  let pitches, i;
  // 5 FLAT plings (pitch 1.0) at 0/0.4/0.8/1.2/1.6 s (8 ticks apart) -- the pack's signature drumroll,
  // identical to the yummy tier-3 / tools jackpot fanfare (a FLAT roll, deliberately NOT a rising scale).
  pitches = [1.0, 1.0, 1.0, 1.0, 1.0];
  for (i = 0; i < 5; i++) {
    schedulePling(server, bx, by, bz, i * 8, pitches[i]);
  }
  // Final toast at 2.0 s (40 ticks).
  server.scheduleInTicks(40, cb => {
    rc(server, "playsound minecraft:ui.toast.challenge_complete master @a " + bx + " " + by + " " + bz + " 1.0 1.0");
    rc(server, "particle minecraft:happy_villager " + bx + " " + by + " " + bz + " 0.5 0.7 0.5 0.06 20 force @a");
  });
}

// The EXACT item of each Fuze legendary (plain item, no NBT -- confirmed in the bytecode).
function legendaryDropId(outcome) {
  if (outcome === 2) return "fuze_relics:grapplin_hook";
  if (outcome === 21) return "fuze_relics:jetpack_playbutton_chestplate";
  return null;
}

// Drops the legendary item at the END of the drumroll (the blockling dropped nothing: playerLuck=0).
// Silent reveal, like the Yummy one: Fuze's own sound is skipped by playerLuck=0 anyway.
// popItemFromFace only needs the position, so it still works after the block is gone.
// id/block/server are passed as PARAMETERS (fresh scope), not closed over reassigned variables.
function scheduleLegendaryReveal(server, block, outcome) {
  let id;
  id = legendaryDropId(outcome);
  if (!id) return;
  server.scheduleInTicks(LEGENDARY_REVEAL_TICKS, cb => {
    try { block.popItemFromFace(Item.of(id), "up"); }
    catch (e) { console.warn("[fuze-weights] legendary reveal skipped: " + e); }
  });
}

function bumpLegendaryCounter(player) {
  // Unified "legendary" counter (same key as native Lucky Blocks). Gate everything: missing mod /
  // changed signature must NEVER abort the outcome handler.
  let StatsApi, sp;
  try {
    StatsApi = Java.loadClass("com.lwi.luckystats.api.LuckyStatsApi");
    sp = player.minecraftPlayer; // KubeJS Player -> native ServerPlayer (extends Player)
    if (StatsApi && sp) StatsApi.incrementCounter(sp, "legendary", 1);
  } catch (e) {
    console.warn("[fuze-weights] legendary counter skipped: " + e);
  }
}

BlockEvents.broken((event) => {
  if (!FuzeVarsW) return;
  const block = event.block;
  if (!block || String(block.id) !== BLOCKLING_W) return;
  const player = event.player;
  if (!player) return;

  let vars = null;
  let outcome = -1;
  let luck = 0;
  let boost = false;
  let curse = false;
  let captured = null;
  let bonus = 0;
  let leftover = -1;
  let isLegendary = false;
  let bx = 0, by = 0, bz = 0;
  try {
    vars = player.getCapability(FuzeVarsW.PLAYER_VARIABLES_CAPABILITY).resolve().orElse(null);
    if (!vars) return;
    // Debug: the value fuze pre-rolled at the END of the previous break. If a break ever runs
    // WITHOUT this handler (ghost path), THIS is the outcome it would execute.
    leftover = Math.round(Number(vars.playerLuck));

    // Totem flags (set by luckytools at HIGH priority, same thread, before us). Read BEFORE the
    // first-break hazing so a simultaneous curse is still accounted for (audit 2026-06-12).
    if (ToolsApi) {
      boost = ToolsApi.isBoostedBreak();
      curse = ToolsApi.isCursedBreak();
    }

    // The KNOWN first-break hazing (community lore): always outcome 14, tracked by a persistent
    // stage. Deliberately NO curse confirmation here: outcome 14 is bad, but it was PREDETERMINED
    // -- the totem didn't force anything the player wouldn't have suffered anyway, so the curse
    // debt persists and re-forces a later, genuine break (same semantics as a failed delivery).
    // A boost is likewise overridden by the hazing -- accepted lore cost.
    if (!player.stages.has("lwi_fuze_first_done")) {
      player.stages.add("lwi_fuze_first_done");
      vars.playerLuck = 14;
      console.info("[fuze-weights] first break for " + player.username + " -> scripted outcome 14"
          + (curse ? " (curse NOT discharged: hazing was predetermined)" : ""));
      return;
    }
    // Luck = the block's stored Luck (Wand) + the Lucky Ring's contribution. NOTE 2026-06-25: the Ring
    // used to add LUCK via getContributedLuck(), but Lucky Tweaks moved to a percentile-chance model and
    // that method was removed (calling it threw every break and aborted the whole handler -> blockling
    // fell back to stock uniform 1/22). The Ring now contributes getContributedChance() (0..~30 percentile
    // points); we fold it into the luck bias 1:1 -- a maxed Ring (~30) roughly doubles the top-tier odds,
    // which fits an elite gear bonus.
    if (TweaksApi) {
      captured = TweaksApi.getCapturedLuck();
      bonus = Number(TweaksApi.getContributedChance());
      luck = (captured === null ? 0 : Number(captured)) + bonus;
    }

    if (boost) {
      // Totem boost now FORCES a LEGENDARY outcome (grappin / jetpack) instead of the broader top tier
      // (which also held outcome 17 + the advanced module). Detection of the boost is unchanged above.
      outcome = pickFrom(LEGENDARY_OUTCOMES);
    } else if (curse) {
      outcome = pickFrom(BOTTOM_OUTCOMES);
      // The forced bad outcome IS delivered (the procedure always runs), so confirm the curse
      // credit -- decrements the debt and shatters the totem on the last one (same contract as
      // the drop-pipeline mixin).
      if (ToolsApi) ToolsApi.confirmCurseBadDrop(player);
    } else {
      outcome = rollWeightedOutcome(luck);
    }
    // A "module" issue is virtual: suppress the Fuze drop (playerLuck=0 matches no branch -> the
    // blockling lays down nothing) and pop ONE module from its tier group instead. Real outcomes
    // (1..22) write through as-is; a module is never a 2nd drop on top of a Fuze loot.
    if (outcome === MODULE_T3) {
      vars.playerLuck = 0;
      block.popItemFromFace(Item.of(pickFrom(MODULES_T3)), "up");
    } else if (outcome === MODULE_T2) {
      vars.playerLuck = 0;
      block.popItemFromFace(Item.of(pickFrom(MODULES_T2)), "up");
    } else if (isLegendaryOutcome(outcome)) {
      // LEGENDARY: do not let Fuze drop the loot right away, or the item would land before its own
      // fanfare ends and look like a bug. playerLuck=0 -> the blockling drops nothing; we reveal the
      // item after the drumroll (2.2 s). The fanfare and the counter stay immediate.
      vars.playerLuck = 0;
      scheduleLegendaryReveal(event.server, block, outcome);
    } else {
      vars.playerLuck = outcome;
    }
    // FINAL outcome is set. If it landed on a legendary (2 grappin / 21 jetpack -- always a REAL
    // outcome, never a module), fire the fanfare ONCE and bump the unified "legendary" counter. This is
    // the sole legendary feedback for the blockling (it never reaches luckytweaks' draw-time legendary
    // hook, which only fires on real mod-Lucky drops), so no double-count. Both are wrapped so a failure
    // can't abort here.
    isLegendary = isLegendaryOutcome(outcome);
    if (isLegendary) {
      // Anchor the fanfare at the broken block's CENTRE (not the player) so it stays where the blockling
      // was, even if the player walks off during the drumroll. block.x/y/z stay valid after the break
      // (same as scheduleLegendaryReveal's deferred popItemFromFace).
      bx = block.x + 0.5;
      by = block.y + 0.5;
      bz = block.z + 0.5;
      try { playLegendaryFanfare(event.server, bx, by, bz); } catch (e) {
        console.warn("[fuze-weights] legendary fanfare skipped: " + e);
      }
      bumpLegendaryCounter(player);
    }
    // Outcome 12's knockback is a raw server-side setDeltaMovement with NO hurtMarked: player
    // motion is client-authoritative, so stock Fuze only ever delivered the push through the
    // client-side ghost run we just sanitized away. Raise the sync flag ourselves: the procedure
    // (running right after this event) adds its -2.5x look motion, and the flag ships it to the
    // client at end of tick. The push is back -- through the front door this time.
    if (outcome === 12) {
      player.hurtMarked = true;
    }
  } catch (e) {
    console.warn("[fuze-weights] failed: " + e);
    return;
  }
  console.info("[fuze-weights] outcome " + outcome
      + (isLegendary ? " [LEGENDARY -> fanfare + counter]" : "")
      + (boost ? " (TOTEM BOOST)" : curse ? " (TOTEM CURSE)" : " (luck=" + luck + ", captured=" + captured + ", bonus=" + bonus + ")")
      + " [leftover was " + leftover + "]");
});

console.info("[fuze-weights] active (tier-weighted, luck-aware blockling outcomes)");
