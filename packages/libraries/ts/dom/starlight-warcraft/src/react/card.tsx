import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";

export type CardSize = "default" | "sm";

export interface CardProps extends ComponentProps<"div"> {
  readonly size?: CardSize;
}

export const Card = ({ className, size = "default", ...props }: CardProps): ReactElement => (
  <div className={classNames("wc-card", className)} data-slot="card" data-size={size} {...props} />
);

export const CardHeader = ({ className, ...props }: ComponentProps<"div">): ReactElement => (
  <div className={classNames("wc-card-header", className)} data-slot="card-header" {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"div">): ReactElement => (
  <div className={classNames("wc-card-title", className)} data-slot="card-title" {...props} />
);

export const CardDescription = ({ className, ...props }: ComponentProps<"div">): ReactElement => (
  <div className={classNames("wc-card-description", className)} data-slot="card-description" {...props} />
);

export const CardContent = ({ className, ...props }: ComponentProps<"div">): ReactElement => (
  <div className={classNames("wc-card-content", className)} data-slot="card-content" {...props} />
);

export const CardFooter = ({ className, ...props }: ComponentProps<"div">): ReactElement => (
  <div className={classNames("wc-card-footer", className)} data-slot="card-footer" {...props} />
);
