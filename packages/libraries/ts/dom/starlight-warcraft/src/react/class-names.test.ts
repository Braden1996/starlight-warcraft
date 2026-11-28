import { describe, expect, test } from "bun:test";

import { classNames } from "./class-names.ts";

describe("classNames", () => {
  test("joins classes with single spaces", () => {
    expect(classNames("wc-button", "extra")).toBe("wc-button extra");
  });

  test("skips empty, false, null and undefined parts", () => {
    expect(classNames("wc-card", "", false, null, undefined, "wide")).toBe("wc-card wide");
  });
});
