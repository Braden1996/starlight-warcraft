import type { ComponentProps, ReactElement } from "react";

import { classNames } from "./class-names.ts";
import { SPINNER_PATH } from "./spinner-path.ts";

const VIEW_BOX = "14 15.946284 187.21483 333.9404";
const CENTER_X = 107.607415;
const CENTER_Y = 182.916484;
const TILT = `translate(${String(CENTER_X)} ${String(CENTER_Y)}) rotate(-2) translate(${String(-CENTER_X)} ${String(-CENTER_Y)})`;

export const Spinner = ({ className, ...props }: ComponentProps<"svg">): ReactElement => (
  <svg
    className={classNames("wc-spinner", className)}
    data-slot="spinner"
    role="status"
    aria-label="Loading"
    viewBox={VIEW_BOX}
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g transform={TILT}>
      <g className="wc-spinner-wrap">
        <path className="wc-spinner-glow" d={SPINNER_PATH} fill="currentColor" />
        <path className="wc-spinner-core" d={SPINNER_PATH} fill="currentColor" />
      </g>
    </g>
  </svg>
);
