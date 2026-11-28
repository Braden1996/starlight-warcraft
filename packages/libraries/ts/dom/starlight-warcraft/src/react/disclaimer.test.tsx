import { describe, expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { DISCLAIMER, Disclaimer } from "./disclaimer.tsx";

describe("Disclaimer", () => {
  test("states that the site is unofficial and names Blizzard's trademarks", () => {
    expect(DISCLAIMER).toContain("unofficial");
    expect(DISCLAIMER).toContain("trademarks of Blizzard Entertainment, Inc.");
  });

  test("renders the notice in a styled paragraph", () => {
    expect(renderToStaticMarkup(<Disclaimer />)).toBe(
      `<p class="wc-disclaimer" data-slot="disclaimer">${DISCLAIMER}</p>`,
    );
  });

  test("appends the licence line after the notice", () => {
    expect(renderToStaticMarkup(<Disclaimer licence="Code under the MIT licence." />)).toContain(
      "endorsed by Blizzard. Code under the MIT licence.",
    );
  });
});
