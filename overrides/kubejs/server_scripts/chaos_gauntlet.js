// ============================================================================
//  chaos_gauntlet.js  -  Chaos Lucky Block, luck -2 "Gauntlet" event (v1 proto)
// ----------------------------------------------------------------------------
//  Scripted escape in a DISPOSABLE bedrock maze built in the sky. A lava wall creeps
//  in from behind (forced forward run); the corridor is wide with random bedrock
//  CHICANES (slalom = lost time = tension). Two random monster GROUPS are scattered
//  through the maze (each in a cleared pocket). The far end is a wall with a crimson
//  DOOR: reach it to escape home -- the ONLY thing that wipes the arena. Death / logout / the time-out
//  net leave the structure STANDING (cleared the next time a gauntlet starts); the lava also stops one
//  block short of the door, so a fire-resistant player can wade through the filled corridor to the exit.
//
//  Monster groups (2 picked at random per run, never in the start area):
//    1 Krampus | 15 Skeleton Thrashers | 2 creepers + 8 "baby" creepers |
//    2 Ghasts | 5 Mother Spiders | 1 Warden (spawned ANGRY so it charges, not burrows)
//
//  TRIGGER: scoreboard tag "lwi_gauntlet" (the Chaos LB -2 drop will set it).
//    Testing: /tag <you> add lwi_gauntlet   (then /reload after edits)
//  v1 ASSUMPTION: overworld (arena at y=300). Other dimensions / multiplayer = later.
// ============================================================================

const TAG = "lwi_gauntlet";
const MOB_TAG = "lwi_gauntlet_mob";
const TAG_SOUL = "lwi_gauntlet_soul"; // forces the soul-sand variation (plain lwi_gauntlet picks at random)
const TAG_MAGMA = "lwi_gauntlet_magma"; // forces the magma-floor (infernal, burns you) variation
const TAG_SPIDER = "lwi_gauntlet_spider"; // forces the cobweb-filled spider variation
const TAG_DARK = "lwi_gauntlet_dark"; // forces the deep-dark (sculk) variation
const ARENA_Y = 300;     // corridor floor
const BACK = 10;         // corridor behind the spawn (lava start) -> ~5 s head start
const LEN = 72;          // corridor ahead of the spawn, toward +X (to the exit)
const WIDTH = 7;         // interior width (Z)
const HEIGHT = 6;        // interior height (tall enough for a Ghast)
const CHIC_STEP = 5;     // spacing between chicanes (smaller = more turns)
const LAVA_PERIOD = 10;  // ticks between lava advances (~0.5 s) -> BACK blocks = ~5 s
const TIMEOUT = 12000;   // 10 min safety net (a fire-resistant run can linger in the lava)

const ACTIVE = {};       // uuid -> run state
const ORPHANS = [];      // arenas left standing by death/logout/time-out -> wiped at the next startGauntlet
let TICK = 0;
let SERVER = null;
let warned = false;

function rc(server, s) { try { server.runCommandSilent(s); } catch (e) {} }

function fillStr(x1, y1, z1, x2, y2, z2, block) {
  return "fill " + x1 + " " + y1 + " " + z1 + " " + x2 + " " + y2 + " " + z2 + " " + block;
}

// Player UUID -> Minecraft's [I;a,b,c,d] NBT form (pure JS: 32 hex -> 4 signed int32).
function uuidIntArray(p) {
  let hex, parts, i, v;
  try {
    hex = ("" + p.uuid).split("-").join("");
    if (hex.length !== 32) return null;
    parts = [];
    for (i = 0; i < 4; i++) {
      v = parseInt(hex.substring(i * 8, i * 8 + 8), 16) | 0;
      parts.push(v);
    }
    return "[I;" + parts[0] + "," + parts[1] + "," + parts[2] + "," + parts[3] + "]";
  } catch (e) { return null; }
}

