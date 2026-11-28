import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { Badge } from "./badge.tsx";

describe("Badge", () => {
  test("renders a span with default variant, size and shape", () => {
    expect(renderToStaticMarkup(<Badge>New</Badge>)).toBe(
      '<span class="wc-badge" data-slot="badge" data-variant="default" data-size="default" data-shape="default">New</span>',
    );
  });

  test("records each choice as a data attribute", () => {
    const html = renderToStaticMarkup(
      <Badge variant="outline" size="lg" shape="banner">
        Rank
      </Badge>,
    );
    expect(html).toContain('data-variant="outline"');
    expect(html).toContain('data-size="lg"');
    expect(html).toContain('data-shape="banner"');
  });
});
