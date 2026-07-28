# Lucky Tweaks 1.1.0

## Shared lives
- The run now has a pool of shared lives, in place of a plain hardcore on/off switch. It never refills on its own.
- Solo: 1 life, so the first death is final. Co-op: one per player plus a spare (3 for two, 4 for three), counted off the biggest the team has ever been, so a friend logging off never takes a life back.
- The co-op allowance only unlocks once two players have really been online together. Opening to LAN alone keeps you on the solo one.
- Spectators don't count, neither for the pool nor as someone who could revive you.
- Going down spends a life. Being revived still spent it; giving up costs your items instead of a second one.
- A team-mate has 5 minutes to reach you. Past that you bleed out, which costs your items, not another life.
- Empty pool means a team game over, and no totem stops it. Totems and Yakurum's resurrection never touch the pool, since they act before the death.
- The Lucky Merchant sells one extra life per run (cap configurable).
- Lives show as hearts on the HUD. New "Lives" config tab: colour, corner, offset, with a live preview. Command: /luckylives.

## PlayerRevive
- Co-op revive is now part of the pack rather than an option, since the co-op allowance is built on it. The old checkbox is gone.
- It only arms while another player is online. Alone, on a server as much as in singleplayer, you simply die.

## Death screen
- "Delete & Restart" now appears in multiplayer too, and the fresh world re-opens itself to LAN so you only have to pass the new address on.

## Fixes
- Fixed trading with a villager crashing you. One vanilla trade was broken by another mod and could only ever produce an error; it is now skipped instead.
- Fixed Yakurum weapons and tools vanishing as they dropped if anyone held Shift.
- Capped Yakurum Sacred Hearts (10 by default) so the new vending machines can't feed an endless health bar.
- "Total chance" now always sorts last on the Lucky Stats screen and HUD.

## Language
- English and French.