function buildArena(server, bx, by, bz, theme) {
  let x, cx, sz, sz2, startX, floor, chTop, chBlk;
  let leftBlocked;
  startX = bx - BACK;
  // floor surface block per theme (bedrock foundation underneath either way -> no void to sink into)
  floor = theme === "soul" ? "minecraft:soul_sand" : (theme === "magma" ? "minecraft:magma_block" : (theme === "spider" ? "minecraft:cobblestone" : "minecraft:sculk"));
  rc(server, fillStr(startX - 1, by - 1, bz - 1, bx + LEN + 1, by + HEIGHT, bz + WIDTH, "minecraft:bedrock"));
  rc(server, fillStr(startX, by, bz, bx + LEN - 1, by + HEIGHT - 1, bz + WIDTH - 1, "minecraft:air"));
  rc(server, fillStr(startX - 1, by - 4, bz - 1, bx + LEN + 1, by - 2, bz + WIDTH, "minecraft:bedrock"));
  rc(server, fillStr(startX, by - 1, bz, bx + LEN, by - 1, bz + WIDTH - 1, floor));
  // far end (x = bx+LEN) stays a solid bedrock wall; a crimson door at its centre marks the exit.
  // Reaching the door ends the run (proximity check in the tick) -- no click needed.
  rc(server, "setblock " + (bx + LEN) + " " + by + " " + (bz + 3) + " minecraft:crimson_door[facing=west,half=lower,hinge=left,open=false]");
  rc(server, "setblock " + (bx + LEN) + " " + (by + 1) + " " + (bz + 3) + " minecraft:crimson_door[facing=west,half=upper,hinge=left]");
  // random chicanes (each blocks one side, leaving a passage) -- pockets clear them locally.
  // spider theme: block fewer lanes (wider transitions) AND stop short of the ceiling (headroom) so the
  // big Mother Spider can pass through / over instead of getting wedged up top.
  chTop = theme === "spider" ? (by + HEIGHT - 3) : (by + HEIGHT - 1);
  chBlk = theme === "spider" ? 3 : 5; // lanes blocked (of WIDTH) -> open passage = WIDTH - chBlk
  for (cx = bx + 7; cx < bx + LEN - 7; cx += CHIC_STEP) {
    leftBlocked = Math.random() < 0.5;
    if (leftBlocked) {
      rc(server, fillStr(cx, by, bz, cx, chTop, bz + chBlk - 1, "minecraft:bedrock"));
    } else {
      rc(server, fillStr(cx, by, bz + WIDTH - chBlk, cx, chTop, bz + WIDTH - 1, "minecraft:bedrock"));
    }
  }
  // ambience -- per theme. Decorations use "keep" so they NEVER overwrite a chicane (which would punch
  // a hole through a wall and spoil the rooms). Only the floor sculk sensors below skip keep, on purpose.
  if (theme === "soul") {
    // Nether/soul look: hanging soul lanterns + soul torches (eerie blue light). The soul_sand floor
    // itself is the gameplay twist -- it slows the runner, a meaner variation.
    for (x = startX + 2; x < bx + LEN; x += 3) {
      rc(server, "setblock " + x + " " + (by + HEIGHT - 1) + " " + (bz + 3) + " minecraft:soul_lantern[hanging=true] keep");
      rc(server, "setblock " + x + " " + by + " " + bz + " minecraft:soul_torch keep");
      rc(server, "setblock " + x + " " + by + " " + (bz + WIDTH - 1) + " minecraft:soul_torch keep");
    }
  } else if (theme === "magma") {
    // Infernal: orange glow overhead; the magma_block floor burns anything standing on it -- keep moving / jump.
    for (x = startX + 2; x < bx + LEN; x += 3) {
      rc(server, "setblock " + x + " " + (by + HEIGHT - 1) + " " + (bz + 3) + " minecraft:shroomlight keep");
      rc(server, "setblock " + x + " " + (by + HEIGHT - 1) + " " + bz + " minecraft:glowstone keep");
      rc(server, "setblock " + (x + 1) + " " + (by + HEIGHT - 1) + " " + (bz + WIDTH - 1) + " minecraft:glowstone keep");
    }
    // plenty of low obstacles on the magma floor -- jump/weave through them while it burns
    for (cx = startX + 6; cx < bx + LEN - 4; cx += 2) {
      sz = bz + 1 + Math.floor(Math.random() * (WIDTH - 2));
      rc(server, "setblock " + cx + " " + by + " " + sz + " minecraft:magma_block keep");
      if (Math.random() < 0.45) {
        sz2 = bz + 1 + Math.floor(Math.random() * (WIDTH - 2));
        rc(server, "setblock " + cx + " " + by + " " + sz2 + " minecraft:basalt keep");
      }
    }
  } else if (theme === "spider") {
    // sparse hanging lanterns -- just enough block-light to stop hostile mobs spawning in the dark
    // (otherwise the unlit corridor breeds stray skeletons/zombies that don't belong here).
    for (x = startX + 3; x < bx + LEN; x += 5) {
      rc(server, "setblock " + x + " " + (by + HEIGHT - 1) + " " + (bz + 3) + " minecraft:lantern[hanging=true] keep");
    }
    // cobweb CURTAINS every 3 blocks (not a solid mass) -- each keeps a guaranteed open lane, so the
    // corridor is heavily webbed but always walkable (you weave through the gaps).
    for (cx = startX + 5; cx < bx + LEN - 3; cx += 3) {
      sz2 = bz + 1 + Math.floor(Math.random() * (WIDTH - 2)); // one lane kept clear in this curtain
      for (sz = bz; sz < bz + WIDTH; sz++) {
        if (sz !== sz2 && Math.random() < 0.5) {
          rc(server, "setblock " + cx + " " + by + " " + sz + " minecraft:cobweb keep");
          if (Math.random() < 0.4) { rc(server, "setblock " + cx + " " + (by + 1) + " " + sz + " minecraft:cobweb keep"); }
        }
      }
    }
  } else {
    for (x = startX + 2; x < bx + LEN; x += 4) {
      rc(server, "setblock " + x + " " + by + " " + bz + " minecraft:candle[lit=true,candles=2] keep");
      rc(server, "setblock " + x + " " + by + " " + (bz + WIDTH - 1) + " minecraft:candle[lit=true,candles=1] keep");
      rc(server, "setblock " + (x + 1) + " " + (by + HEIGHT - 1) + " " + (bz + 3) + " minecraft:weeping_vines keep");
    }
    // deep-dark alert blocks on the floor: footsteps trip these (Warden agitation + Darkness; no summons).
    for (x = startX + 3; x < bx + LEN - 2; x += 2) {
      sz = bz + 1 + Math.floor(Math.random() * (WIDTH - 2));
      rc(server, "setblock " + x + " " + (by - 1) + " " + sz + " minecraft:sculk_sensor");
      sz2 = bz + 1 + Math.floor(Math.random() * (WIDTH - 2));
      if (Math.random() < 0.35) {
        rc(server, "setblock " + x + " " + (by - 1) + " " + sz2 + " minecraft:sculk_shrieker[can_summon=false]");
      } else {
        rc(server, "setblock " + x + " " + (by - 1) + " " + sz2 + " minecraft:sculk_sensor");
      }
    }
  }
}

