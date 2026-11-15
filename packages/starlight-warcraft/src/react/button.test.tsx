import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "./button.tsx";

describe("Button", () => {
  test("renders a button with the default variant and size", () => {
    expect(renderToStaticMarkup(<Button>Enter</Button>)).toBe(
      '<button class="wc-button" data-slot="button" data-variant="default" data-size="default">Enter</button>',
    );
  });

  test("records the variant and size as data attributes for the stylesheet", () => {
    const html = renderToStaticMarkup(
      <Button variant="frame" size="sm">
        Go
      </Button>,
    );
    expect(html).toContain('data-variant="frame"');
    expect(html).toContain('data-size="sm"');
  });

  test("appends the caller's class after its own", () => {
    expect(renderToStaticMarkup(<Button className="wide">Go</Button>)).toContain(
      'class="wc-button wide"',
    );
  });

  test("styles its only child instead of a button when asChild is set", () => {
    const html = renderToStaticMarkup(
      <Button asChild>
        <a href="/start/">Start</a>
      </Button>,
    );
    expect(html).toStartWith("<a ");
    expect(html).toContain('class="wc-button"');
    expect(html).toContain('href="/start/"');
    expect(html).not.toContain("<button");
  });
});
