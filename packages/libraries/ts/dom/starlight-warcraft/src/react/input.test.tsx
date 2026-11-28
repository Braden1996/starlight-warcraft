import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { Input } from "./input.tsx";

describe("Input", () => {
  test("renders a framed input and passes its attributes through", () => {
    expect(renderToStaticMarkup(<Input type="search" placeholder="Search" />)).toBe(
      '<input class="wc-input" data-slot="input" type="search" placeholder="Search"/>',
    );
  });
});