// Carve an open pocket (clears local chicanes) so a spawned group -- Ghasts included -- has room.
function clearPocket(server, x, by, bz) {
  rc(server, fillStr(x - 3, by, bz, x + 3, by + HEIGHT - 1, bz + WIDTH - 1, "minecraft:air"));
}

// Spawn N ground mobs around (x, bz+3) with a small jitter, all tagged for cleanup.
function spawnN(server, id, count, x, by, bz) {
  let i, jx, jz;
  for (i = 0; i < count; i++) {
    jx = x + (Math.floor(Math.random() * 5) - 2);
    jz = (bz + 3) + (Math.floor(Math.random() * 5) - 2);
    rc(server, "summon " + id + " " + jx + " " + by + " " + jz + " {Tags:[\"" + MOB_TAG + "\"],PersistenceRequired:1b}");
  }
}

// --- monster groups (each spawns its pack at a pocket centred on (x, bz+3)) ---
function gKrampus(server, p, x, by, bz)   { spawnN(server, "born_in_chaos_v1:krampus", 1, x, by, bz); }
function gDecrepit(server, p, x, by, bz)  { spawnN(server, "born_in_chaos_v1:decrepit_skeleton", 5, x, by, bz); }
function gSpiders(server, p, x, by, bz)   { spawnN(server, "born_in_chaos_v1:mother_spider", 1, x, by, bz); }
function gStalkers(server, p, x, by, bz)    { spawnN(server, "born_in_chaos_v1:nightmare_stalker", 2, x, by, bz); }
function gChaosKnight(server, p, x, by, bz) { spawnN(server, "born_in_chaos_v1:fallen_chaos_knight", 1, x, by, bz); }
function gThrasher(server, p, x, by, bz)    { spawnN(server, "born_in_chaos_v1:skeleton_thrasher", 1, x, by, bz); }

