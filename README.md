# Lucky World Invasion Reloaded

Source of the [CurseForge modpack](https://www.curseforge.com/minecraft/modpacks/lucky-world-invasion-reloaded):
Minecraft 1.20.1, Forge, hardcore, built around lucky blocks.

Tracked here: `manifest.json` (mod list and Forge version) and `overrides/` (configs, KubeJS scripts,
the pack's own lucky block addons). Mod jars, shaderpacks and the built `.zip`/`.mrpack` are not —
they come from the manifest or are produced at release time. Tags are pack versions.

The community lucky block addons are **not** in this repository: they belong to their authors and are
downloaded from CurseForge at first launch. See [ADDON_PATCHES.md](ADDON_PATCHES.md) for how the pack
changes them without touching their files.

The five mods written for this pack live in their own repositories: Lucky Tweaks, Lucky Stats,
Lucky Tools, Lucky XP and Optional Suffering.

## Contributing

Issues and pull requests are welcome — balance suggestions, bug reports, new drops. Keep everything
in English, and never edit a third-party addon's files: add or change a patch in
`overrides/config/luckytweaks/drop_patches/` instead.
