const LANG_KEY_LWI = "lucky_world_invasion.title";

/**
 * KubeJS creative tab key.
 */
const TAB_KEY_KUBE_JS = "kubejs:tab";

/**
 * Fixes KubeJS's empty creative tab by filling it with the pack's own items.
 */
StartupEvents.modifyCreativeTab(TAB_KEY_KUBE_JS, (event) => {
  event.setIcon("lucky:lucky_world_invasion_lucky_block");
  event.setDisplayName(Text.translate(LANG_KEY_LWI));

  event.add([
    "lucky:lucky_world_invasion_lucky_block",
    "lucky:lucky_world_invasion_lucky_sword",
  ]);
});
// StartupEvents.registry("creative_mode_tab", (event) => {
//     // Register a creative tab under its own id
//     let tab = event.create("lucky_world_invasion:items")
//     // Set the tab icon -- the item MUST exist
//     tab.icon(() => Item.of("lucky:lucky_world_invasion_lucky_block"))
//     // Set the display name, here through a localisation key
//     tab.displayName = Text.translatable("item_group.lucky_world_invasion.items")
//     // Fill the tab
//     tab.content(() => [
//         "lucky:lucky_world_invasion_lucky_block",
//         "lucky:lucky_world_invasion_lucky_sword"
//     ])
// })
