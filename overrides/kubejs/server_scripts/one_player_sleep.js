// Lucky World Invasion Reloaded - one sleeper carries the night.
// Sets vanilla's playersSleepingPercentage to 0, so a single player in bed skips the night for
// everyone instead of the whole team having to lie down at the same time. 0 does not mean "nobody
// has to sleep": vanilla always requires at least one sleeper whatever the percentage, so 0 is
// simply "one is enough". No effect on a solo run.
//
// Applied ONCE per world (persistentData flag), like the welcome book: if someone deliberately
// changes the rule afterwards, their choice stands instead of being overwritten at every launch.
// The flag is only set once the command has actually gone through, so a failed attempt is retried
// on the next launch rather than silently skipped forever.

ServerEvents.loaded((event) => {
  const server = event.server;

  let already = false;
  try { already = server.persistentData.getBoolean("lwiReloadedSleepRule"); } catch (e) {}
  if (already) return;

  try {
    server.runCommandSilent("gamerule playersSleepingPercentage 0");
    server.persistentData.putBoolean("lwiReloadedSleepRule", true);
  } catch (e) {}
});