function gGhasts(server, p, x, by, bz) {
  // EnhancedAI already buffs minecraft:ghast (up to 3 fireballs/volley) -> 2 = a firestorm
  rc(server, "summon minecraft:ghast " + (x - 1) + " " + (by + 1) + " " + (bz + 3) + " {Tags:[\"" + MOB_TAG + "\"],PersistenceRequired:1b}");
  rc(server, "summon minecraft:ghast " + (x + 2) + " " + (by + 1) + " " + (bz + 3) + " {Tags:[\"" + MOB_TAG + "\"],PersistenceRequired:1b}");
}

function gCreepers(server, p, x, by, bz) {
  // 2 normal creepers + 8 Creeperlings (Majrusz's "baby" creepers)
  spawnN(server, "minecraft:creeper", 2, x, by, bz);
  spawnN(server, "majruszsdifficulty:creeperling", 8, x, by, bz);
}

function gWarden(server, p, x, by, bz) {
  let uuidNbt, anger;
  uuidNbt = uuidIntArray(p);
  // spawn ALREADY furious at the player (anger 150) so it charges instead of burrowing
  anger = uuidNbt ? (",anger:{suspects:[{uuid:" + uuidNbt + ",anger:150}]}") : "";
  // THE fix, copied from the Pink LB ancient-city warden's frozen NBT: a (near-)permanent dig_cooldown
  // in its brain. The DIG behaviour can only trigger when dig_cooldown is ABSENT, so this blocks it for
  // good. A /summon warden has none -> it could dig instantly ("tout de suite"). + persistence + anger.
  rc(server, "summon minecraft:warden " + x + " " + by + " " + (bz + 3) + " {Tags:[\"" + MOB_TAG + "\"],PersistenceRequired:1b,Brain:{memories:{\"minecraft:dig_cooldown\":{value:{},ttl:2000000000L}}}" + anger + "}");
}

function spawnMobs(server, p, g) {
  let bx, by, bz, lo, hi, mid, groups, a, b, x1, x2;
  bx = g.bx; by = g.by; bz = g.bz;
  lo = bx + 14;          // never in the start area
  hi = bx + LEN - 6;     // nor against the exit door
  mid = Math.floor((lo + hi) / 2);
  if (g.theme === "magma") {
    spawnMagmaCubes(server, by, bz, lo, hi); // magma theme = ONLY magma cubes (fire-proof, thematic)
    return;
  }
  if (g.theme === "spider") {
    spawnSpiderQueens(server, by, bz, lo, hi); // spider theme = 1 Mother Spider amid the cobwebs
    return;
  }
  groups = [gKrampus, gDecrepit, gCreepers, gGhasts, gSpiders, gWarden, gStalkers, gChaosKnight, gThrasher];
  a = Math.floor(Math.random() * groups.length);
  b = Math.floor(Math.random() * groups.length);
  while (b === a) { b = Math.floor(Math.random() * groups.length); }
  x1 = lo + 3 + Math.floor(Math.random() * (mid - lo - 6));   // first half
  x2 = mid + 3 + Math.floor(Math.random() * (hi - mid - 6));  // second half
  clearPocket(server, x1, by, bz);
  clearPocket(server, x2, by, bz);
  placeGroup(server, p, g, groups[a], x1);
  placeGroup(server, p, g, groups[b], x2);
}

// Spawn a group at x -- EXCEPT the Warden, which is deferred (stored on g): it emerges only when the
// player nears its pocket, so the moving player is in detection range and it locks on at once instead
// of getting bored and digging away.
function placeGroup(server, p, g, fn, x) {
  if (fn === gWarden) {
    g.wardenX = x;
    g.wardenPending = true;
  } else {
    fn(server, p, x, g.by, g.bz);
  }
}

// magma theme extra: 5 fire-proof magma cubes scattered through the maze (they don't burn on the floor).
function spawnMagmaCubes(server, by, bz, lo, hi) {
  let i, mx, mz;
  for (i = 0; i < 5; i++) {
    mx = lo + 3 + Math.floor(Math.random() * (hi - lo - 6));
    mz = bz + 1 + Math.floor(Math.random() * (WIDTH - 2));
    rc(server, "summon minecraft:magma_cube " + mx + " " + by + " " + mz + " {Tags:[\"" + MOB_TAG + "\"],PersistenceRequired:1b,Size:" + (1 + Math.floor(Math.random() * 2)) + "}");
  }
}

