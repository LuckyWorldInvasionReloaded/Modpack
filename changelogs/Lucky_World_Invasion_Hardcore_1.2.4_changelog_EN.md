# Lucky World Invasion Hardcore - Proposed 1.2.4 update

## Hardcore-specific features

- Items from the various mods are no longer craftable — weapons, armor, etc. are found only in lucky blocks.
- Lucky blocks are no longer craftable (except the Lucky World Invasion Lucky Block) — you have to find them out in the world.
- Born in Chaos difficulty tiers now also unlock automatically on day 20 and day 30 (no longer only by entering other dimensions).

## Lucky Blocks added (2)

- **Chaos Lucky Block** (`chaosluckyblock`) - New lucky block (created by Laink) based on Born in Chaos items, with drop rates, spawn rate and power scaling similar to the Water Lucky Block. Can spawn on its own, or more rarely inside a chaos well (boosted luck). Infusable with certain Born in Chaos resources.
- **Tools Lucky Block** (`toolluckyblock`) - New lucky block (created by Laink) with 5 exclusive items that spice up Lucky Block gameplay: Lucky Radar (tracks a lucky block type), Lucky Spawner (scans 3 blocks to spawn one), Lucky Shield (protective dome around a lucky block + Slow Falling on the user when falling), Lucky Wand (gamble on a lucky block: spend 1 XP level for a random Luck between −50 and +100) and Lucky Totem (super-boosts a lucky block for a guaranteed top-tier drop, but curses the user: 3 of their next 20 drops will be the worst tier). The block has only a 1% chance to drop a tool. Infusable with redstone.

## Lucky Blocks updated (3)

