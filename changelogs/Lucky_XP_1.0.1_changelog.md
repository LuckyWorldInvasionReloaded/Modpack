# Lucky XP 1.0.1

From the first community reports.

## Changes
- The merchant's machine conversion now lands on a **random** type instead of always stepping to the next one in a fixed order. It still never gives you the type you already have.

## Fixes
- Vending machines found in the world sold the wrong goods: whatever the machine's type, its shelves were always stocked as a Tools machine. Consumables, Materials and Infused machines now stock what they say they do. Machines placed by hand were never affected.
- Lucky Events placed no lucky blocks at all when the roulette landed while you were out in open water. The blocks now appear in the water around you. On land nothing changes.

## Note for existing worlds
A machine you had **already opened** keeps the stock it was given — that stock is fixed for good the first time a machine is used, and this update does not rewrite it. The merchant's stock reroll (10 levels) puts it right. Machines you have not opened yet, and every machine found from now on, stock correctly.
