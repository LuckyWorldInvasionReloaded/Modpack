// Lucky World Invasion Reloaded - welcome guide.
// Gives the Patchouli welcome book ("lwir:welcome") ONCE, on a player's first
// join in a world (so a fresh world spawns you with just this guide in your inventory).
// Guarded on Patchouli being loaded + a persistentData flag (never given twice per world).

PlayerEvents.loggedIn((event) => {
  const player = event.player;

  // Wait until Patchouli is installed; do nothing (and don't burn the flag) otherwise.
  if (!Platform.isLoaded("patchouli")) return;

  let already = false;
  try { already = player.persistentData.getBoolean("lwiReloadedWelcomeLetter"); } catch (e) {}
  if (already) return;

  const book = Item.of("patchouli:guide_book", {
    "patchouli:book": "patchouli:welcome",
    display: { Name: '{"text":"Lucky Book","bold":true,"color":"gold"}' }
  });
  player.give(book);
  try { player.persistentData.putBoolean("lwiReloadedWelcomeLetter", true); } catch (e) {}
});