- **Water Lucky Block** - v1.5.0 → v1.7.5
- **Lucky Block Pink** - 8.3 [Slash 'n Swing] → 8.4 [Everlasting Expansions]
- **FIX**: Lucky blocks can now be mined with Silk Touch and re-placed while keeping their stored luck.
- **FIX**: A lucky block's Luck (infusion, Lucky Wand, firewell wells) now genuinely affects drop quality.

## Customizable Stats & HUD (new)

- **Lucky Stats screen** — open via Escape → "Lucky Stats" button, or with the **L** hotkey (rebindable). Per-player, per-world tracking of:
  - Lucky blocks broken (total + breakdown by type, top 6 shown with their block icon).
  - **Average Luck %** — computed from the actual tier of each drop the Lucky Block mod rolls, normalised against each addon's own distribution (a Tools LB miss ≈ 50%, a jackpot ≈ 100%, a Chaos LB deadly drop ≈ 1%). Covers every loaded addon plus a dedicated handler for Fuze Relics' Lucky Blockling.
  - Legendary drops / Cursed drops counts.
  - Lucky Wand stats: rolls, total and average gambled Luck.
  - Current day, Majrusz game stage (Normal / Expert / Master), playtime, vanilla mob kills, PureSuffering invasions experienced.
- **Customizable HUD** — "Edit HUD" button on the Lucky Stats screen (or a separate rebindable key) lets you pin any of those stats to the in-game overlay.
  - Drag-and-drop placement, snaps to a 10 px grid (hold Shift for pixel-perfect mode).
  - 9 anchors (Top-Left, Top-Center, …, Bot-Right) so pinned stats stay put when the window is resized.
  - Per-stat styling: colour (8 presets), scale (75–200%), shadow toggle, background (None / Box / Outline).
  - Global on/off toggle, Reset All button, snap-to-anchor on release, collision-prevention while dragging.
  - Saved locally in `config/luckytools_hud.json` (per-client, not shared).

## Mods added (14)

- **LuckyTools** - tool set dropped by the Tools Lucky Block.
- **Waystones** - fast-travel waystones.
- **Born in Chaos** - added only for its mobs. Its items/blocks/structures are removed and reserved for the Chaos Lucky Block.
- **Majrusz's Progressive Difficulty** - difficulty that scales over time.
- **Progressive Difficulty: Chaos Integration** - bridges Majrusz difficulty with Born in Chaos.
- **Let Me Despawn** - smarter mob despawning (performance).
- **Mobtimizations** - entity/mob performance.
- **ImmediatelyFast** - faster rendering (UI/text).
- **Flerovium** - FPS boost.
- **ClientSort** - client-side inventory sorting buttons.
- **Quick Right Click** - right-click in the inventory to open a crafting table or use a bed.
- **Sophisticated Backpacks** - upgradeable backpacks with filters, auto-pickup and more.
- **OpenLoader** - loads the datapacks that adjust mod content.
- **Quark** - re-added (most modules disabled), kept mainly for **Attribute Tooltips**: shows directly in armor/tool tooltips whether a piece is better or worse than what you're wearing, plus a few QoL modules (chest searching, in-game item sharing, quick armor swapping, shulker tooltips).

**Dependencies pulled in:** Almanac Lib (Let Me Despawn), Collective (Quick Right Click), CoroUtil (Mobtimizations), GeckoLib + GeckoLib × Oculus compat (Born in Chaos), Majrusz Library (Majrusz's Progressive Difficulty), Sophisticated Core (Sophisticated Backpacks), Zeta (Quark). Balm updated 7.3.9 → 7.3.33 (Waystones needs ≥ 7.3.28). ClientSort's dependency JEI updated. Already satisfied: Embeddium via Xenon 0.3.31 (Flerovium).

## Mod config tweaks (3)

- **Inventory HUD+** - `armView`: `DAMAGE_LEFT` → `PERCENTAGE` (armor durability shown as a percentage). File `config/inventoryhud-client.toml`, section `[armorhud]`.
- **Jade** - `displayEntities` & `displayBosses`: `true` → `false` (hide the look-at tooltip for entities & bosses). File `config/jade/jade.json`.
- **TES (TslatEntityStatus)** - `inWorldBarsEnabled`: `true` → `false` (disable in-world status bars rendered above entities). File `config/tslatentitystatus-common.toml`, section `[In-World Bars Settings]`.

The Jade and TES tweaks both turn off entity/boss readouts to avoid showing the same health & status twice on screen (Jade look-at tooltip + TES in-world bars).

## Mods removed (39)

### Gameplay & content (6)

- **YDM's Weapon Master** - new weapon types with active abilities.
- **Lootr** - per-player instanced loot chests (no shared loot).
- **PlayerRevive** - bleed-out + ally revive instead of instant death.
- **Comforts** - sleeping bags & hammocks (sleep without a fixed bed).
- **Better Burning** - harsher fire/burning mechanics.
- **MmmMmmMmmMmm** - placeable training dummy for damage testing.

### World generation / structures (4)

- **YUNG's Better Dungeons** - overhauled, larger vanilla dungeons.
- **YUNG's Better Strongholds** - overhauled strongholds.
- **YUNG's Better Witch Huts** - expanded witch huts.
- **YUNG's Better Nether Fortresses** - overhauled nether fortresses.

### Maps (3)

- **Xaero's Minimap** - in-game minimap.
- **Xaero's World Map** - full-screen explorable world map.
- **XaeroPlus** - performance/feature add-on for Xaero's maps.

### Inventory & controls (4)

- **Crafting Tweaks** - quick-clear / rotate the crafting grid.
- **Smooth Swapping** - animated item movement in inventories.
- **Staaaaaaaaaaaack (Stxck)** - configurable item stack sizes.
- **L2 Backpack** - portable backpack storage.

### HUD, tooltips & info (9)

- **Just Enough Professions (JEP)** - villager professions shown in JEI.
- **Just Enough Resources (JER)** - mob drops & world-gen info in JEI.
- **Just Enough Effect Descriptions (JEED)** - potion effect descriptions in JEI.
- **AppleSkin** - detailed hunger/saturation HUD.
- **Legendary Tooltips** - styled tooltip frames by item rarity.
- **Item Borders** - colored inventory slot borders by rarity.
- **Pick Up Notifier** - on-screen notifications for picked-up items.
- **Durability Tooltip** - item durability shown in its tooltip.
- **Aggro Indicator** - icon above a mob when it targets you.

### Misc QoL & tweaks (6)

- **Passive SearchBar** - search field no longer auto-grabs focus.
- **Game Menu Remove GFARB** - removes Feedback/Report-Bugs buttons from the pause menu.
- **NetherPortalFix** - return through the matching nether portal.
- **Extreme Sound Muffler** - mute specific sounds on demand.
- **Clean Swing Through Grass** - attacks no longer catch on foliage.
- **Leaves Be Gone** - clears decayed leaves / cleaner foliage.

### Visual & audio (4)

- **Not Enough Animations** - third-person animations for actions (eating, drinking…).
- **Physics Mod** - ragdolls, debris & dynamic physics effects.
- **Model Gap Fix** - removes seams/gaps in item & block models.
- **Sound Physics Remastered** - realistic sound reverb & occlusion.

### Multiplayer & technical (3)

- **My Server Is Compatible** - bypasses client/server mod-list mismatch kicks.
- **LAN World Plug-n-Play (mcwifipnp)** - open a LAN world with automatic port-forwarding.
- **Essential Mod** - cosmetics + easy multiplayer invites.

## Resource packs removed (1)

- **Torrezx - Better Boss Bar** - boss-bar retexture.

## Orphaned libraries (7)

- **YUNG's API** - shared API; used only by the four YUNG's structure mods (removed).
- **Moonlight Lib (Selene)** - MehVahdJukaar's library; used by Target Dummy / JEED / Model Gap Fix (removed).
- **CreativeCore** - CreativeMD's library; used only by PlayerRevive (removed).
- **SuperMartijn642's Core Lib** - used only by Durability Tooltip (removed).
- **SuperMartijn642's Config Lib** - used only by Durability Tooltip (removed).
- **Prism** - Grend_G's colour library; used by Legendary Tooltips & Item Borders (removed).
- **L2 Library** - shared library; used only by L2 Backpack (removed).
