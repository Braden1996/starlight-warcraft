## What and why

## Checklist

- [ ] `mise exec -- moon run :check` passes locally
- [ ] New behaviour has colocated unit tests (`x.ts` beside `x.test.ts`), and no code comments
- [ ] `fixtures/expected/` and `.github/banner.svg` were regenerated (`bun run snapshots`, `bun run banner` in `packages/starlight-luau`), not edited by hand
- [ ] `CHANGELOG.md` has a line under "Unreleased" if users will notice the change
