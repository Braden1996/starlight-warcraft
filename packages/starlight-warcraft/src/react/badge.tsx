import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";
export type BadgeSize = "default" | "sm" | "lg";
export type BadgeShape = "default" | "shield" | "banner";

export interface BadgeProps extends ComponentProps<"span"> {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  readonly shape?: BadgeShape;
}

export const Badge = ({
  className,
  variant = "default",
  size = "default",
  shape = "default",
  ...props
}: BadgeProps): ReactElement => (
  <span
    className={classNames("wc-badge", className)}
    data-slot="badge"
    data-variant={variant}
    data-size={size}
    data-shape={shape}
    {...props}
  />
);
