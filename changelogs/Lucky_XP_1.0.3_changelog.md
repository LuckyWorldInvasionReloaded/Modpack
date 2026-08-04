# Lucky XP 1.0.3

## Fixes
- Event blocks came back forever when broken by anything other than a hand: a hammer, a piston, an explosion, a vein-miner. The block reappeared four times a second while you kept everything you picked up, which duplicated items endlessly. They now stay broken, and only a structure written over them puts them back.

## Changes
- The blue bar no longer replaces the vanilla XP bar, so mods that animate that bar work again (Immersive Hotbar's animated fill, front glow, level-up particles and number pulse).
- The blue bar mirrors those same effects in blue, following your Immersive Hotbar settings when you have it, and its own defaults when you do not.
- The blue level number sits centered above its bar, like the vanilla one, and the two bars now appear and disappear together: present from spawn even when empty, hidden in creative and spectator.
- The Player Locator markers moved onto the blue bar, so a level number growing on level-up passes over them instead of under.
