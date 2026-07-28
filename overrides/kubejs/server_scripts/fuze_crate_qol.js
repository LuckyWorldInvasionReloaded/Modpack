// =============================================================================
// LWI QoL: the Fuze Relics care-package CRATE normally opens ONLY on right-click
// while holding an axe (checked inside CrateOnBlockRightClickedProcedure) -- with
// zero in-game explanation. This makes it open on right-click WITHOUT an axe and
// on left-click (mining) too, by invoking Fuze's own procedure with a virtual
// armor stand holding an iron axe (the procedure only reads the entity's main
// hand; the stand is never added to the world). Loot/sound stay 100% Fuze's.
//
// Rhino note: ALL let/const at callback top level; try blocks contain only
// assignments (see fuze_outcome13.js).
// =============================================================================

const FUZE_CRATE = "fuze_relics:crate";

let CrateProc = null;
let ArmorStandClass = null;
let EquipmentSlotClass = null;
try {
  CrateProc = Java.loadClass("net.mcreator.fuzerelics.procedures.CrateOnBlockRightClickedProcedure");
  ArmorStandClass = Java.loadClass("net.minecraft.world.entity.decoration.ArmorStand");
  EquipmentSlotClass = Java.loadClass("net.minecraft.world.entity.EquipmentSlot");
} catch (e) {
  console.info("[fuze-crate] Fuze Relics absent -> crate QoL disabled");
}

const AXES = Ingredient.of("#minecraft:axes");

function lwiOpenFuzeCrate(level, pos) {
  let stand = null;
  try {
    stand = new ArmorStandClass(level, pos.x + 0.5, pos.y, pos.z + 0.5);
    stand.setItemSlot(EquipmentSlotClass.MAINHAND, Item.of("minecraft:iron_axe"));
    CrateProc.execute(level, pos.x, pos.y, pos.z, stand);
    return true;
  } catch (e) {
    console.warn("[fuze-crate] open failed: " + e);
    return false;
  }
}

// Right-click WITHOUT an axe: open anyway (with an axe, Fuze's own path already runs -- skip to
// avoid double loot).
BlockEvents.rightClicked((event) => {
  if (!CrateProc) return;
  if (String(event.block.id) !== FUZE_CRATE) return;
  if (!String(event.hand).toLowerCase().includes("main")) return;
  if (event.player && AXES.test(event.player.mainHandItem)) return;
  lwiOpenFuzeCrate(event.level, event.block.pos);
});

// Left-click (mining): cancel the vanilla break (which would just drop the crate block) and pop it
// open instead, axe or not.
BlockEvents.broken((event) => {
  if (!CrateProc) return;
  if (String(event.block.id) !== FUZE_CRATE) return;
  if (lwiOpenFuzeCrate(event.level, event.block.pos)) {
    event.cancel();
  }
});

// LWI balance (user choice): blockling outcome 8 auto-summons the supply drop on the player's
// head. Replace that with the Remote Care Package ITEM, so the player picks where and when to
// call the drop. OUTCOME-AGNOSTIC on purpose: reading playerLuck here is fragile (other scripts
// -- the outcome-13 redirect, test forcers -- may rewrite it after us, script order is
// alphabetical). Instead: after EVERY blockling break, sweep the column above 2 ticks later
// (the fuze procedure runs after this event); only outcome 8 spawns a care_package entity, so
// finding one there means outcome 8 just fired. Nearest one only.
BlockEvents.broken((event) => {
  const block = event.block;
  if (!block || String(block.id) !== "fuze_relics:lucky_blockling") return;
  const player = event.player;
  if (!player) return;
  const level = event.level;
  const x = block.pos.x;
  const y = block.pos.y;
  const z = block.pos.z;

  event.server.scheduleInTicks(2, () => {
    let removed = false;
    let axeEaten = false;
    let entities = level.getEntitiesWithin(AABB.of(x - 8, y - 2, z - 8, x + 9, y + 120, z + 9));
    for (let e of entities) {
      if (!removed && String(e.type) === "fuze_relics:care_package") {
        e.discard();
        removed = true;
      }
    }
    if (removed) {
      // Outcome 8 confirmed: also eat the freshly-spawned iron axe (it was the crate's "key";
      // the crate now opens on any click, and it contains another axe anyway). The 10-tick pickup
      // delay guarantees it is still on the ground at +2 ticks. Tight radius, one axe only.
      let nearby = level.getEntitiesWithin(AABB.of(x - 3, y - 2, z - 3, x + 4, y + 3, z + 4));
      for (let e of nearby) {
        if (!axeEaten && String(e.type) === "minecraft:item"
            && e.item && String(e.item.id) === "minecraft:iron_axe") {
          e.discard();
          axeEaten = true;
        }
      }
      player.give("fuze_relics:remote_care_package");
      player.statusMessage = Text.gold("Care package remote received!");
      console.info("[fuze-crate] outcome 8: replaced auto-drop with the remote item"
          + (axeEaten ? " (key axe removed)" : ""));
    }
  });
});

console.info("[fuze-crate] active (crate opens on any click; outcome 8 gives the remote)");
