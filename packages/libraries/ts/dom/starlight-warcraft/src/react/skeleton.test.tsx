import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { Skeleton } from "./skeleton.tsx";

describe("Skeleton", () => {
  test("renders the rune pattern and the shimmer as hidden layers", () => {
    const html = renderToStaticMarkup(<Skeleton className="line" />);
    expect(html).toStartWith('<div class="wc-skeleton line" data-slot="skeleton">');
    expect(html).toContain('<div class="wc-skeleton-icons" aria-hidden="true"></div>');
    expect(html).toContain('<div class="wc-skeleton-shimmer" aria-hidden="true"></div>');
  });
});
