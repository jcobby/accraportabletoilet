import {
  ArtDefs,
  BRAND,
  BRIGHT,
  BrandPlate,
  FRESH,
  Ground,
  INK,
  MarkerLights,
  SAND,
  STAGE,
  Steps,
  TURF,
  TurfMat,
  Wheel,
} from "./parts";

const stage = `0 0 ${STAGE.w} ${STAGE.h}`;

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={stage} fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <ArtDefs />
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- trailers -- */

/**
 * Restroom trailer, 2 or 3 doors. Both variants come from one function so the
 * proportions, livery stripe and step detail can never drift apart.
 */
function Trailer({ doors }: { doors: 2 | 3 }) {
  const bodyX = doors === 3 ? 40 : 66;
  const bodyW = doors === 3 ? 300 : 248;
  const pad = 14;
  const gap = 10;
  const doorW = (bodyW - pad * 2 - gap * (doors - 1)) / doors;
  const stepsX = bodyX + bodyW - 54;
  const axles = doors === 3 ? [bodyX + 110, bodyX + 165] : [bodyX + 108];

  return (
    <Stage>
      <Ground cx={200} rx={doors === 3 ? 152 : 132} />
      <TurfMat x={stepsX - 8} w={104} />

      {/* shell */}
      <rect x={bodyX} y={76} width={bodyW} height={126} rx={7} fill="url(#art-shell)" />
      <rect x={bodyX - 6} y={64} width={bodyW + 12} height={16} rx={5} fill="url(#art-shell)" />
      <rect
        x={bodyX - 6}
        y={64}
        width={bodyW + 12}
        height={5}
        rx={2.5}
        fill={INK}
        opacity="0.08"
      />
      <MarkerLights x={bodyX - 2} y={58} w={bodyW + 4} />

      {/* doors */}
      {Array.from({ length: doors }).map((_, index) => {
        const x = bodyX + pad + index * (doorW + gap);
        return (
          <g key={x}>
            <rect x={x} y={96} width={doorW} height={100} rx={4} fill="url(#art-door)" />
            <rect
              x={x + 14}
              y={108}
              width={doorW - 28}
              height={26}
              rx={3}
              fill="url(#art-glass)"
            />
            <circle cx={x + doorW - 13} cy={152} r={3.5} fill={BRAND} />
          </g>
        );
      })}

      {/* livery stripe + skirt */}
      <rect x={bodyX + 10} y={188} width={bodyW - 20} height={4} rx={2} fill={BRAND} opacity="0.5" />
      <rect x={bodyX} y={198} width={bodyW} height={10} rx={3} fill={INK} opacity="0.14" />
      <rect
        x={bodyX + 12}
        y={208}
        width={bodyW - 24}
        height={7}
        rx={3.5}
        fill={INK}
        opacity="0.75"
      />

      {axles.map((cx) => (
        <Wheel key={cx} cx={cx} />
      ))}

      <Steps x={stepsX} />
    </Stage>
  );
}

export const TrailerThree = () => <Trailer doors={3} />;
export const TrailerTwo = () => <Trailer doors={2} />;

/* ------------------------------------------------------------------ cabins -- */

/** Single upmarket cabin on a skid base. */
export function Cabin() {
  return (
    <Stage>
      <Ground cx={200} rx={96} />
      <rect x={118} y={238} width={164} height={13} rx={4} fill={INK} opacity="0.8" />
      <rect x={126} y={78} width={148} height={162} rx={6} fill="url(#art-shell)" />
      <rect x={116} y={64} width={168} height={17} rx={5} fill="url(#art-shell)" />
      <rect x={116} y={64} width={168} height={5} rx={2.5} fill={INK} opacity="0.08" />

      <rect x={142} y={96} width={116} height={132} rx={4} fill="url(#art-door)" />
      <rect x={158} y={108} width={84} height={30} rx={3} fill="url(#art-glass)" />
      <rect x={247} y={154} width={6} height={20} rx={3} fill={BRAND} />
      <BrandPlate x={177} y={188} />

      {/* roof vent */}
      <rect x={188} y={50} width={24} height={15} rx={4} fill={INK} opacity="0.28" />
    </Stage>
  );
}

/* ---------------------------------------------------------------- cubicles -- */

