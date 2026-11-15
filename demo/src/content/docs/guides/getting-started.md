---
title: Getting started
description: Install starlight-warcraft, add it to Starlight, and use its components.
---

## Install

```sh
bun add starlight-warcraft
```

The package ships TypeScript and CSS sources; Astro compiles them with your site. It needs Node 26 or newer, Astro 7
and Starlight 0.43 or newer.

## Add the theme

Add the plugin to `starlight({ plugins })` in `astro.config.ts`:

```ts title="astro.config.ts" {3,9}
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightWarcraft from "starlight-warcraft";

export default defineConfig({
  integrations: [
    starlight({
      title: "My docs",
      plugins: [starlightWarcraft()],
    }),
  ],
});
```

The plugin puts its stylesheets in front of your `customCss`, so your own CSS still wins. It sets:

- Starlight's accent to old gold and its greys to warm stone, in both dark and light mode;
- page titles, Markdown headings and the site title in Cinzel, which it self-hosts;
- the classes the React components use.

### Options

| Option  | Default | What it does                                                                        |
| ------- | ------- | ----------------------------------------------------------------------------------- |
| `fonts` | `true`  | Load Cinzel (400 and 700) from `@fontsource/cinzel`. Set `false` to bring your own. |

## Use the components

The components are React, so add [`@astrojs/react`](https://docs.astro.build/en/guides/integrations-guide/react/)
to your site. Import them from `starlight-warcraft/react` in MDX, `.astro` files or your own islands:

```mdx
import { Button, Card, CardContent, CardHeader, CardTitle } from "starlight-warcraft/react";

<Card>
  <CardHeader>
    <CardTitle>Quest log</CardTitle>
  </CardHeader>
  <CardContent>Three tasks remain.</CardContent>
</Card>
```

See [Components](../components/) for every component and its props.

## Cascade layers

Every rule sits in the `starlight-warcraft` cascade layer, after Starlight's own layers. Anything you write outside a
layer overrides it. If you declare a layer order yourself (Tailwind users do), the theme layer is already declared by
then, so later layers such as `components` and `utilities` override it too.

## Without Starlight

The components work in any React app. Import the tokens and component styles yourself:

```ts
import "starlight-warcraft/styles/fonts.css";
import "starlight-warcraft/styles/tokens.css";
import "starlight-warcraft/styles/components.css";
```

The spinner switches to its dark-mode glow under `[data-theme="dark"]` or `.dark`.

## Design tokens

The tokens are CSS custom properties on `:root`. Override any of them in your own CSS.

| Token                              | Use                                      |
| ---------------------------------- | ---------------------------------------- |
| `--wc-gold-50` … `--wc-gold-950`   | The accent scale                         |
| `--wc-stone-50` … `--wc-stone-950` | The grey scale                           |
| `--wc-font-display`                | Headings and component text (Cinzel)     |
| `--wc-ring`                        | Focus rings on buttons and inputs        |
| `--wc-card-foreground`             | Text on the dark frame textures          |
| `--wc-muted-foreground`            | Card descriptions and input placeholders |
| `--wc-destructive`                 | Destructive accents                      |
