import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { Panel, panelClassName } from "./panel.tsx";

describe("panelClassName", () => {
  test("uses the gold border for common quality", () => {
    expect(panelClassName("common")).toBe("wc-panel wc-tooltip-base wc-tooltip");
  });

  test("uses the quality's own border otherwise", () => {
    expect(panelClassName("epic")).toBe("wc-panel wc-tooltip-base wc-tooltip-epic");
  });
});

describe("Panel", () => {
  test("defaults to common quality", () => {
    expect(renderToStaticMarkup(<Panel>Text</Panel>)).toBe(
      '<div class="wc-panel wc-tooltip-base wc-tooltip" data-slot="panel" data-quality="common">Text</div>',
    );
  });
});
