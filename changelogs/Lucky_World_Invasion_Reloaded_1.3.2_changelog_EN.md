# Lucky World Invasion Reloaded 1.3.2

## Fixes
- **Fixed a freeze that made a world unplayable.** After 50 minutes to a few hours the server stopped responding: you could walk and place blocks, but nothing was registered, nothing dropped and mobs stood still — and restarting did not help. Cause: some Pink lucky block drops spawn towers of mobs riding each other, and Enhanced AI's aiming divides by a distance that is zero when two mobs share a spot.
- Two players shopping at the same vending machine: only the first buyer got the goods, while the second player's screen still offered the article and played the whole purchase feedback for a sale that never happened. No levels were ever lost.
- Three drops that had never worked now do — one Elemental item bundle and a piece of armour from Elemental and Energy lucky blocks. They failed to load silently.

## Changes
- **Dying costs your Lucky XP.** A death takes all of it, being knocked down in multiplayer takes half, and none of it can be picked back up.
- **The community lucky block addons are no longer shipped with the pack.** They are downloaded from their authors' official CurseForge files the first time you launch, and verified. Nothing changes in game — the same blocks, the same drops. If you play offline on a brand-new install, launch once while connected.
- Removed Chinese translation files inherited from the original modpack: they were never used here.

## Mods
- Lucky Tweaks 1.1.1 → 1.1.2
- Lucky XP 1.0.1 → 1.0.2
