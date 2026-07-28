// =============================================================================
// LWI balance (user 2026-06-25): the yakurum Nether Guardian Statue drops MAGIC
// CORAL x5 in CODE (NetherGuardianStatueBlock: on break without Silk Touch, 65%
// spawns a Wither Guardian, 35% pops 5 magic coral -- hardcoded amount). Cap that
// coral drop to 1-2. We catch the freshly popped ItemEntity 2 ticks after the
// break (the block's playerDestroy runs after this event) and shrink its stack.
// The 65/35 split is left untouched -- only the quantity changes.
// Rhino note: ALL let/const at callback top level; loop body only assigns.
// =============================================================================

const NETHER_STATUE = "yakurum:nether_guardian_statue";
const MAGIC_CORAL = "yakurum:magic_coral";

BlockEvents.broken((event) => {
  const block = event.block;
  if (!block || String(block.id) !== NETHER_STATUE) return;
  const level = event.level;
  const x = block.pos.x;
  const y = block.pos.y;
  const z = block.pos.z;

  event.server.scheduleInTicks(2, () => {
    let entities = level.getEntitiesWithin(AABB.of(x - 2, y - 1, z - 2, x + 3, y + 3, z + 3));
    let n = 0;
    let done = false;
    for (let e of entities) {
      if (!done && String(e.type) === "minecraft:item" && e.item
          && String(e.item.id) === MAGIC_CORAL && e.item.count > 2) {
        n = 1 + Math.floor(Math.random() * 2); // 1 or 2
        e.setItem(Item.of(MAGIC_CORAL, n));
        done = true;
      }
    }
  });
});

console.info("[nether-statue] active (magic coral drop capped to 1-2)");
