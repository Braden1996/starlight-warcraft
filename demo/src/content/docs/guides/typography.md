---
title: Typography and Markdown
description: How Starlight's own Markdown looks under the theme.
---

The theme changes Starlight's colours and heading font, not its layout. This page shows ordinary Markdown.

## Second-level heading

Body text stays in Starlight's system font so long pages stay readable. [Links](../getting-started/) use the gold
accent, and `inline code` keeps the monospace font.

### Third-level heading

- A list item
- Another, with **bold** and _italic_ text
  - A nested item

1. Numbered
2. Steps

> A block quote, for the words of a quest giver.

:::note
Asides keep Starlight's colours for each kind.
:::

:::tip[Tip]
Override any `--wc-*` token in your own `customCss`.
:::

:::caution
Cautions stay amber.
:::

:::danger
Danger stays red.
:::

```ts title="example.ts"
export function greet(name: string): string {
  return `Well met, ${name}.`;
}
```

| Column | Another column |
| ------ | -------------- |
| Gold   | `--wc-gold-*`  |
| Stone  | `--wc-stone-*` |
