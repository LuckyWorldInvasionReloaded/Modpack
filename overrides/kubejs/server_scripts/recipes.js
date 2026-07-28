/**
 * Confluence trinkets that can be smelted into iron nuggets -- an early-game iron source.
 */
const CONFLUENCE_TO_IRON_NUGGET = [
  "confluence:tally_counter",
  "confluence:dps_meter",
];

// Yakurum BLOCKS that craft FROM a yakurum resource -- re-enabled (storage/deco blocks; the resources
// drop from the Water Lucky Block). Everything else yakurum stays lucky-block-only, and the reverse
// block->resource "uncraft" recipes stay disabled too (matched by recipe OUTPUT below).
const YAKURUM_CRAFTABLE_BLOCKS = [
  "aquamarine_block", "bitominous_coal_block", "bitominous_lantern", "bitominous_torch",
  "coral_crystal_block", "crystal_gem_block", "fish_tank_block", "frostarce_pearl_block",
  "guardian_block", "pearl_block", "prismarine_gem_block", "sea_shell_block",
  "triton_scale_block", "tropical_slime_block", "water_diamond_block",
];

// For each block above, keep BOTH its craft (resource->block, matched by OUTPUT) AND its block->resource
// "uncraft" (recipe id "<block>_to_item"; the 5 deco blocks have no such recipe -> harmless no-op).
const YAKURUM_KEEP = [];
YAKURUM_CRAFTABLE_BLOCKS.forEach(function (b) {
  YAKURUM_KEEP.push({ output: "yakurum:" + b });
  YAKURUM_KEEP.push({ id: "yakurum:" + b + "_to_item" });
});

/**
 * Recipe configuration.
 */
ServerEvents.recipes((event) => {
  // Recipe gating is not implemented yet: block these crafts, they are meant to be earned
  event.remove([
    "lucky:lucky_block",
    "mutantsbuff:aadd",
    "mutantsbuff:creeper_shard_plus_hammer",
    "mutantsbuff:creeper_shard_plus_ham_2"
  ]);
  // All content-mod recipes must come from lucky blocks only. Blanket per-mod removal,
  // update-proof: every current AND future recipe of each mod is dropped. This replaces the
  // disable_mod_recipes OpenLoader datapack, which listed each recipe and drifted on mod updates
  // (it had missed Yakurum + Majrusz recipes).
  ["confluence", "fuze_relics", "majruszsdifficulty", "mutantmonsters"].forEach((mod) => {
    event.remove({ mod: mod });
  });
  // yakurum: same blanket removal, but KEEP both the craft AND the block->resource uncraft of each
  // yakurum-resource block (YAKURUM_KEEP, built above). Everything else yakurum stays lucky-block-only.
  event.remove({ mod: "yakurum", not: { or: YAKURUM_KEEP } });
  // "lucky" is special: drop every lucky-block CRAFT (base lucky:lucky_block, lucky:addons and all
  // addon block recipes -- update-proof) but KEEP the one recipe that is not a craft at all:
  //   - lucky:luck = the luck INFUSION (LuckModifierCraftingRecipe / crafting_luck), a core feature.
  //     Removing it kills infusing (e.g. Tools LB + redstone -> +luck). It must NEVER go.
  // The pack's own lucky:lucky_world_invasion_lucky_block craft was the second exception until 1.3;
  // it is now dropped on purpose too (user, 2026-07-17: the LWI block serves no purpose right now).
  // Careful, future reader: "only lucky:luck survives" also happens to be the shape of a 1.2.12 hotfix
  // BUG, where the LWI craft was lost by accident and had to be restored. This time it is deliberate.
  // The block itself still exists, only its recipe is gone -- re-add { id: ... } here to bring it back.
  event.remove({ mod: "lucky", not: { id: "lucky:luck" } });
  // Smelting
  CONFLUENCE_TO_IRON_NUGGET.forEach((item) => {
    event.smelting("minecraft:iron_nugget", item, 0.1, 100);
  });
  // Smithing table
  event.smithing(
    "mutantsbuff:charged_hammer",
    "mutantmonsters:hulk_hammer",
    "mutantmonsters:creeper_shard"
  );
  event.smithing(
    "mutantsbuff:upgraded_hulk_hammer",
    "mutantmonsters:hulk_hammer",
    "mutantsbuff:flame_orb"
  );
});
