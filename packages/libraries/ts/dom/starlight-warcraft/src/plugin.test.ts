import { describe, expect, test } from "bun:test";

import { starlightWarcraft } from "./index.ts";
import { FONT_STYLESHEET, THEME_STYLESHEET, themeStylesheets, withThemeFirst } from "./theme-stylesheets.ts";

describe("themeStylesheets", () => {
  test("loads the self-hosted Cinzel font before the theme by default", () => {
    expect(themeStylesheets({})).toEqual([FONT_STYLESHEET, THEME_STYLESHEET]);
  });

  test("leaves the font out when fonts is false", () => {
    expect(themeStylesheets({ fonts: false })).toEqual([THEME_STYLESHEET]);
  });
});

describe("withThemeFirst", () => {
  test("puts the theme before the site's own stylesheets so the site can override it", () => {
    expect(withThemeFirst(["./src/styles/site.css"], {})).toEqual([
      FONT_STYLESHEET,
      THEME_STYLESHEET,
      "./src/styles/site.css",
    ]);
  });

  test("works when the site has no custom CSS", () => {
    expect(withThemeFirst(undefined, { fonts: false })).toEqual([THEME_STYLESHEET]);
  });

  test("does not add the theme twice when the site already lists it", () => {
    expect(withThemeFirst([THEME_STYLESHEET, "./site.css"], { fonts: false })).toEqual([
      THEME_STYLESHEET,
      "./site.css",
    ]);
  });
});

describe("starlightWarcraft", () => {
  test("is named for Starlight's plugin list", () => {
    expect(starlightWarcraft().name).toBe("starlight-warcraft");
  });

  test("registers only the config:setup hook", () => {
    expect(Object.keys(starlightWarcraft().hooks)).toEqual(["config:setup"]);
  });
});
