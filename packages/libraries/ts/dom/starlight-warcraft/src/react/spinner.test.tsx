import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { Spinner } from "./spinner.tsx";

describe("Spinner", () => {
  test("announces itself as a loading status", () => {
    const html = renderToStaticMarkup(<Spinner />);
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-label="Loading"');
  });

  test("draws the glyph twice: a blurred glow under the core", () => {
    const html = renderToStaticMarkup(<Spinner />);
    expect(html.indexOf("wc-spinner-glow")).toBeLessThan(html.indexOf("wc-spinner-core"));
  });

  test("lets the caller relabel it", () => {
    expect(renderToStaticMarkup(<Spinner aria-label="Searching" />)).toContain('aria-label="Searching"');
  });
});