/** The classic tapered single cubicle. */
export function Cubicle() {
  return (
    <Stage>
      <Ground cx={200} rx={82} />
      <rect x={190} y={42} width={20} height={16} rx={4} fill={INK} opacity="0.28" />
      <rect x={142} y={56} width={116} height={13} rx={3} fill="url(#art-shell)" />
      <path d="M150 67 L250 67 L259 246 L141 246 Z" fill="url(#art-shell)" />
      <path d="M162 84 L238 84 L244 234 L156 234 Z" fill="url(#art-door)" />

      {/* vent slats */}
      {[94, 101, 108].map((y) => (
        <rect key={y} x={176} y={y} width={48} height={4} rx={2} fill={INK} opacity="0.2" />
      ))}

      <rect x={172} y={128} width={56} height={38} rx={4} fill="url(#art-glass)" />
      <circle cx={232} cy={186} r={5} fill={BRAND} />
      <rect x={166} y={200} width={40} height={4} rx={2} fill={BRAND} opacity="0.45" />
    </Stage>
  );
}

/** Three cubicles in a line — the "bank of units" shot. */
export function CubicleRow() {
  const units = [
    { x: -74, s: 0.82, o: 0.55 },
    { x: 0, s: 1, o: 1 },
    { x: 76, s: 0.88, o: 0.75 },
  ];

  return (
    <Stage>
      <Ground cx={200} rx={172} opacity={0.14} />
      {units.map((unit) => (
        <g
          key={unit.x}
          opacity={unit.o}
          transform={`translate(${unit.x + 200 * (1 - unit.s)}, ${STAGE.ground * (1 - unit.s)}) scale(${unit.s})`}
        >
          <rect x={142} y={56} width={116} height={13} rx={3} fill="url(#art-shell)" />
          <path d="M150 67 L250 67 L259 246 L141 246 Z" fill="url(#art-shell)" />
          <path d="M162 84 L238 84 L244 234 L156 234 Z" fill="url(#art-door)" />
          <rect x={172} y={128} width={56} height={38} rx={4} fill="url(#art-glass)" />
          <circle cx={232} cy={186} r={5} fill={BRAND} />
        </g>
      ))}
    </Stage>
  );
}

/* -------------------------------------------------------------- accessible -- */

/** Wide cubicle with a ramped, step-free entrance. */
export function Accessible() {
  return (
    <Stage>
      <Ground cx={196} rx={150} />

      {/* ramp, with a turf-covered surface and a proper railing */}
      <path d="M162 234 L58 248 L58 254 L162 246 Z" fill="url(#art-shell)" />
      <path d="M60 248 L162 234" stroke={TURF} strokeWidth={4.5} strokeLinecap="round" opacity="0.85" />
      <g stroke={BRAND} strokeLinecap="round" fill="none" opacity="0.82">
        <path d="M66 246 L66 210" strokeWidth={4.5} />
        <path d="M64 210 L158 190" strokeWidth={4.5} />
        <path d="M112 240 L112 200" strokeWidth={3} />
      </g>

      <rect x={162} y={82} width={158} height={158} rx={6} fill="url(#art-shell)" />
      <rect x={154} y={68} width={174} height={16} rx={5} fill="url(#art-shell)" />
      <rect x={154} y={68} width={174} height={5} rx={2.5} fill={INK} opacity="0.08" />
      <rect x={180} y={100} width={124} height={134} rx={4} fill="url(#art-door)" />

      {/* accessibility mark */}
      <circle cx={232} cy={140} r={7} fill={BRAND} />
      <path
        d="M232 150 L232 172 L253 172"
        stroke={BRAND}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx={224} cy={184} r={19} stroke={BRAND} strokeWidth={5} fill="none" opacity="0.85" />

      <rect x={295} y={155} width={6} height={20} rx={3} fill={BRAND} />
    </Stage>
  );
}

/* ------------------------------------------------------------------ urinal -- */

/**
 * Four-bay urinal station.
 *
 * The dividing fins carry an outline: without one they are the same value as the
 * shell behind them and the whole thing collapses into a flat panel with four
 * floating ovals. The bowls are taller than they are wide for the same reason —
 * shape is the only cue at this size.
 */
