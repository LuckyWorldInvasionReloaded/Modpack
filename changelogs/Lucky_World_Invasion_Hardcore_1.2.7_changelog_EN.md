# Lucky World Invasion Hardcore - 1.2.7 Update

This changelog recaps every change since 1.1.0.

## Hardcore-specific features

- Items from the various mods are no longer craftable. Weapons, armor and the rest are found in lucky blocks only.
- Lucky blocks are no longer craftable (except the Lucky World Invasion Lucky Block). You have to find them in the world.
- Born in Chaos difficulty tiers now trigger automatically on day 20 and day 30.

## Lucky Blocks added (2)

- **Chaos Lucky Block**: a new lucky block based on Born in Chaos items. Spawns alone or, more rarely, inside a chaos well (boosted odds). Infusable with some Born in Chaos resources.
- **Tools Lucky Block**: a new lucky block that drops exclusive tools (see below). The block has only a 1% chance to drop a tool. Infusable with redstone.

## Lucky tool set (8)

The **Tools Lucky Block** drops 8 tools:

- **Lucky Radar**: tracks a type of lucky block.
- **Lucky Wand**: gambles on a lucky block. Costs 1 XP level, rolls a random Luck between -50 and +100.
- **Lucky Shield**: a protective dome around a lucky block, plus Slow Falling for the user on a hard fall.
- **Lucky Spawner**: scans 3 blocks to spawn 1.
- **Lucky Totem**: boosts a lucky block for a guaranteed top-tier drop, but curses the user (3 of their next 20 drops fall to the worst tier).
- **Lucky Hammer**: sacrifice 30 lucky blocks to charge it, then repair and make a weapon or armor piece indestructible. Single use.
- **Lucky Ring**: Curios equipment. While worn, every lucky block you break raises your overall luck a little (up to +30%).
- **Lucky Belt**: Curios equipment. While worn, doubles your jackpot odds on Tools Lucky Blocks.

The ring and belt are Curios equipment: wearable at the same time in their own slots (right-click to equip). Curios already ships with the modpack.

## Lucky Stats and customizable HUD

- **Lucky Stats screen**: open it from Escape then the "Lucky Stats" button, or directly with the **L** key (rebindable). Tracks, per player and per world, your lucky blocks broken (total and by type), your Average Luck %, your legendary and cursed drops, your Lucky Wand stats, the current day, your difficulty tier, your playtime, your mob kills and the invasions you have lived through.
- **Customizable HUD**: pin any stat to the screen in game. Drag and drop to position, with per-stat color, scale, shadow and background, a global ON/OFF toggle and a Reset All button.

## Major bug fixes

Two long-standing major bugs, finally fixed in this version:

- **Luck did nothing.** A lucky block's Luck (infusion, Lucky Wand, firewell) never actually affected the quality of its drops. It now counts for real.
- **Silk Touch wiped the luck.** Mining a lucky block with Silk Touch to place it back elsewhere made it lose its luck stat. It now keeps it.

## Invasions

- Invasions now come at a regular, fixed interval, with no random variation between them.
- New mod **OptionalSuffering**: killing 40 hostile mobs ends an ongoing invasion.

## Progressive difficulty

- **Majrusz's Progressive Difficulty**: difficulty rises over time.
- **Born in Chaos**: tied to the Majrusz difficulty, its tiers get harder as the run goes on.

## Balancing

- The Fuze Relics impulse chestplate, too strong, is removed from the Lucky Blockling pool.

## Mod changes

### Mods added

- **Waystones**: fast-travel points.
- **Born in Chaos**: adds its mobs (its items and blocks are reserved for the Chaos Lucky Block).
- **Majrusz's Progressive Difficulty**: difficulty that rises over time.
- **Progressive Difficulty: Chaos Integration**: links the Majrusz difficulty to Born in Chaos.
- **Let Me Despawn**: smarter mob despawning (perf).
- **Mobtimizations**: optimizes entity and mob performance.
- **ImmediatelyFast**: speeds up UI and text rendering.
- **Flerovium**: FPS boost.
- **ClientSort**: client-side inventory sort buttons.
- **Quick Right Click**: open a crafting table or a bed with a right-click from the inventory.
- **Sophisticated Backpacks**: upgradable backpacks (filters, auto pickup).
- **OpenLoader**: loads the datapacks that tweak mod content.
- **LuckyTools** (bundled): tools dropped by the Tools Lucky Block.
- **OptionalSuffering** (bundled): lets you end an invasion early by killing mobs.
- **Quark** (bundled): kept mainly for Attribute Tooltips and a few QoL modules.
- **Zeta** (bundled): Quark dependency.

