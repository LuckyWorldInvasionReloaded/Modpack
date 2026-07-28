// =============================================================================
// LWI balance: suppress Fuze Relics "Lucky Blockling" outcome 13 (impulse / pulsion
// chestplate, too strong for this pack).
//
// On break, the player's Fuze "playerLuck" holds the outcome that is about to fire.
// If it is 13 we rewrite it to another outcome (1..22, not 13) BEFORE the Fuze
// procedure reads it in playerDestroy, so that branch never runs.
//
// This logic used to live inside the luckytools mod; it was moved here so the mod
// stays generic (a standalone luckytools never silently rewrites another mod's loot).
// Requires Fuze Relics; no-ops cleanly if it is absent.
//
// Rhino note: ALL let/const are declared at the callback's top level; the try block
// only contains assignments. Declaring let/const inside the try throws Rhino's
// "redeclaration of var" on repeated calls.
// =============================================================================

const FUZE_BLOCKLING = "fuze_relics:lucky_blockling";

let FuzeVars = null;
try {
  FuzeVars = Java.loadClass("net.mcreator.fuzerelics.network.FuzeRelicsModVariables");
} catch (e) {
  console.info("[fuze13] Fuze Relics not present -> outcome-13 suppression disabled");
}

BlockEvents.broken((event) => {
  if (!FuzeVars) return;
  const block = event.block;
  if (!block || String(block.id) !== FUZE_BLOCKLING) return;
  const player = event.player;
  if (!player) return;

  let vars = null;
  let outcome = -1;
  let redirect = 13;
  try {
    vars = player.getCapability(FuzeVars.PLAYER_VARIABLES_CAPABILITY).resolve().orElse(null);
    if (!vars) {
      console.warn("[fuze13] could not resolve Fuze player variables");
      return;
    }
    outcome = Math.round(Number(vars.playerLuck));
    if (outcome !== 13) return;
    while (redirect === 13) redirect = 1 + Math.floor(Math.random() * 22);
    vars.playerLuck = redirect;
    console.info("[fuze13] suppressed outcome 13 -> " + redirect);
  } catch (e) {
    console.warn("[fuze13] failed: " + e);
  }
});

console.info("[fuze13] active (Fuze blockling outcome-13 suppression)");
