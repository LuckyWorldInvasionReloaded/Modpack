# Lucky block addons

The community lucky block addons this pack uses belong to their authors. The pack ships their
**official CurseForge files, byte for byte**, and never edits them — our changes are applied in
memory as the addon loads. `ADDON_SOURCES.txt` lists every zip with its sha256 so anyone can check
that. The zips are not in this repository: they go into the CurseForge and Modrinth builds only,
which is what their licences allow.

## How the pack modifies them

Each addon has a patch file in `config/luckytweaks/drop_patches/`, and Lucky Tweaks applies it **in
memory** while the addon loads:

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

The four addons written for this pack (Chaos, Tools, Yummy, LWI) are shipped as plain folders, since
they are ours to begin with.

## What the patches change

- **Legendary and cursed markers** (`LWLeg`, `LWCurse`) and the legendary fanfare, so Lucky Tweaks and
  Lucky Stats can recognise those drops.
- **Progression gating**: blaze rods and ender eyes cut down, so lucky blocks cannot skip the Nether
  fortress or the End.
- **Balance**: a few drop and luck adjustments, listed in each patch file.

## Adding or updating an addon

Put the author's official zip in `addons/lucky/`, add its name, sha256, size and URL to
`ADDON_SOURCES.txt`, then write its patch file against that zip. To update one, replace the zip,
update the entry, and re-anchor whatever the log reports as `NOT applied`.
