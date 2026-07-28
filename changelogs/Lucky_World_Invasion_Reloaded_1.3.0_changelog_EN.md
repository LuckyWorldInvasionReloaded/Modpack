# Lucky World Invasion Reloaded 1.3.0

The biggest update the pack has had, built on two things: **Lucky XP**, a whole second economy for lucky blocks, and **multiplayer**, which finally plays the way it should.

---

# 1. Lucky XP

## The experience
- Breaking lucky blocks now gives Lucky XP, a second experience with its own blue bar and blue orbs. A legendary drop gives double. Lucky levels pay for everything below.
- Lucky Experience Bottle: bursts into Lucky XP orbs where it lands.
- Lucky Glasses (Curios head slot): show the Luck of nearby lucky blocks, so you can read one before breaking it.

## Lucky Labs
- Stands generate in the world: a vending machine and the merchant who tends it. The whole build is indestructible.
- Four machine types: Consumables, Materials, Tools, Infused Lucky Blocks. Each line sells once and never restocks. Purchases drop on the ground in front of the machine.
- Using a stand starts a 3 minute timer. At zero the lab breaks apart and the merchant blows up, for good. Spend fast.

## The merchant
- Eight services: reroll stock, convert machine type, a 5 minute Luck boost (with a downside), permanent Luck, full heal, repair, lower the team's difficulty, extra life.
- His rarity is his discount — Rare -10%, Epic -30%, Legendary -60% — and he wears it, so you can read it at a glance. It is rolled apart from the machine's.
- Shop screens fully hand-drawn by our designer: the merchant trades from his own lab bench and watches you shop. Prices sit on Lucky XP orbs and dim when you can't afford them.

## Lucky Events
- A roulette rolls a prize, then lucky blocks appear around every player: pre-infused with Luck, or worth extra XP when broken. Up to a Mega jackpot.
- One event also rolls on its own each morning, with a pity timer so a dry streak never lasts.

---

# 2. Multiplayer

Co-op used to be much harder than solo, and a chore to set up. Both are fixed.

## Getting your friends in
- Thanks to e4mc: start your world, click Open to LAN, share the address. No server to rent, no port to forward.
- After a wipe, the fresh world re-opens to LAN on its own.
- Removed Krypton: it clashed with the login encryption and could stop people joining.

## Nights and days
- One player in bed is now enough to skip the night.
- The gamerule stays yours: the pack sets it once, on a new world, and never again.
- Skipping the *day* in a Comforts hammock still asks for everybody, on purpose.

## Shared lives
- The run now has a pool of shared lives in place of a plain hardcore switch: 1 solo, one per player plus a spare in co-op (3 for two, 4 for three).
- It belongs to the team and never refills. The death that empties it ends the run. Only the merchant can add one, once.
- Opening to LAN alone is still a solo run, and spectators don't count: what matters is who is really playing.
- With someone else online you go down instead of dying, and a team-mate has 5 minutes to revive you. Going down spends a life; giving up or bleeding out costs your items instead. Alone, you just die. Totems never touch the pool.
- Lives show as hearts on the HUD, colour and position configurable.

## Invasions in co-op
- A friend connecting no longer cancels the invasion for everyone. The grace period that shields you when you enter a dimension was armed on login too, and it covers the whole dimension — so someone joining at dusk killed the invasion for the whole team. It now only arms when you actually change dimension.
- The kill counter stops at its goal, and your bar turns green once you've done your share.
- Everyone is told when a player is done: "&lt;Player&gt; fought valiantly. Waiting for the other players."
- A team-mate watching in spectator no longer locks the invasion for everyone.
- Changing dimension before dawn no longer dodges the outcome — penalty and reward both follow you.

---

## Invasions
- Beating an invasion now clears the ordinary mobs around you too, so you can finally sleep. Pets, named mobs and bosses are spared.
- Winning on the very last tick no longer lets the cleanup touch bosses or named mobs.

## Guide and language
- The Lucky Book gets a full French version, a page on Lucky XP and the Lucky Labs, and a new "Multiplayer" section.
- The five custom mods speak French too: shop screens, stats, HUD, config, items and tooltips follow the game language. English stays the default.

## Fixes
- Trading with a villager no longer crashes you. One vanilla trade was broken by another mod and could only throw an error; it is skipped for now.
- Yakurum weapons and tools no longer vanish as they drop if someone was holding Shift.

## Quality of life
- Added Easy Anvils: no more "Too Expensive!", no prior-work penalty, free renaming, and anvils that rarely break.
- The LWI Lucky Block can no longer be crafted. Infusing is untouched.
- The Lucky Totem is now the Lucky Idol. The ones you have convert on their own.
- The Confluence "Speed Shoes" no longer make a sound on every step.
- Capped Yakurum Sacred Hearts (10) so the machines can't feed an endless health bar.
- The "Total chance" line on the Lucky Stats HUD always sorts to its right place.
