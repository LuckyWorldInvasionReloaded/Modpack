# Lucky World Invasion - Hardcore — 1.2.8 (hotfix)

## Balance — naturally generated "cursed" lucky blocks

Since 1.2.6, the Luck value actually stored on a lucky block is properly applied
when it is broken (this fixed a Lucky Block mod bug that previously made every
player break roll at luck 0). Unintended consequence: naturally generated blocks
with a very negative Luck became real traps, causing the spike in negative drops
reported by the community.

This hotfix softens every natural source of negative luck:

- **Unlucky ruins** (classic Lucky Block): luck **−75 → −10**
- **Gray temple** (Pink Lucky Block): luck **−50 to −100 → −10**
- **Nether cherry tree** (Pink Lucky Block): luck **−100 → −10**

Positive structures (acropolises, pink balloons, cherry temple, firewell…)
are unchanged.

Note: these values apply to blocks generated in **new chunks**. Blocks already
present in an existing world keep their original luck.
