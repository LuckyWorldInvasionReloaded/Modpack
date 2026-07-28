// Keep FTB Ultimine away from lucky blocks.
//
// WHY: FTB Ultimine breaks a whole vein at once (FTBUltimine.blockBroken -> player.gameMode.destroyBlock
// in a loop). While it runs, it INTERCEPTS every item that drops (entityJoinedWorld, guarded by
// isBreakingBlock), pulls it out of the world, and RE-DROPS them all at the TRIGGER block's position.
// That destroys the per-block-position matching that Lucky Tweaks / Lucky Tools rely on to carry, for
// EACH broken block: its real Luck (SilkTouchHandler), the Lucky Spawner "scanned" anti-farm mark, the
// Lucky Wand "gambled" mark, and the Lucky Idol "boosted" mark. Reported symptoms: one block's luck
// bleeding onto the rest of the vein (up to +100), and the Spawner's scan guard being defeated to
// duplicate blocks infinitely.
//
// FIX: FTB Ultimine natively honours a block blacklist tag, ftbultimine:excluded_blocks (checked in
// BlockMatcher.actualCheck -> `!state.is(EXCLUDED_BLOCKS)`). A lucky block put in it is never gathered
// into a vein (as trigger it finds no matching neighbours; as a neighbour it is skipped), so Ultimine
// simply ignores lucky blocks. Normal single-block breaking -- the only intended way to open a lucky
// block -- is completely unaffected. This closes BOTH exploits at the source.
//
// Coverage mirrors Lucky Tweaks' own LuckyBlocks.isLuckyBlock: the whole `lucky` namespace (base mod +
// every addon) plus the cross-mod Fuze blockling.
ServerEvents.tags('block', event => {
  event.add('ftbultimine:excluded_blocks', '@lucky')                       // lucky:* (base + all addons)
  event.add('ftbultimine:excluded_blocks', 'fuze_relics:lucky_blockling')  // cross-mod lucky block (Fuze Relics)
})
