import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import {
  HOVER_CARD_WIDTH,
  HoverCard,
  hoverCardSources,
  LUAU_ERROR_SELECTOR,
  LUAU_TYPE_SELECTOR,
  luauErrorCard,
  luauTypeCard,
  placeHoverCard,
} from "./hover-card.tsx";

const VIEWPORT = { width: 1280, height: 800 };

describe("placeHoverCard", () => {
  test("opens below an anchor in the top half of the viewport", () => {
    expect(placeHoverCard({ top: 100, bottom: 120, left: 300 }, VIEWPORT)).toEqual({
      left: 300,
      below: true,
      offset: 126,
    });
  });

  test("opens above an anchor in the bottom half, measured from the viewport's bottom", () => {
    expect(placeHoverCard({ top: 700, bottom: 720, left: 300 }, VIEWPORT)).toEqual({
      left: 300,
      below: false,
      offset: 106,
    });
  });

  test("keeps the card inside the viewport's right edge", () => {
    expect(placeHoverCard({ top: 100, bottom: 120, left: 1200 }, VIEWPORT).left).toBe(
      VIEWPORT.width - HOVER_CARD_WIDTH - 8,
    );
  });
});

describe("luauErrorCard", () => {
  test("splits the error kind from its message", () => {
    expect(luauErrorCard("TypeError: Unknown global 'x'")).toEqual({
      title: "TypeError",
      kind: "the line marked -- error",
      body: "Unknown global 'x'",
      error: true,
    });
  });

  test("keeps a message without a kind whole", () => {
    expect(luauErrorCard("something broke").title).toBe("Error");
  });
});

describe("luauTypeCard", () => {
  test("titles the label as the inferred type", () => {
    expect(luauTypeCard("local frame: Frame", undefined)).toEqual({
      title: "Inferred type",
      kind: "Luau, new solver",
      body: "local frame: Frame",
    });
  });
});

describe("hoverCardSources", () => {
  test("checks errors first and inferred types last, with the site's own sources between", () => {
    const site = { selector: "a[data-sym]", load: () => Promise.resolve(undefined) };
    expect(hoverCardSources([site]).map((source) => source.selector)).toEqual([
      LUAU_ERROR_SELECTOR,
      "a[data-sym]",
      LUAU_TYPE_SELECTOR,
    ]);
  });
});

describe("HoverCard", () => {
  test("renders a common-quality tooltip panel with the title, kind and body", () => {
    const html = renderToStaticMarkup(
      <HoverCard card={{ title: "print", kind: "global function", body: "x" }} />,
    );
    expect(html).toContain('class="wc-hover-card wc-panel wc-tooltip-base wc-tooltip"');
    expect(html).toContain('<span class="wc-hover-card-title">print</span>');
    expect(html).toContain('<pre class="wc-hover-card-body"><code>x</code></pre>');
  });

  test("uses the card's quality border and marks errors", () => {
    const html = renderToStaticMarkup(
      <HoverCard
        card={{ title: "TypeError", kind: "k", body: "b", quality: "rare", error: true }}
      />,
    );
    expect(html).toContain(
      'class="wc-hover-card wc-panel wc-tooltip-base wc-tooltip-rare wc-hover-card-error"',
    );
  });

  test("positions itself from the placement", () => {
    const html = renderToStaticMarkup(
      <HoverCard
        card={{ title: "t", kind: "k", body: "b" }}
        placement={{ left: 10, offset: 20, below: false }}
      />,
    );
    expect(html).toContain(
      `data-floating="" style="bottom:20px;left:10px;width:${String(HOVER_CARD_WIDTH)}px"`,
    );
  });

  test("stays in the page flow without a placement", () => {
    expect(
      renderToStaticMarkup(<HoverCard card={{ title: "t", kind: "k", body: "b" }} />),
    ).not.toContain("data-floating");
  });
});
