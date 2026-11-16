import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";

export const DISCLAIMER =
  "An unofficial community project. World of Warcraft and Blizzard Entertainment are trademarks of Blizzard Entertainment, Inc.; this site is not affiliated with or endorsed by Blizzard.";

export interface DisclaimerProps extends ComponentProps<"p"> {
  readonly licence?: string;
}

export const Disclaimer = ({
  className,
  licence,
  children,
  ...props
}: DisclaimerProps): ReactElement => (
  <p className={classNames("wc-disclaimer", className)} data-slot="disclaimer" {...props}>
    {DISCLAIMER}
    {licence === undefined ? null : ` ${licence}`}
    {children}
  </p>
);
