// ============================================================================
//  pandilla_totem_cap.js  -  sync the yakurum TOOLTIP 'uses' with the REAL
//  remaining saves tracked by TotemBeforePlayerRevive (TBPR).
// ----------------------------------------------------------------------------
//  TWO systems act on this totem:
//    * yakurum (PandillaTotem) -> tag 'uses' + tooltip "Uses remaining: X".
//      DISPLAY ONLY. Statue-dropped totems arrive at 5, lucky-drop at 2.
//    * TBPR -> the REAL save counter, in its own tag
//      'TotemBeforePlayerReviveUsesRemaining', driven by the config
//      multiUseTotems = ["yakurum:pandilla_totem=2"] (the actual nerf).
//
//  This script copies the TBPR counter into 'uses' so the tooltip is correct
//  AND counts down (2 -> 1 -> 0). Before the totem is ever used (no TBPR tag),
//  it shows the capacity (MAX_USES). Event-driven (inventoryChanged + loggedIn);
//  write through inv.getItem(i) (event.item is a copy). Rhino: all vars up top,
//  never declare const/let inside a for-body.
// ============================================================================

const TOTEM_ID = "yakurum:pandilla_totem";
const TBPR_TAG = "TotemBeforePlayerReviveUsesRemaining";
const MAX_USES = 2;

function syncPlayerInventory(player) {
  if (!player) return;
  var inv = player.inventory;
  var n = inv.getContainerSize();
  var i, st, tag, target;
  var changed = false;
  for (i = 0; i < n; i++) {
    st = inv.getItem(i);
    if (!st || st.id != TOTEM_ID) continue;
    tag = st.nbt;
    if (tag && tag.contains(TBPR_TAG)) {
      target = tag.getInt(TBPR_TAG);            // live remaining saves (after first use)
      if (target > MAX_USES) target = MAX_USES;
      if (target < 0) target = 0;
    } else {
      target = MAX_USES;                         // never used yet -> show full capacity
    }
    if (!tag || !tag.contains("uses") || tag.getInt("uses") != target) {
      st.getOrCreateTag().putInt("uses", target);
      changed = true;
    }
  }
  if (changed) { try { player.inventoryMenu.broadcastChanges(); } catch (e) {} }
}

PlayerEvents.inventoryChanged(event => {
  try { syncPlayerInventory(event.player); } catch (e) {}
});

PlayerEvents.loggedIn(event => {
  try { syncPlayerInventory(event.player); } catch (e) {}
});

console.info("[pandilla_totem_cap] ready - tooltip 'uses' synced to TBPR counter (max " + MAX_USES + ")");
