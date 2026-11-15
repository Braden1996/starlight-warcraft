import type { OxfmtConfig } from "oxfmt";

const config: OxfmtConfig = {
  ignorePatterns: [
    "**/node_modules/**",

    "**/*.tsbuildinfo",
    "**/package.json",
    "**/bun.lock",
    "**/*.md",
    "**/*.mdx",
    "**/*.json",
  ],
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  sortPackageJson: false,
  sortImports: {
    groups: [
      ["side_effect_style", "side_effect"],
      "builtin",
      "external",
      ["parent", "sibling", "index"],
      "style",
      "unknown",
    ],
    ignoreCase: true,
    newlinesBetween: true,
    order: "asc",
    partitionByComment: true,
    sortSideEffects: false,
  },
};

export default config;
