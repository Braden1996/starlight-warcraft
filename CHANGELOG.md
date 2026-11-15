# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/Braden1996/starlight-warcraft/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Braden1996/starlight-warcraft/releases/tag/v0.1.0
