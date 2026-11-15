import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";

export type ButtonVariant = "default" | "frame";
export type ButtonSize = "default" | "sm";

export interface ButtonProps extends ComponentProps<"button"> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly asChild?: boolean;
}

export const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps): ReactElement => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={classNames("wc-button", className)}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
};