// spider theme: 1 Mother Spider prowling the webbed corridor.
function spawnSpiderQueens(server, by, bz, lo, hi) {
  let mx;
  mx = lo + 3 + Math.floor(Math.random() * (hi - lo - 6));
  // The Mother Spider has a big hitbox and used to spawn embedded in a chicane / cobweb curtain / side
  // wall (suffocation on arrival). Carve a CLEAN ROOM first -- the full corridor cross-section over a
  // 9-block stretch -- then spawn her dead-centre (bz+3) so she clears BOTH side walls. No random mz.
  rc(server, fillStr(mx - 4, by, bz, mx + 4, by + HEIGHT - 1, bz + WIDTH - 1, "minecraft:air"));
  rc(server, "summon born_in_chaos_v1:mother_spider " + mx + " " + by + " " + (bz + 3) + " {Tags:[\"" + MOB_TAG + "\"],PersistenceRequired:1b}");
}

function wipeArena(server, bx, by, bz) {
  let startX;
  startX = bx - BACK;
  rc(server, "kill @e[tag=" + MOB_TAG + ",x=" + (startX - 2) + ",y=" + (by - 3) + ",z=" + (bz - 2) + ",dx=" + (LEN + BACK + 8) + ",dy=" + (HEIGHT + 6) + ",dz=" + (WIDTH + 4) + "]");
  rc(server, fillStr(startX - 2, by - 5, bz - 2, bx + LEN + 6, by + HEIGHT + 1, bz + WIDTH + 1, "minecraft:air"));
}

function findPlayer(server, uuid) {
  let found;
  found = null;
  server.players.forEach(p => { if (("" + p.uuid) === uuid) found = p; });
  return found;
}

function startGauntlet(server, p, theme) {
  let uuid, bx, by, bz, i;
  // wipe any arenas left standing by earlier deaths / logouts / time-outs before building a fresh one
  for (i = 0; i < ORPHANS.length; i++) { wipeArena(server, ORPHANS[i].bx, ORPHANS[i].by, ORPHANS[i].bz); }
  ORPHANS.length = 0;
  uuid = "" + p.uuid;
  rc(server, "tag " + p.username + " remove " + TAG);
  rc(server, "tag " + p.username + " remove " + TAG_SOUL);
  rc(server, "tag " + p.username + " remove " + TAG_MAGMA);
  rc(server, "tag " + p.username + " remove " + TAG_SPIDER);
  rc(server, "tag " + p.username + " remove " + TAG_DARK);
  bx = Math.floor(p.x);
  by = ARENA_Y;
  bz = Math.floor(p.z);
  ACTIVE[uuid] = {
    user: p.username,
    ox: Math.floor(p.x) + 0.5, oy: p.y, oz: Math.floor(p.z) + 0.5,
    bx: bx, by: by, bz: bz,
    lavaX: bx - BACK, startTick: TICK, lastAdv: TICK,
    theme: theme, lavaPeriod: (theme === "magma" ? 6 : (theme === "spider" ? 13 : LAVA_PERIOD))
  };
  try { p.persistentData.putBoolean("lwiGauntlet", true); } catch (e) {}
  buildArena(server, bx, by, bz, theme);
  spawnMobs(server, p, ACTIVE[uuid]); // 2 random groups, scattered, none in the start area
  rc(server, "tp " + p.username + " " + bx + " " + by + " " + (bz + 3) + " -90 0");
  rc(server, fillStr(bx - BACK, by, bz, bx - BACK, by + HEIGHT - 1, bz + WIDTH - 1, "minecraft:lava"));
  rc(server, "title " + p.username + " title {\"text\":\"RUN\",\"color\":\"red\",\"bold\":true}");
  rc(server, "playsound minecraft:entity.warden.emerge master " + p.username);
}

