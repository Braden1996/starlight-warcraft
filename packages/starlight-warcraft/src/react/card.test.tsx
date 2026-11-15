import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card.tsx";

const PARTS = [
  "card-header",
  "card-title",
  "card-description",
  "card-content",
  "card-footer",
] as const;

describe("Card", () => {
  test("renders every part with its own class and slot", () => {
    const html = renderToStaticMarkup(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(html).toStartWith('<div class="wc-card" data-slot="card" data-size="default">');
    for (const part of PARTS) {
      expect(html).toContain(`class="wc-${part}" data-slot="${part}"`);
    }
  });

  test("records the small size for the stylesheet", () => {
    expect(renderToStaticMarkup(<Card size="sm" />)).toContain('data-size="sm"');
  });
});
