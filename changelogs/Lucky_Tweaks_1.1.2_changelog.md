# Lucky Tweaks 1.1.2

## Fixes
- Fixed a server freeze: mobs stacked on top of each other made Enhanced AI fire at a zero distance, flooding the server every tick. A projectile aimed at nothing is now discarded. Affected worlds recover on load.

## Changes
- Addon patches are applied in memory, from `config/luckytweaks/drop_patches/`, instead of editing the addons' own files. An addon update can no longer erase them silently: a patch that no longer matches is logged.
- Addons listed in `config/luckytweaks/addon_downloads.txt` are downloaded from their official CurseForge file on first launch and checksum-verified.

## For developers
- New API: `registerPlayerFellListener` reports `DOWNED` or `DIED` when the shared-lives system settles a lethal blow, a distinction `LivingDeathEvent` cannot make since a saved death is a cancelled one.
