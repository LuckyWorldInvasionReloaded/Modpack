# Lucky block addons

The community lucky block addons this pack uses belong to their authors. **The pack does not
redistribute them.** They are downloaded from the authors' own CurseForge files the first time the
game starts, and their files are never modified.

## How it works

`config/luckytweaks/addon_downloads.txt` lists each addon with its official URL, size and sha256:

```
<zip name> | <sha256> | <size> | <url>
```

Lucky Tweaks fetches any missing one into `addons/lucky/`, checks it against the hash, and the Lucky
Block mod loads it as a zip. A failed download is not fatal: the game boots without that addon and
the log says how to install it by hand.

## How the pack modifies them

Not by editing their files. Each addon has a patch file in `config/luckytweaks/drop_patches/`, and
Lucky Tweaks applies it **in memory** while the addon loads:

```
@addon Lucky Block Pink 8.4 [Everlasting Expansions]
@file drops.txt
@match
<the author's original line(s)>
@replace
<our version>
@end
```

The match is the author's text verbatim, so if an addon is updated and that text is gone, the patch
is skipped and the log says `[droppatch] NOT applied` — a change is never lost silently. Every launch
logs `[droppatch] <addon>/<file>: N/N patches applied`.

Only the four addons written for this pack (Chaos, Tools, Yummy, LWI) are shipped in `overrides/`,
since they are ours to begin with.

## What the patches change

- **Legendary and cursed markers** (`LWLeg`, `LWCurse`) and the legendary fanfare, so Lucky Tweaks and
  Lucky Stats can recognise those drops.
- **Progression gating**: blaze rods and ender eyes cut down, so lucky blocks cannot skip the Nether
  fortress or the End.
- **Balance**: a few drop and luck adjustments, listed in each patch file.

## Adding or updating an addon

Add a line to `addon_downloads.txt` with the official file's URL, size and sha256, then write its
patch file against that zip. To update one, change the entry, delete the old zip from
`addons/lucky/`, and re-anchor whatever the log reports as `NOT applied`.
