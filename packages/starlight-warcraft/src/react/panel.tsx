import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";

export type PanelQuality = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface PanelProps extends ComponentProps<"div"> {
  readonly quality?: PanelQuality;
}

const QUALITY_CLASS: Readonly<Record<PanelQuality, string>> = {
  common: "wc-tooltip",
  uncommon: "wc-tooltip-uncommon",
  rare: "wc-tooltip-rare",
  epic: "wc-tooltip-epic",
  legendary: "wc-tooltip-legendary",
};

export function panelClassName(quality: PanelQuality): string {
  return `wc-panel wc-tooltip-base ${QUALITY_CLASS[quality]}`;
}

export const Panel = ({ className, quality = "common", ...props }: PanelProps): ReactElement => (
  <div
    className={classNames(panelClassName(quality), className)}
    data-slot="panel"
    data-quality={quality}
    {...props}
  />
);