export function Urinal() {
  const bowls = [116, 173, 229, 285];

  return (
    <Stage>
      <Ground cx={200} rx={130} />
      <rect x={92} y={104} width={216} height={70} rx={4} fill="url(#art-door)" />
      <rect x={88} y={172} width={224} height={76} rx={6} fill="url(#art-shell)" />
      <rect x={82} y={90} width={236} height={15} rx={5} fill="url(#art-shell)" />
      <rect x={82} y={90} width={236} height={5} rx={2.5} fill={INK} opacity="0.08" />

      {bowls.map((cx) => (
        <g key={cx}>
          <rect x={cx - 15} y={120} width={30} height={40} rx={15} fill="#ffffff" />
          <rect x={cx - 9} y={128} width={18} height={16} rx={8} fill="url(#art-glass)" />
          <rect x={cx - 6} y={164} width={12} height={4} rx={2} fill={INK} opacity="0.18" />
        </g>
      ))}

      {/* dividing fins, drawn over the bays so they clearly separate them */}
      {[144, 201, 257].map((x) => (
        <rect
          key={x}
          x={x}
          y={98}
          width={11}
          height={86}
          rx={4}
          fill="url(#art-shell)"
          stroke={INK}
          strokeOpacity="0.16"
          strokeWidth={1.5}
        />
      ))}

      <rect x={100} y={196} width={200} height={4} rx={2} fill={BRAND} opacity="0.45" />
    </Stage>
  );
}

/* --------------------------------------------------------------- handwash -- */

/** Free-standing twin-basin hand-washing station. */
export function Handwash() {
  return (
    <Stage>
      <Ground cx={200} rx={86} />
      <rect x={150} y={150} width={100} height={100} rx={8} fill="url(#art-shell)" />
      <rect x={136} y={132} width={128} height={20} rx={7} fill="url(#art-shell)" />

      {[168, 232].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={142} rx={21} ry={7} fill="url(#art-door)" />
          <path
            d={`M${cx} 132 L${cx} 108 q0 -7 7 -7 l8 0`}
            stroke={BRAND}
            strokeWidth={4.5}
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx={cx + 13} cy={118} rx={3} ry={4} fill={FRESH} opacity="0.85" />
          <ellipse cx={cx + 13} cy={128} rx={2} ry={3} fill={FRESH} opacity="0.5" />
        </g>
      ))}

      {/* soap + pedals */}
      <rect x={258} y={104} width={16} height={28} rx={5} fill={BRIGHT} opacity="0.8" />
      <rect x={156} y={244} width={32} height={7} rx={3.5} fill={INK} opacity="0.6" />
      <rect x={212} y={244} width={32} height={7} rx={3.5} fill={INK} opacity="0.6" />
      <rect x={160} y={176} width={80} height={4} rx={2} fill={BRAND} opacity="0.45" />
    </Stage>
  );
}

/* ----------------------------------------------------------------- shower -- */

/** Shower cubicle with a changing area. */
export function Shower() {
  return (
    <Stage>
      <Ground cx={200} rx={88} />
      <rect x={140} y={62} width={120} height={180} rx={6} fill="url(#art-shell)" />
      <rect x={130} y={48} width={140} height={15} rx={5} fill="url(#art-shell)" />
      <rect x={130} y={48} width={140} height={5} rx={2.5} fill={INK} opacity="0.08" />
      <rect x={156} y={80} width={88} height={152} rx={4} fill="url(#art-door)" />

      {/* shower motif — scaled up so it survives being seen at card size */}
      <rect x={174} y={104} width={52} height={11} rx={5.5} fill={BRAND} />
      <rect x={196} y={88} width={7} height={18} rx={3.5} fill={BRAND} opacity="0.75" />
      {[182, 194, 206, 218].map((x, index) => (
        <path
          key={x}
          d={`M${x} 124 q5 16 0 32`}
          stroke={FRESH}
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
          opacity={0.85 - index * 0.11}
        />
      ))}
      <ellipse cx={200} cy={186} rx={34} ry={9} fill={FRESH} opacity="0.24" />
      <circle cx={232} cy={156} r={4.5} fill={BRAND} />
      <rect x={166} y={206} width={40} height={4} rx={2} fill={BRAND} opacity="0.45" />
    </Stage>
  );
}

