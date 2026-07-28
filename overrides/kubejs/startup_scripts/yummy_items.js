// Yummy Lucky Block - custom food items (Lucky World Invasion Reloaded).
// "Cheesecake à la merde" (community private joke, name stays French): eating it is a 50/50
// gamble - either a divine feast (Saturation II + Regen + Absorption) or a culinary disaster
// (Hunger III + Poison + Nausea). Dropped by lucky:yummyluckyblock (see the addon's drops.txt).
StartupEvents.registry("item", (event) => {
  event
    .create("cheesecake_a_la_merde")
    .maxStackSize(16)
    .rarity("epic")
    .glow(true)
    .food((food) => {
      food
        .hunger(6)
        .saturation(0.6)
        .alwaysEdible(true)
        .eaten((ctx) => {
          let player = ctx.player;
          if (player.level.isClientSide()) return;
          if (player.level.random.nextBoolean()) {
            // divin
            player.potionEffects.add("minecraft:saturation", 3600, 1);
            player.potionEffects.add("minecraft:regeneration", 3600, 1);
            player.potionEffects.add("minecraft:absorption", 3600, 1);
            player.statusMessage = Text.gold("Délicieux !!!");
          } else {
            // immonde
            player.potionEffects.add("minecraft:hunger", 3600, 2);
            player.potionEffects.add("minecraft:poison", 3600, 0);
            player.potionEffects.add("minecraft:nausea", 3600, 0);
            player.statusMessage = Text.darkGreen("... à la merde.");
          }
        });
    });
});
