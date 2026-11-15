import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";

export const Skeleton = ({
  className,
  children,
  ...props
}: ComponentProps<"div">): ReactElement => (
  <div className={classNames("wc-skeleton", className)} data-slot="skeleton" {...props}>
    <div className="wc-skeleton-icons" aria-hidden="true" />
    <div className="wc-skeleton-shimmer" aria-hidden="true" />
    {children}
  </div>
);