function endGauntlet(server, uuid, success, tpHome, wipe) {
  let g, p;
  g = ACTIVE[uuid];
  if (!g) return;
  p = findPlayer(server, uuid);
  if (p) {
    rc(server, "tag " + p.username + " remove " + TAG);
    rc(server, "tag " + p.username + " remove " + TAG_SOUL);
    rc(server, "tag " + p.username + " remove " + TAG_MAGMA);
    rc(server, "tag " + p.username + " remove " + TAG_SPIDER);
    rc(server, "tag " + p.username + " remove " + TAG_DARK);
    if (tpHome) { rc(server, "tp " + p.username + " " + g.ox + " " + g.oy + " " + g.oz); }
    if (success) { rc(server, "title " + p.username + " title {\"text\":\"ESCAPED!\",\"color\":\"green\",\"bold\":true}"); }
    try { p.persistentData.putBoolean("lwiGauntlet", false); } catch (e) {}
  }
  // The arena is only ERASED on a true escape (the door). Death / logout / time-out pass wipe=false:
  // the structure is LEFT STANDING (orphaned) and cleared the next time a gauntlet starts.
  if (wipe) {
    wipeArena(server, g.bx, g.by, g.bz);
  } else {
    ORPHANS.push({ bx: g.bx, by: g.by, bz: g.bz });
  }
  delete ACTIVE[uuid];
}

ServerEvents.tick(event => {
  let server;
  TICK++;
  server = event.server;
  SERVER = server;
  try {
    server.players.forEach(p => {
      let uuid, theme;
      uuid = "" + p.uuid;
      if (ACTIVE[uuid]) { return; }
      theme = null;
      if (p.tags.contains(TAG_SOUL)) { theme = "soul"; }                                  // forced soul variation
      else if (p.tags.contains(TAG_MAGMA)) { theme = "magma"; }                            // forced magma variation
      else if (p.tags.contains(TAG_SPIDER)) { theme = "spider"; }                          // forced spider variation
      else if (p.tags.contains(TAG_DARK)) { theme = "dark"; }                              // forced dark variation
      else if (p.tags.contains(TAG)) { theme = ["dark", "soul", "magma", "spider"][Math.floor(Math.random() * 4)]; } // random
      if (theme) { startGauntlet(server, p, theme); }
    });
    Object.keys(ACTIVE).forEach(uuid => {
      let g, p;
      g = ACTIVE[uuid];
      p = findPlayer(server, uuid);
      // logout: leave the arena STANDING (orphaned), no wipe -- it clears at the next gauntlet.
      if (!p) { endGauntlet(server, uuid, false, false, false); return; }
      // death/respawn (no longer inside the box): DETACH but DON'T wipe -- dying must not delete the
      // structure. It's left up (orphaned) and cleared at the next gauntlet.
      if (p.y < g.by - 5 || p.y > g.by + 12) { endGauntlet(server, uuid, false, false, false); return; }
      // time-out net: pull the player home, leave the arena standing (orphaned), no wipe.
      if (TICK - g.startTick > TIMEOUT) { endGauntlet(server, uuid, false, true, false); return; }
      // EXIT: reaching the crimson door at the far end is the ONLY thing that wipes the arena.
      if (p.x >= g.bx + LEN - 1.2 && Math.abs(p.z - (g.bz + 3.5)) <= 1.3) {
        endGauntlet(server, uuid, true, true, true);
        return;
      }
      // Warden: emerge only when the player nears its pocket, so it detects the moving player at once.
      if (g.wardenPending && p.x >= g.wardenX - 14) {
        g.wardenPending = false;
        gWarden(server, p, g.wardenX, g.by, g.bz);
      }
      // Lava creeps forward but STOPS one block short of the door -- it never ends the run and never
      // wipes. A fire-resistant player can wade through the filled corridor all the way to the exit.
      if (TICK - g.lastAdv >= g.lavaPeriod && g.lavaX < g.bx + LEN - 1) {
        g.lastAdv = TICK;
        g.lavaX += 1;
        rc(server, fillStr(g.lavaX, g.by, g.bz, g.lavaX, g.by + HEIGHT - 1, g.bz + WIDTH - 1, "minecraft:lava"));
      }
      if (p.x <= g.lavaX + 1.0) {
        rc(server, "damage " + p.username + " 6 minecraft:lava");
      }
    });
  } catch (e) {
    if (!warned) { console.warn("[chaos_gauntlet] " + e); warned = true; }
  }
});

console.info("[chaos_gauntlet] ready (give a player the tag '" + TAG + "' to trigger)");
