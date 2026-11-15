import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { renderToStaticMarkup } from "react-dom/server";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Panel,
  Skeleton,
  Spinner,
} from "./react/index.ts";

const STYLES = join(dirname(fileURLToPath(import.meta.url)), "..", "styles");
const QUALITIES = ["common", "uncommon", "rare", "epic", "legendary"] as const;

function stylesheet(name: string): string {
  return readFileSync(join(STYLES, name), "utf8");
}

function classesIn(html: string): Set<string> {
  const classes = new Set<string>();
  for (const match of html.matchAll(/class="([^"]*)"/g)) {
    for (const name of (match[1] ?? "").split(" ")) {
      classes.add(name);
    }
  }
  return classes;
}

function everyComponent(): string {
  return renderToStaticMarkup(
    <>
      <Badge />
      <Button />
      <Card>
        <CardHeader>
          <CardTitle />
          <CardDescription />
        </CardHeader>
        <CardContent />
        <CardFooter />
      </Card>
      <Input />
      {QUALITIES.map((quality) => (
        <Panel key={quality} quality={quality} />
      ))}
      <Skeleton />
      <Spinner />
    </>,
  );
}

describe("components.css", () => {
  const css = stylesheet("components.css");

  test("styles every class the components render", () => {
    const missing = [...classesIn(everyComponent())].filter((name) => !css.includes(`.${name}`));
    expect(missing).toEqual([]);
  });

  test("points every texture at a file that ships with the package", () => {
    const textures = [...css.matchAll(/url\("(\.\/[^"]+)"\)/g)].map((match) => match[1] ?? "");
    expect(textures.length).toBeGreaterThan(0);
    expect(textures.filter((path) => !existsSync(join(STYLES, path)))).toEqual([]);
  });

  test("keeps every rule inside the starlight-warcraft layer so sites can override it", () => {
    expect(css.trimStart()).toStartWith("@layer starlight-warcraft {");
  });
});

describe("starlight.css", () => {
  const css = stylesheet("starlight.css");

  test("maps Starlight's dark and light palettes onto the theme's gold and stone", () => {
    expect(css).toContain("--sl-color-accent: var(--wc-gold-600)");
    expect(css).toContain(':root[data-theme="light"]');
  });

  test("brings in the tokens and the component styles", () => {
    expect(css).toContain('@import "./tokens.css";');
    expect(css).toContain('@import "./components.css";');
  });
});

describe("layer order", () => {
  test("declares the theme layer after Starlight's, even when it loads first", () => {
    expect(stylesheet("starlight.css")).toStartWith("@layer starlight, starlight-warcraft;");
  });
});
