# Lucky XP 1.0.2

## Changes
- **Falling costs Lucky XP.** Dying takes all of it; being knocked down in multiplayer takes half. Nothing drops on the ground in either case — there is no orb to run back for. Both are configurable (`loseXpOnDeath`, `downedLossPercent`).

## Fixes
- **Two players shopping at the same machine.** Only the first buyer got the goods, but the second player's screen still offered the article: clicking it played the purchase sound and announced the item, for a sale the server had already refused. No levels were ever taken. A sale is now pushed to everyone standing in that machine, so the line turns to SOLD live, and a click that loses the race says so plainly.
