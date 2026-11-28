import type { HookParameters, StarlightPlugin } from "@astrojs/starlight/types";

import { withThemeFirst } from "./theme-stylesheets.ts";

type SetupParameters = HookParameters<"config:setup">;

export interface StarlightWarcraftOptions {
  readonly fonts?: boolean;
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

export default starlightWarcraft;
