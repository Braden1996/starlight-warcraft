# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-11-16

### Added

- Luau colours as `--wc-code-*` tokens for dark and light mode, in a new `styles/code.css` that the theme loads.
- A skin for [starlight-luau](https://github.com/Braden1996/starlight-luau) reference pages: gold-ruled signatures,
  monospace member headings and the theme's Luau colours. It needs starlight-luau 0.3.0, whose stylesheet is layered.
- `HoverCard` and `HoverCards`: tooltip cards for luau-web-checker's checked code blocks (inferred types and marked
  errors), with `sources` for a site's own anchors.
- `Disclaimer`: the "unofficial, not affiliated with Blizzard" footer notice.

### Changed

- The theme declares its layer after `starlight-luau` as well as `starlight`.
- Inline code in headings is shown in the accent colour without the inline-code box.
- Starlight's `Card` and `LinkCard` get the theme: tooltip-style panels with Cinzel titles, each card's border taking
  its icon colour like an item quality.

## [0.1.0] - 2026-11-15

### Added

- The `starlight-warcraft` Starlight plugin. It maps Starlight's accent to old gold and its greys to warm stone in
  dark and light mode, sets headings in Cinzel (self-hosted, optional with `fonts: false`), and loads the component
  styles, all in the `starlight-warcraft` cascade layer.
- React components in `starlight-warcraft/react`: `Button`, `Card` (with `CardHeader`, `CardTitle`,
  `CardDescription`, `CardContent` and `CardFooter`), `Badge`, `Input`, `Panel`, `Skeleton` and `Spinner`, forked from
  warcraftcn/ui and styled with plain CSS.
- The stylesheets on their own, for React apps without Starlight: `styles/fonts.css`, `styles/tokens.css` and
  `styles/components.css`.
- Design tokens: `--wc-gold-*`, `--wc-stone-*`, `--wc-font-display`, `--wc-ring`, `--wc-card-foreground`,
  `--wc-muted-foreground` and `--wc-destructive`.

[Unreleased]: https://github.com/Braden1996/starlight-warcraft/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Braden1996/starlight-warcraft/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Braden1996/starlight-warcraft/releases/tag/v0.1.0
