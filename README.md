# Lucky World Invasion Reloaded

Source of the [CurseForge modpack](https://www.curseforge.com/minecraft/modpacks/lucky-world-invasion-reloaded):
Minecraft 1.20.1, Forge, hardcore, built around lucky blocks.

Tracked here: `manifest.json` (mod list and Forge version) and `overrides/` (configs, KubeJS scripts,
the pack's own lucky block addons). Mod jars, shaderpacks and the built `.zip`/`.mrpack` are not —
they come from the manifest or are produced at release time. Tags are pack versions.

The community lucky block addons are **not** in this repository: they belong to their authors and are
downloaded from CurseForge at first launch. See [ADDON_PATCHES.md](ADDON_PATCHES.md) for how the pack
changes them without touching their files.

The five mods written for this pack live in their own repositories:

| Mod | Repository | What it does |
|---|---|---|
| Lucky Tweaks | [LuckyTweaks](https://github.com/Laink/LuckyTweaks) | Fixes and balance tools for the Lucky Block mod |
| Lucky Stats | [LuckyStats](https://github.com/Laink/LuckyStats) | Per-player luck statistics and HUD |
| Lucky Tools | [LuckyTools](https://github.com/Laink/LuckyTools) | The Lucky Tools, ring and belt |
| Lucky XP | [LuckyXP](https://github.com/Laink/LuckyXP) | The Lucky XP economy and vending machines |
| Optional Suffering | [OptionalSuffering](https://github.com/Laink/OptionalSuffering) | End a PureSuffering invasion by fighting it |

## Contributing

Issues and pull requests are welcome — balance suggestions, bug reports, new drops. Keep everything
in English, and never edit a third-party addon's files: add or change a patch in
`overrides/config/luckytweaks/drop_patches/` instead.

## Branches

`main` tracks the **next** release: it can be ahead of what is published on CurseForge, and may
need mod versions that are not released yet. For a playable pack, download it from CurseForge.

## License

Official releases are free to redistribute unmodified, with credit. Modified versions and forks
published as separate modpacks need permission. Third-party mods and addons keep their own licences.
See [LICENSE](LICENSE).
