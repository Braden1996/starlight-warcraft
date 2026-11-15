import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";

export const Input = ({ className, type, ...props }: ComponentProps<"input">): ReactElement => (
  <input className={classNames("wc-input", className)} data-slot="input" type={type} {...props} />
);
