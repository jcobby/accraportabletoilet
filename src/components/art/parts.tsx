/**
 * Shared building blocks for the unit illustrations.
 *
 * Everything is drawn straight-on into a 400×300 stage so the whole set shares one
 * eye level, one light direction (top-left) and one stroke weight. That consistency
 * is what makes them read as a family rather than a pile of clip art.
 */

export const STAGE = { w: 400, h: 300, ground: 252 } as const;

export const INK = "var(--brand-ink)";
export const BRAND = "var(--brand)";
export const BRIGHT = "var(--brand-bright)";
export const FRESH = "var(--fresh)";
export const SAND = "var(--sand)";
export const TURF = "var(--turf)";

/**
 * Gradient definitions every illustration references.
 *
 * The id is fixed rather than generated: the definitions are byte-identical in every
 * instance, so several on one page resolving to the first is not just harmless, it is
 * what we want — one set of gradients shared across the whole set.
 */
export function ArtDefs({ id = "art" }: { id?: string }) {
  return (
    <defs>
      {/* White shell, lit from the upper left. */}
      <linearGradient id={`${id}-shell`} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="62%" stopColor="#f4f7fb" />
        <stop offset="100%" stopColor="#e4eaf3" />
      </linearGradient>

      {/* Door faces sit a shade cooler than the shell so they separate without outlines. */}
      <linearGradient id={`${id}-door`} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#eef3fa" />
        <stop offset="100%" stopColor="#dbe4f1" />
      </linearGradient>

      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={FRESH} stopOpacity="0.5" />
        <stop offset="100%" stopColor={BRIGHT} stopOpacity="0.28" />
      </linearGradient>

      {/* Warm interior light spilling out of a doorway at night. */}
      <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={SAND} stopOpacity="0.95" />
        <stop offset="100%" stopColor={SAND} stopOpacity="0.55" />
      </linearGradient>

      <radialGradient id={`${id}-lamp`}>
        <stop offset="0%" stopColor={SAND} stopOpacity="0.55" />
        <stop offset="100%" stopColor={SAND} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** Contact shadow. Everything that stands on the ground gets one. */
export function Ground({
  cx = 200,
  rx = 150,
  opacity = 0.16,
}: {
  cx?: number;
  rx?: number;
  opacity?: number;
}) {
  return (
    <ellipse cx={cx} cy={STAGE.ground + 3} rx={rx} ry={9} fill={INK} opacity={opacity} />
  );
}

/** The strip of artificial turf the trailers are always set down on. */
export function TurfMat({ x, w }: { x: number; w: number }) {
  return (
    <g>
      <rect x={x} y={STAGE.ground - 8} width={w} height={11} rx={5} fill={TURF} opacity="0.85" />
      <rect x={x} y={STAGE.ground - 8} width={w} height={4} rx={2} fill="#ffffff" opacity="0.22" />
    </g>
  );
}

/** Road wheel with a hub. */
export function Wheel({ cx, cy = 226, r = 21 }: { cx: number; cy?: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={INK} opacity="0.92" />
      <circle cx={cx} cy={cy} r={r * 0.52} fill="#e8edf5" />
      <circle cx={cx} cy={cy} r={r * 0.2} fill={INK} opacity="0.4" />
    </g>
  );
}

/**
 * The turf-topped entry steps. Drawn as a stack that narrows going up, with a
 * handrail on the outer edge — it is the detail that separates a hire trailer from
 * a builder's site cabin, so it appears on every unit that has one.
 */
export function Steps({ x, flip = false }: { x: number; flip?: boolean }) {
  const treads = [
    { dx: 0, w: 84, y: STAGE.ground - 14 },
    { dx: 9, w: 66, y: STAGE.ground - 29 },
    { dx: 18, w: 48, y: STAGE.ground - 44 },
  ];

  return (
    <g transform={flip ? `translate(${x * 2 + 84}, 0) scale(-1, 1)` : undefined}>
      {treads.map((tread) => (
        <g key={tread.y}>
          <rect
            x={x + tread.dx}
            y={tread.y}
            width={tread.w}
            height={15}
            rx={3}
            fill="url(#art-shell)"
            stroke={INK}
            strokeOpacity="0.16"
          />
          <rect
            x={x + tread.dx}
            y={tread.y}
            width={tread.w}
            height={5}
            rx={2.5}
            fill={TURF}
            opacity="0.8"
          />
        </g>
      ))}
      {/* Handrail: two posts standing on the treads with a rail running parallel to
          the step slope. It deliberately stops at the top tread — a rail carried on
          across the body reads as a flag pole rather than a railing. */}
      <g stroke={BRAND} strokeLinecap="round" fill="none" opacity="0.85">
        <path d={`M${x + 86} ${STAGE.ground - 14} L${x + 86} ${STAGE.ground - 42}`} strokeWidth={4.5} />
        <path d={`M${x + 64} ${STAGE.ground - 44} L${x + 64} ${STAGE.ground - 70}`} strokeWidth={4.5} />
        <path d={`M${x + 88} ${STAGE.ground - 42} L${x + 62} ${STAGE.ground - 70}`} strokeWidth={4.5} />
      </g>
    </g>
  );
}

/** Small company plate riveted to the shell — the logo stand-in at this scale. */
export function BrandPlate({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.75">
      <rect x={x} y={y} width={46} height={20} rx={3} fill="#ffffff" />
      <rect x={x + 5} y={y + 5} width={26} height={3.5} rx={1.75} fill={INK} opacity="0.5" />
      <rect x={x + 5} y={y + 12} width={36} height={3.5} rx={1.75} fill={BRAND} />
    </g>
  );
}

/** Roof marker lamps. */
export function MarkerLights({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y} width={14} height={5} rx={2.5} fill={SAND} />
      <rect x={x + w - 14} y={y} width={14} height={5} rx={2.5} fill={SAND} />
    </g>
  );
}
