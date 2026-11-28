# Contributing

Thank you for helping. This page covers setup, the checks, and the house style.

## Setup

See the [Sergeant playbook](https://github.com/Braden1996/sergeant#readme) for the toolchain and commands. Install [mise](https://mise.jdx.dev), then run:

```sh
mise install
mise exec -- sgt install
mise exec -- sgt check
```

Run `mise exec -- sgt test` and `mise exec -- sgt build` before opening a pull request. Start the demo with
`mise exec -- bun --cwd packages/runtimes/demo run dev`.

Until the 0.15.0 release is published, put the local Sergeant release binary on PATH and supply the three npm
tarballs in `../sergeant/dist/npm/`. Exclude `http:sgt` from mise by setting `MISE_DISABLE_TOOLS=http:sgt`.

## Style

- **No code comments.** Use descriptive names and small functions instead. If something needs explaining, it needs a
  better name or a test.
- **Colocated tests.** Every `x.tsx` has an `x.test.tsx` beside it. `src/stylesheets.test.tsx` checks that every class
  a component renders is styled and that every texture exists.
- **Strict types.** Sergeant checks TypeScript. Avoid `any`, non-null assertions, and unchecked casts.
- **Plain CSS.** Components use `wc-*` classes and data attributes, all inside `@layer starlight-warcraft`. Do not add
  Tailwind or a CSS-in-JS dependency: consumers must not need either.
- **No game art.** Do not add textures, icons or fonts taken from a Blizzard game.
- **Upstream changes.** When you take something from warcraftcn/ui, record it in
  `packages/libraries/ts/dom/starlight-warcraft/src/NOTICE.md`.

## Screenshots

The README screenshots in `.github/screenshots/` come from the demo site at 1280 pixels wide. Build and serve it with
`bun run build` and `bun run preview` in `packages/runtimes/demo/`, then capture the home page (dark) and the components page (dark and
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

1. Bump `version` in `packages/libraries/ts/dom/starlight-warcraft/package.json`.
2. Move the "Unreleased" notes into a version section in `CHANGELOG.md`, then merge.
3. Tag `vX.Y.Z` on `main` and push the tag.

The release workflow re-runs the gate, checks that the tag matches the version, packs the tarball, and attaches it
with its checksum to a GitHub release. It then publishes the same tarball to npm through trusted publishing (OIDC,
with provenance), so the repository holds no npm token.
