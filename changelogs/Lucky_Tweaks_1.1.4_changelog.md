# Lucky Tweaks 1.1.4

Two community bug reports, and the groundwork that lets the pack stop shipping other people's addons.

## Fixes
- **Fixed a freeze that made a world unplayable.** After a while the server stopped responding: you could still walk and place blocks, but nothing was registered and no mob moved — and it came straight back after a restart. Cause: several Lucky Block Pink drops spawn towers of eight mobs riding each other, and Enhanced AI's ranged goals divide by the distance to the target, which is zero when two mobs sit on the same spot. The resulting NaN flooded the server every tick. A projectile aimed at NaN is now discarded instead of being fired.

## Changes
- **Addon patches are applied in memory.** The pack's changes to community lucky blocks (legendary and cursed markers, progression gating, balance) no longer live inside the addons' own files: they are declared in `config/luckytweaks/drop_patches/` and applied while the addon loads. An addon update can no longer erase them silently — a patch that no longer matches is skipped with a warning in the log.
- **Missing addons are downloaded from their authors.** Any addon listed in `config/luckytweaks/addon_downloads.txt` is fetched from its official CurseForge file on first launch and checked against a pinned checksum. If the download fails the game still starts, and the log says how to install the file by hand.

## For developers
- New API: `registerPlayerFellListener` reports how the shared-lives system settled a lethal blow, `DOWNED` (still revivable) or `DIED`. Watching `LivingDeathEvent` cannot tell those apart, since a saved death is a cancelled one.
