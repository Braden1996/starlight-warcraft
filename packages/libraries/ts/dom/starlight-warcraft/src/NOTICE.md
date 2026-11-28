# Notice: the warcraftcn/ui fork

Parts of this package are forked from [warcraftcn/ui](https://github.com/TheOrcDev/warcraftcn-ui) by TheOrcDev, at
commit `67dfa8e30442ae042b3d63030c17cb00590542ff`, under the MIT licence. The upstream licence is in
[LICENSE-warcraftcn.md](../LICENSE-warcraftcn.md).

| Here                        | Upstream (`components/ui/warcraftcn/`) | Changes                                                                                                     |
| --------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/react/button.tsx`      | `button.tsx`                           | Plain CSS classes and data attributes instead of Tailwind and `cva`; a `size="sm"` option.                  |
| `src/react/card.tsx`        | `card.tsx`                             | Plain CSS classes; smaller header padding.                                                                  |
| `src/react/badge.tsx`       | `badge.tsx`                            | Plain CSS classes; no faction variant; renders a `span`.                                                    |
| `src/react/input.tsx`       | `input.tsx`                            | Plain CSS classes; light text on the dark frame.                                                            |
| `src/react/skeleton.tsx`    | `skeleton.tsx`                         | The default (gold rune) look only; children render above the shimmer.                                       |
| `src/react/spinner.tsx`     | `spinner.tsx`                          | Strict TypeScript props.                                                                                    |
| `src/react/spinner-path.ts` | `assets/`                              | Unchanged.                                                                                                  |
| `src/react/panel.tsx`       | (new)                                  | A component for the tooltip quality classes in `warcraft.css`.                                              |
| `src/styles/components.css` | `src/styles/warcraft.css`              | The used classes only, plus the component classes; in a cascade layer; local textures; no faction variants. |
| `src/styles/assets/*.webp`  | `assets/`                              | Unchanged. These frame textures were drawn for warcraftcn/ui; they are not game art.                        |

The plugin (`src/index.ts`), `src/styles/starlight.css`, `src/styles/tokens.css` and `src/styles/fonts.css` are this project's
own.

To update the fork, compare the files above with a newer upstream commit and re-apply the changes listed.
