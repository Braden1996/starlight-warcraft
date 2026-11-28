import type { StarlightWarcraftOptions } from "./index.ts";

export const THEME_STYLESHEET = "starlight-warcraft/styles/starlight.css";
export const FONT_STYLESHEET = "starlight-warcraft/styles/fonts.css";

export function themeStylesheets(options: StarlightWarcraftOptions): readonly string[] {
  return options.fonts === false ? [THEME_STYLESHEET] : [FONT_STYLESHEET, THEME_STYLESHEET];
}

export function withThemeFirst(existing: readonly string[] | undefined, options: StarlightWarcraftOptions): string[] {
  const theme = themeStylesheets(options);
  const rest = (existing ?? []).filter((path) => !theme.includes(path));
  return [...theme, ...rest];
}
