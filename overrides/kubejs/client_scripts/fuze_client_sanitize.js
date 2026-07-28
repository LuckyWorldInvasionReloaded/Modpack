// =============================================================================
// LWI fix: kill the Fuze blockling's CLIENT-SIDE ghost outcomes.
//
// LuckyBlocklingBlock.onDestroyedByPlayer runs on BOTH sides. The client-side
// run executes whatever stale outcome sits in the CLIENT copy of playerLuck --
// most branches are ServerLevel-guarded (invisible), but branch 12's knockback
// sets the player's motion CLIENT-SIDE (movement is client-authoritative): the
// player gets violently pushed with no Burger Boss. A latent stock-Fuze bug,
// made frequent by our server-side outcome rewrites (client copy lags behind).
//
// Fix: pin the LOCAL player's client copy of playerLuck to 0 every client tick.
// 0 matches no branch, so the client run does nothing; the server copy (the one
// that matters) is never touched. Sync packets from the server briefly set the
// client copy, we re-zero it next tick.
// =============================================================================

let FuzeVarsC = null;
try {
  FuzeVarsC = Java.loadClass("net.mcreator.fuzerelics.network.FuzeRelicsModVariables");
} catch (e) {}

ClientEvents.tick((event) => {
  if (!FuzeVarsC) return;
  const player = event.player;
  if (!player) return;
  let vars = null;
  try {
    vars = player.getCapability(FuzeVarsC.PLAYER_VARIABLES_CAPABILITY).resolve().orElse(null);
    if (vars && vars.playerLuck !== 0) {
      vars.playerLuck = 0;
    }
  } catch (e) {}
});