/* --------------------------------------------------------------- interior -- */

/** Cutaway of a trailer cubicle: WC, basin, mirror. The shot that sells a trailer. */
export function Interior() {
  return (
    <Stage>
      <rect x={62} y={40} width={276} height={182} rx={8} fill="url(#art-door)" />
      <path d="M62 214 L338 214 L356 252 L44 252 Z" fill="url(#art-shell)" />
      <rect x={62} y={168} width={276} height={4} fill={INK} opacity="0.07" />

      {/* ceiling light */}
      <circle cx={168} cy={62} r={40} fill="url(#art-lamp)" />
      <rect x={152} y={50} width={32} height={9} rx={4.5} fill="#ffffff" />

      {/* mirror + basin */}
      <rect
        x={212}
        y={72}
        width={76}
        height={58}
        rx={5}
        fill="url(#art-glass)"
        stroke="#ffffff"
        strokeWidth={3}
      />
      <rect x={206} y={142} width={88} height={16} rx={8} fill="#ffffff" />
      <rect x={240} y={158} width={20} height={56} rx={4} fill="#ffffff" />
      <path
        d="M250 142 L250 132 q0 -5 5 -5 l6 0"
        stroke={BRAND}
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
      />

      {/* WC */}
      <rect x={102} y={116} width={54} height={46} rx={5} fill="#ffffff" />
      <path d="M110 162 L148 162 L142 196 L116 196 Z" fill="#ffffff" />
      <ellipse cx={129} cy={196} rx={27} ry={13} fill="#ffffff" />
      <ellipse cx={129} cy={194} rx={17} ry={7} fill="url(#art-glass)" />
      <rect x={110} y={124} width={20} height={5} rx={2.5} fill={BRAND} opacity="0.6" />

      {/* roll holder — outlined, or it disappears into the white wall */}
      <circle cx={182} cy={150} r={12} fill="#ffffff" stroke={INK} strokeOpacity="0.14" strokeWidth={2} />
      <circle cx={182} cy={150} r={4} fill={INK} opacity="0.22" />
      <rect x={180} y={132} width={4} height={12} rx={2} fill={INK} opacity="0.14" />
    </Stage>
  );
}

/* ----------------------------------------------------------------- scenes -- */

/** Trailer at an evening event: glowing doors, string lights, warm spill on the turf. */
export function EventNight() {
  return (
    <Stage>
      <rect width={STAGE.w} height={STAGE.h} fill="var(--brand-deep)" />
      {[
        [46, 40],
        [96, 26],
        [330, 36],
        [286, 22],
        [370, 74],
        [22, 78],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.6} fill="#ffffff" opacity="0.5" />
      ))}

      {/* string lights */}
      <path
        d="M0 34 Q120 76 200 52 Q290 26 400 62"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth={1.5}
        fill="none"
      />
      {[
        [58, 55],
        [118, 68],
        [180, 57],
        [244, 41],
        [312, 41],
        [368, 56],
      ].map(([cx, cy]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r={12} fill={SAND} opacity="0.16" />
          <circle cx={cx} cy={cy} r={3} fill={SAND} />
        </g>
      ))}

      {/* light pooling on the ground */}
      <ellipse cx={200} cy={250} rx={168} ry={22} fill={SAND} opacity="0.12" />
      <TurfMat x={252} w={104} />

      <rect x={66} y={116} width={244} height={104} rx={6} fill="#eef3fa" />
      <rect x={60} y={104} width={256} height={14} rx={5} fill="#dde5f0" />

      {[80, 158, 236].map((x) => (
        <g key={x}>
          <rect x={x} y={132} width={60} height={80} rx={4} fill="url(#art-glow)" />
          <rect x={x + 10} y={142} width={40} height={20} rx={3} fill="#fff5df" opacity="0.9" />
        </g>
      ))}

      <rect x={66} y={216} width={244} height={9} rx={3} fill={INK} opacity="0.5" />
      <rect x={78} y={225} width={220} height={6} rx={3} fill="#000000" opacity="0.35" />
      <Wheel cx={140} cy={236} r={16} />
      <Wheel cx={186} cy={236} r={16} />
      <Steps x={250} />
    </Stage>
  );
}

