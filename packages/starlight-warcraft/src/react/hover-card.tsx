import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

import { classNames } from "./class-names.ts";
import { panelClassName } from "./panel.tsx";
import type { PanelQuality } from "./panel.tsx";

export interface HoverCardData {
  readonly title: string;
  readonly kind: string;
  readonly body: string;
  readonly quality?: PanelQuality;
  readonly error?: boolean;
  readonly view?: Element;
}

export interface HoverCardSource {
  readonly selector: string;
  readonly load: (anchor: HTMLElement) => Promise<HoverCardData | undefined>;
}

export interface HoverCardPlacement {
  readonly left: number;
  readonly offset: number;
  readonly below: boolean;
}

export interface AnchorBox {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
}

export interface Viewport {
  readonly width: number;
  readonly height: number;
}

export const HOVER_CARD_WIDTH = 440;
const GAP = 6;
const EDGE = 8;
const OPEN_DELAY = 250;
const CLOSE_DELAY = 150;

export const LUAU_ERROR_SELECTOR = "[data-luau-error]";
export const LUAU_TYPE_SELECTOR = "[data-luau-type]";

export function placeHoverCard(anchor: AnchorBox, viewport: Viewport): HoverCardPlacement {
  const below = anchor.top < viewport.height / 2;
  const left = Math.max(EDGE, Math.min(anchor.left, viewport.width - HOVER_CARD_WIDTH - EDGE));
  return { left, below, offset: below ? anchor.bottom + GAP : viewport.height - anchor.top + GAP };
}

export function luauErrorCard(message: string): HoverCardData {
  const colon = message.indexOf(": ");
  return colon === -1
    ? { title: "Error", kind: "the line marked -- error", body: message, error: true }
    : {
        title: message.slice(0, colon),
        kind: "the line marked -- error",
        body: message.slice(colon + 2),
        error: true,
      };
}

export function luauTypeCard(label: string, view: Element | undefined): HoverCardData {
  const card = { title: "Inferred type", kind: "Luau, new solver", body: label };
  return view === undefined ? card : { ...card, view };
}

const luauErrorSource: HoverCardSource = {
  selector: LUAU_ERROR_SELECTOR,
  load: (anchor) => {
    const message = anchor.dataset["luauError"];
    return Promise.resolve(message === undefined ? undefined : luauErrorCard(message));
  },
};

const luauTypeSource: HoverCardSource = {
  selector: LUAU_TYPE_SELECTOR,
  load: (anchor) => {
    const label = anchor.dataset["luauType"];
    const view = anchor.querySelector(":scope > .luau-popup") ?? undefined;
    return Promise.resolve(label === undefined ? undefined : luauTypeCard(label, view));
  },
};

export function hoverCardSources(extra: readonly HoverCardSource[]): readonly HoverCardSource[] {
  return [luauErrorSource, ...extra, luauTypeSource];
}

interface Hovered {
  readonly anchor: HTMLElement;
  readonly source: HoverCardSource;
}

function hoveredBy(
  target: EventTarget | null,
  sources: readonly HoverCardSource[],
): Hovered | undefined {
  if (!(target instanceof Element)) {
    return undefined;
  }
  for (const source of sources) {
    const anchor = target.closest(source.selector);
    if (anchor instanceof HTMLElement) {
      return { anchor, source };
    }
  }
  return undefined;
}

function copyView(view: Element): (code: HTMLElement | null) => void {
  return (code) => {
    code?.replaceChildren(...[...view.childNodes].map((node) => node.cloneNode(true)));
  };
}

export interface HoverCardProps {
  readonly card: HoverCardData;
  readonly placement?: HoverCardPlacement;
  readonly onPointerEnter?: () => void;
  readonly onPointerLeave?: () => void;
}

export const HoverCard = ({
  card,
  placement,
  onPointerEnter,
  onPointerLeave,
}: HoverCardProps): ReactElement => {
  const position =
    placement === undefined
      ? undefined
      : {
          ...(placement.below ? { top: placement.offset } : { bottom: placement.offset }),
          left: placement.left,
          width: HOVER_CARD_WIDTH,
        };
  return (
    <div
      role="tooltip"
      className={classNames(
        "wc-hover-card",
        panelClassName(card.quality ?? "common"),
        card.error === true && "wc-hover-card-error",
      )}
      data-slot="hover-card"
      data-floating={placement === undefined ? undefined : ""}
      style={position}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="wc-hover-card-head">
        <span className="wc-hover-card-title">{card.title}</span>
        <span className="wc-hover-card-kind">{card.kind}</span>
      </div>
      {card.view === undefined ? (
        <pre className="wc-hover-card-body">
          <code>{card.body}</code>
        </pre>
      ) : (
        <pre className="wc-hover-card-body">
          <code ref={copyView(card.view)} />
        </pre>
      )}
    </div>
  );
};

export interface HoverCardsProps {
  readonly sources?: readonly HoverCardSource[];
}

interface Shown {
  readonly card: HoverCardData;
  readonly placement: HoverCardPlacement;
}

const NO_SOURCES: readonly HoverCardSource[] = [];

export const HoverCards = ({ sources = NO_SOURCES }: HoverCardsProps): ReactElement | null => {
  const [shown, setShown] = useState<Shown | undefined>(undefined);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const current = useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const all = hoverCardSources(sources);
    const hide = (): void => {
      current.current = undefined;
      setShown(undefined);
    };
    const scheduleClose = (): void => {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = window.setTimeout(hide, CLOSE_DELAY);
    };
    const show = async (anchor: HTMLElement, source: HoverCardSource): Promise<void> => {
      const card = await source.load(anchor);
      if (card !== undefined && current.current === anchor) {
        const viewport = { width: window.innerWidth, height: window.innerHeight };
        setShown({ card, placement: placeHoverCard(anchor.getBoundingClientRect(), viewport) });
      }
    };
    const open = ({ anchor, source }: Hovered): void => {
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(openTimer.current);
      current.current = anchor;
      openTimer.current = window.setTimeout(() => {
        void show(anchor, source).catch(hide);
      }, OPEN_DELAY);
    };
    const onOver = (event: Event): void => {
      const hovered = hoveredBy(event.target, all);
      if (hovered !== undefined && hovered.anchor !== current.current) {
        open(hovered);
      }
    };
    const onOut = (event: Event): void => {
      if (hoveredBy(event.target, all) !== undefined) {
        window.clearTimeout(openTimer.current);
        scheduleClose();
      }
    };
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        hide();
      }
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onOver);
    document.addEventListener("focusout", onOut);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", scheduleClose, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onOver);
      document.removeEventListener("focusout", onOut);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", scheduleClose);
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
    };
  }, [sources]);

  if (shown === undefined) {
    return null;
  }
  return (
    <HoverCard
      card={shown.card}
      placement={shown.placement}
      onPointerEnter={() => {
        window.clearTimeout(closeTimer.current);
      }}
      onPointerLeave={() => {
        current.current = undefined;
        setShown(undefined);
      }}
    />
  );
};
