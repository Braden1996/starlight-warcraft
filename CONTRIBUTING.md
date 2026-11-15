# Contributing

Thank you for helping. This page covers setup, the checks, and the house style.

## Setup

1. Install [mise](https://mise.jdx.dev). It installs every pinned tool, including Bun, Node and moon:

   ```sh
   mise install
   mise exec -- bun install
   mise exec -- lefthook install
   ```

2. Run the gate. CI runs the same command from a cold cache:

   ```sh
   mise exec -- moon run :check
   ```

3. See your change in the demo site:

   ```sh
   cd demo
   mise exec -- bun run dev
   ```

## Style

- **No code comments.** Use descriptive names and small functions instead. If something needs explaining, it needs a
  better name or a test.
- **Colocated tests.** Every `x.tsx` has an `x.test.tsx` beside it. `src/stylesheets.test.tsx` checks that every class
  a component renders is styled and that every texture exists.
- **Strict types.** The TypeScript config is the strictest available, checked by tsrs. Do not use `any`, non-null
  assertions or unchecked casts.
- **Plain CSS.** Components use `wc-*` classes and data attributes, all inside `@layer starlight-warcraft`. Do not add
  Tailwind or a CSS-in-JS dependency: consumers must not need either.
- **No game art.** Do not add textures, icons or fonts taken from a Blizzard game.
- **Upstream changes.** When you take something from warcraftcn/ui, record it in
  `packages/starlight-warcraft/NOTICE.md`.

## Screenshots

The README screenshots in `.github/screenshots/` come from the demo site at 1280 pixels wide. Build and serve it with
`bun run build` and `bun run preview` in `demo/`, then capture the home page (dark) and the components page (dark and
light) with any headless Chromium, for example:

```sh
msedge --headless=new --force-dark-mode --window-size=1280,900 --screenshot=home-dark.png http://localhost:4321/starlight-warcraft/
```

## Pull requests

- One concern per pull request.
- The title becomes the squash commit: `type(scope): summary`. Types: feat fix perf refactor test docs build ci chore
  style revert. Scopes: plugin react styles demo ci docs deps repo.
- Add a line under "Unreleased" in `CHANGELOG.md` when users will notice the change.

## Releases

1. Bump `version` in `packages/starlight-warcraft/package.json`.
2. Move the "Unreleased" notes into a version section in `CHANGELOG.md`, then merge.
3. Tag `vX.Y.Z` on `main` and push the tag.

The release workflow re-runs the gate, checks that the tag matches the version, packs the tarball, and attaches it
with its checksum to a GitHub release. It then publishes the same tarball to npm through trusted publishing (OIDC,
with provenance), so the repository holds no npm token.
