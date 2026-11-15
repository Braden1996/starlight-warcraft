import type { HookParameters, StarlightPlugin } from "@astrojs/starlight/types";

type SetupParameters = HookParameters<"config:setup">;

export interface StarlightWarcraftOptions {
  readonly fonts?: boolean;
}

export const THEME_STYLESHEET = "starlight-warcraft/styles/starlight.css";
export const FONT_STYLESHEET = "starlight-warcraft/styles/fonts.css";

export function themeStylesheets(options: StarlightWarcraftOptions): readonly string[] {
  return options.fonts === false ? [THEME_STYLESHEET] : [FONT_STYLESHEET, THEME_STYLESHEET];
}

export function withThemeFirst(
  existing: readonly string[] | undefined,
  options: StarlightWarcraftOptions,
): string[] {
  const theme = themeStylesheets(options);
  const rest = (existing ?? []).filter((path) => !theme.includes(path));
  return [...theme, ...rest];
}

function applyTheme(options: StarlightWarcraftOptions, parameters: SetupParameters): void {
  parameters.updateConfig({ customCss: withThemeFirst(parameters.config.customCss, options) });
}

export function starlightWarcraft(options: StarlightWarcraftOptions = {}): StarlightPlugin {
  return {
    name: "starlight-warcraft",
    hooks: {
      "config:setup": (parameters) => {
        applyTheme(options, parameters);
      },
    },
  };
}