/**
 * Fabrication in the workshop — the "we build them ourselves" claim, drawn.
 *
 * Reads as one cabin caught half-finished: cladding on the left, bare frame on the
 * right, hoist overhead. An abstract dashed box does not say "manufacturing"; a
 * half-clad unit does.
 */
export function Workshop() {
  return (
    <Stage>
      <Ground cx={212} rx={150} opacity={0.12} />

      {/* overhead gantry, spanning the whole bay so it reads as workshop plant
          rather than a street lamp standing on its own */}
      <path d="M120 40 L352 40" stroke={INK} strokeOpacity="0.32" strokeWidth={6} strokeLinecap="round" />
      <path d="M132 40 L132 26 M340 40 L340 26" stroke={INK} strokeOpacity="0.32" strokeWidth={4} strokeLinecap="round" />
      <path d="M276 43 L276 70" stroke={INK} strokeOpacity="0.32" strokeWidth={3} />
      <path d="M268 70 q8 -12 16 0 q-8 10 -16 0 Z" fill={INK} fillOpacity="0.32" />

      {/* bare frame — right half */}
      <g stroke={INK} strokeOpacity="0.4" strokeWidth={5} strokeLinecap="round">
        <path d="M240 88 L240 242" />
        <path d="M312 88 L312 242" />
        <path d="M240 88 L312 88" />
        <path d="M240 242 L312 242" />
        <path d="M240 165 L312 165" strokeWidth={4} />
      </g>
      <path d="M240 88 L312 165" stroke={BRAND} strokeOpacity="0.45" strokeWidth={4} />

      {/* clad half, with the door already hung */}
      <rect x={148} y={88} width={94} height={154} rx={5} fill="url(#art-shell)" />
      <rect x={140} y={76} width={110} height={14} rx={5} fill="url(#art-shell)" />
      <rect x={164} y={104} width={62} height={122} rx={4} fill="url(#art-door)" />
      <rect x={176} y={116} width={38} height={22} rx={3} fill="url(#art-glass)" />
      <rect x={156} y={232} width={78} height={4} rx={2} fill={BRAND} opacity="0.5" />

      {/* welding sparks at the seam */}
      {[
        [246, 178],
        [256, 190],
        [238, 194],
        [252, 204],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} fill={SAND} />
      ))}
      <circle cx={246} cy={186} r={16} fill={SAND} opacity="0.16" />

      {/* toolbox */}
      <rect x={318} y={212} width={58} height={34} rx={5} fill={BRAND} />
      <rect x={334} y={202} width={26} height={12} rx={5} fill={BRAND} opacity="0.7" />
      <rect x={318} y={224} width={58} height={4} fill="#ffffff" opacity="0.4" />
    </Stage>
  );
}

/** Delivery: a truck towing a trailer to site. */
export function Delivery() {
  return (
    <Stage>
      <Ground cx={200} rx={168} opacity={0.13} />

      {/* trailer under tow */}
      <rect x={168} y={128} width={168} height={78} rx={6} fill="url(#art-shell)" />
      <rect x={162} y={118} width={180} height={13} rx={4} fill="url(#art-shell)" />
      {[184, 250].map((x) => (
        <rect key={x} x={x} y={142} width={54} height={52} rx={4} fill="url(#art-door)" />
      ))}
      <rect x={168} y={204} width={168} height={8} rx={3} fill={INK} opacity="0.16" />
      <Wheel cx={230} cy={224} r={19} />
      <Wheel cx={286} cy={224} r={19} />

      {/* tow bar */}
      <path d="M168 208 L136 216" stroke={INK} strokeWidth={6} strokeLinecap="round" opacity="0.7" />

      {/* pickup */}
      <path
        d="M34 168 L84 168 L104 140 L142 140 L142 210 L34 210 Z"
        fill={BRAND}
      />
      <path d="M108 148 L138 148 L138 168 L94 168 Z" fill="url(#art-glass)" />
      <rect x={34} y={186} width={108} height={5} fill="#ffffff" opacity="0.28" />
      <Wheel cx={62} cy={216} r={19} />
      <Wheel cx={120} cy={216} r={19} />

      {/* road */}
      <path
        d="M8 256 L392 256"
        stroke={INK}
        strokeOpacity="0.2"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="26 20"
      />
    </Stage>
  );
}