Pulled dependencies: GeckoLib, GeckoLib x Oculus compat, Majrusz Library, Sophisticated Core, Almanac Lib, CoroUtil.

### Mods removed (39)

#### Gameplay and content (6)
- **YDM's Weapon Master**: new weapon types with active abilities.
- **Lootr**: per-player instanced loot chests (no shared loot).
- **PlayerRevive**: bleed-out and ally revive instead of instant death.
- **Comforts**: sleeping bags and hammocks (sleep without a fixed bed).
- **Better Burning**: harsher fire and burning mechanics.
- **MmmMmmMmmMmm**: placeable training dummy for damage testing.

#### World generation and structures (4)
- **YUNG's Better Dungeons**: overhauled, larger vanilla dungeons.
- **YUNG's Better Strongholds**: overhauled strongholds.
- **YUNG's Better Witch Huts**: expanded witch huts.
- **YUNG's Better Nether Fortresses**: overhauled nether fortresses.

#### Maps (3)
- **Xaero's Minimap**: in-game minimap.
- **Xaero's World Map**: full-screen explorable world map.
- **XaeroPlus**: performance and feature add-on for Xaero's maps.

#### Inventory and controls (4)
- **Crafting Tweaks**: quick-clear and rotate the crafting grid.
- **Smooth Swapping**: animated item movement in inventories.
- **Staaaaaaaaaaaack (Stxck)**: configurable item stack sizes.
- **L2 Backpack**: portable backpack storage.

#### HUD, tooltips and info (9)
- **Just Enough Professions (JEP)**: villager professions shown in JEI.
- **Just Enough Resources (JER)**: mob drops and world-gen info in JEI.
- **Just Enough Effect Descriptions (JEED)**: potion effect descriptions in JEI.
- **AppleSkin**: detailed hunger and saturation HUD.
- **Legendary Tooltips**: styled tooltip frames by item rarity.
- **Item Borders**: colored inventory slot borders by rarity.
- **Pick Up Notifier**: on-screen notifications for picked-up items.
- **Durability Tooltip**: item durability shown in its tooltip.
- **Aggro Indicator**: icon above a mob when it targets you.

#### Misc QoL and tweaks (6)
- **Passive SearchBar**: search field no longer auto-grabs focus.
- **Game Menu Remove GFARB**: removes Feedback and Report-Bugs buttons from the pause menu.
- **NetherPortalFix**: return through the matching nether portal.
- **Extreme Sound Muffler**: mute specific sounds on demand.
- **Clean Swing Through Grass**: attacks no longer catch on foliage.
- **Leaves Be Gone**: clears decayed leaves.

#### Visual and audio (4)
- **Not Enough Animations**: third-person animations for actions (eating, drinking).
- **Physics Mod**: ragdolls, debris and dynamic physics effects.
- **Model Gap Fix**: removes seams and gaps in item and block models.
- **Sound Physics Remastered**: realistic sound reverb and occlusion.

#### Multiplayer and technical (3)
- **My Server Is Compatible**: bypasses client/server mod-list mismatch kicks.
- **LAN World Plug-n-Play (mcwifipnp)**: open a LAN world with automatic port-forwarding.
- **Essential Mod**: cosmetics and easy multiplayer invites.

### Resource pack removed (1)
- **Torrezx - Better Boss Bar**: boss-bar retexture.

### Orphaned libraries (7)
- **YUNG's API**: used only by the four YUNG's structure mods (removed).
- **Moonlight Lib (Selene)**: used by Target Dummy / JEED / Model Gap Fix (removed).
- **CreativeCore**: used only by PlayerRevive (removed).
- **SuperMartijn642's Core Lib**: used only by Durability Tooltip (removed).
- **SuperMartijn642's Config Lib**: used only by Durability Tooltip (removed).
- **Prism**: used by Legendary Tooltips and Item Borders (removed).
- **L2 Library**: used only by L2 Backpack (removed).

## Config tweaks

- Armor durability shown as a percentage.
- Jade and TES entity indicators disabled (avoids showing health and status twice on screen).
- Invasion settings adjusted.
