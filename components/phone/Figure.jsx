"use client";

// Concept illustrations, drawn as SVG on the device rather than shipped as images.
// Same reasoning as the audio-visual player: nothing to download, nothing to blur
// on a small screen, and they stay legible at low brightness.
//
// A concept opts in by naming keys in its `extra.figures` array. The first one is
// shown inline on the concept page; the Photos tab of the player shows them all.

const PALETTES = {
  light: {
    ink: "#0E1424",
    soft: "#4A5168",
    faint: "#7C8397",
    brand: "#2246C7",
    brandSoft: "#1668C4",
    tint: "#E9F2FD",
    line: "#DCE3EE",
    mist: "#F4F7FB",
    panel: "#FFFFFF",
    accent: "#F2A413",
    ok: "#1F7A54",
    alert: "#C0392B",
  },
  dark: {
    ink: "#FFFFFF",
    soft: "rgba(255,255,255,0.58)",
    faint: "rgba(255,255,255,0.42)",
    brand: "#17C3D4",
    brandSoft: "#5BD7E4",
    tint: "rgba(23,195,212,0.16)",
    line: "#26314F",
    mist: "#16203A",
    panel: "#0C1424",
    accent: "#F2A413",
    ok: "#4ADE80",
    alert: "#FF7A6E",
  },
};

// Captions travel with the drawing rather than the curriculum data, so a figure
// can be reused across concepts without repeating its description.
export const CAPTIONS = {
  "cartesian-grid": {
    en: "Every element of A paired with every element of B",
    ta: "A இன் ஒவ்வொரு உறுப்பும் B இன் ஒவ்வொன்றுடன்",
  },
  "cartesian-tree": {
    en: "The same pairs drawn as a tree",
    ta: "அதே சோடிகள் மரக் கிளை வடிவில்",
  },
  "function-map": {
    en: "One input, one output — and what breaks it",
    ta: "ஒரு உள்ளீடு, ஒரு வெளியீடு — தவறும் இடம்",
  },
  "function-machine": {
    en: "g runs first, then f takes its answer",
    ta: "முதலில் g, பின் அதன் விடையை f எடுக்கும்",
  },
  "euclid-lemma": {
    en: "273 split into two 119s and a remainder of 35",
    ta: "273 = இரண்டு 119 மற்றும் மீதி 35",
  },
  "euclid-ladder": {
    en: "Each remainder becomes the next divisor",
    ta: "ஒவ்வொரு மீதியும் அடுத்த வகுத்தி ஆகும்",
  },
  "ap-ladder": {
    en: "The same jump every time",
    ta: "ஒவ்வொரு முறையும் ஒரே தாவல்",
  },
  "ap-vs-gp": {
    en: "Adding gives a straight line, multiplying does not",
    ta: "கூட்டல் நேர்கோடு, பெருக்கல் வளைகோடு",
  },
  "gp-doubling": {
    en: "Multiplied each step, so the gap widens",
    ta: "ஒவ்வொரு படியும் பெருக்கம், இடைவெளி பெரிதாகும்",
  },
  "inertia-bus": {
    en: "The bus stops, but nothing stopped you",
    ta: "பேருந்து நின்றது, உங்களை நிறுத்த வலு ஏதுமில்லை",
  },
  "force-mass-accel": {
    en: "Same force, twice the mass, half the acceleration",
    ta: "ஒரே விசை, இரட்டிப்பு நிறை, பாதி முடுக்கம்",
  },
  "action-reaction": {
    en: "Equal and opposite, but on two different bodies",
    ta: "சமமானது, எதிரானது — ஆனால் வேறு இரண்டு பொருள்களில்",
  },
  "refraction-ray": {
    en: "Entering glass, the ray bends towards the normal",
    ta: "கண்ணாடியில் நுழையும்போது கதிர் செங்குத்து நோக்கி வளையும்",
  },
  "refractive-index": {
    en: "How much the medium slows light down",
    ta: "ஊடகம் ஒளியை எவ்வளவு மெதுவாக்குகிறது",
  },
  "total-internal-reflection": {
    en: "Past the critical angle the light stops leaving",
    ta: "மாறும் கோணத்தைத் தாண்டினால் ஒளி வெளியேறாது",
  },
  "vertical-line-test": {
    en: "The same rule drawn: one vertical line, one crossing",
    ta: "அதே விதி வரைபடமாக — ஒரு கோடு, ஒரு வெட்டு",
  },
  "composition-order": {
    en: "Swap the order and the answer changes",
    ta: "வரிசை மாறினால் விடையும் மாறும்",
  },
  "coin-card": {
    en: "Flick the card away and the coin stays put",
    ta: "அட்டையை தட்டினால் நாணயம் அங்கேயே நிற்கும்",
  },
  "force-accel-graph": {
    en: "Force against acceleration is a straight line of slope m",
    ta: "விசை மற்றும் முடுக்கம் — சரிவு m கொண்ட நேர்கோடு",
  },
  "rocket-thrust": {
    en: "Gas pushed down, rocket pushed up",
    ta: "வாயு கீழே, ராக்கெட் மேலே",
  },
  "stick-in-water": {
    en: "Why a stick looks broken at the water line",
    ta: "நீரில் கோல் வளைந்தது போலத் தெரிவதேன்",
  },
  "refractive-index-table": {
    en: "Four media, four speeds, four values of n",
    ta: "நான்கு ஊடகங்கள், நான்கு n மதிப்புகள்",
  },
  "optical-fibre": {
    en: "The signal never escapes, even round a bend",
    ta: "வளைவில்லும் கூட ஒளி வெளியேறுவதில்லை",
  },
};

function Arrow({ id, color }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0 0 10 5 0 10z" fill={color} />
    </marker>
  );
}

/* ------------------------------------------------- 1.1 Cartesian product */

function CartesianGrid({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };
  const cols = ["a", "b", "c"];
  const rows = [4, 3, 2, 1];
  const x0 = 46;
  const y0 = 18;
  const dx = 58;
  const dy = 26;

  return (
    <svg viewBox="0 0 280 150" className="w-full">
      <text x="8" y="14" style={label}>SET B</text>
      <text x="236" y="144" style={label}>SET A</text>

      {rows.map((r, i) => (
        <text key={r} x="30" y={y0 + i * dy + 4} textAnchor="end" style={value}>{r}</text>
      ))}
      {cols.map((col, j) => (
        <text key={col} x={x0 + j * dx} y={132} textAnchor="middle" style={value}>{col}</text>
      ))}

      <line x1="38" y1="8" x2="38" y2="118" stroke={c.line} strokeWidth="1.5" />
      <line x1="38" y1="118" x2="262" y2="118" stroke={c.line} strokeWidth="1.5" />

      {rows.map((r, i) =>
        cols.map((col, j) => {
          const on = col === "b" && r === 3;
          return (
            <circle
              key={`${col}${r}`}
              cx={x0 + j * dx}
              cy={y0 + i * dy}
              r={on ? 6 : 4}
              fill={on ? c.brand : c.tint}
              stroke={on ? c.brand : c.line}
              strokeWidth="1.5"
            />
          );
        })
      )}

      <text x={x0 + dx + 12} y={y0 + dy + 4} style={{ ...value, fill: c.brand }}>(b, 3)</text>
      <text x="140" y="146" textAnchor="middle" style={{ ...label, fill: c.soft }}>
        3 × 4 = 12 ORDERED PAIRS
      </text>
    </svg>
  );
}

function CartesianTree({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };
  const roots = ["a", "b", "c"];

  return (
    <svg viewBox="0 0 280 150" className="w-full">
      <text x="8" y="14" style={label}>A = {"{a, b, c}"} · B = {"{1, 2}"}</text>

      {roots.map((r, i) => {
        const y = 42 + i * 38;
        return (
          <g key={r}>
            <circle cx="34" cy={y} r="12" fill={c.tint} stroke={c.brand} strokeWidth="1.5" />
            <text x="34" y={y + 4} textAnchor="middle" style={value}>{r}</text>

            {[0, 1].map((k) => {
              const ly = y - 11 + k * 22;
              return (
                <g key={k}>
                  <path
                    d={`M48 ${y} C70 ${y} 74 ${ly} 96 ${ly}`}
                    fill="none"
                    stroke={c.line}
                    strokeWidth="1.4"
                  />
                  <text x="118" y={ly + 4} textAnchor="middle" style={{ ...value, fill: c.brandSoft }}>
                    ({r}, {k + 1})
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      <text x="190" y="80" style={{ ...value, fontSize: 12 }}>3 branches</text>
      <text x="190" y="96" style={{ ...value, fontSize: 12 }}>× 2 each</text>
      <text x="190" y="116" style={{ ...value, fontSize: 13, fill: c.brand }}>= 6 pairs</text>
    </svg>
  );
}

/* ------------------------------------------ 1.2 Function, and what is not */

function FunctionMap({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };

  const Panel = ({ x, title, good, links }) => (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="0" width="128" height="118" rx="10" fill={c.mist} stroke={c.line} />
      <ellipse cx="34" cy="62" rx="20" ry="40" fill={c.panel} stroke={c.line} strokeWidth="1.5" />
      <ellipse cx="94" cy="62" rx="20" ry="40" fill={c.panel} stroke={c.line} strokeWidth="1.5" />

      {[1, 2, 3].map((v, i) => (
        <text key={v} x="34" y={38 + i * 24} textAnchor="middle" style={value}>{v}</text>
      ))}
      {[4, 5, 6].map((v, i) => (
        <text key={v} x="94" y={38 + i * 24} textAnchor="middle" style={value}>{v}</text>
      ))}

      {links.map(([from, to], i) => (
        <line
          key={i}
          x1="48"
          y1={34 + from * 24}
          x2="80"
          y2={34 + to * 24}
          stroke={good ? c.brand : c.alert}
          strokeWidth="1.6"
          markerEnd={`url(#${good ? "ar-ok" : "ar-bad"})`}
        />
      ))}

      <text x="64" y="112" textAnchor="middle" style={{ ...label, fill: good ? c.ok : c.alert }}>
        {title}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 280 126" className="w-full">
      <defs>
        <Arrow id="ar-ok" color={c.brand} />
        <Arrow id="ar-bad" color={c.alert} />
      </defs>
      <Panel x={0} good title="A FUNCTION" links={[[0, 0], [1, 1], [2, 1]]} />
      <Panel x={152} good={false} title="NOT A FUNCTION" links={[[0, 0], [0, 1], [2, 2]]} />
    </svg>
  );
}

/* --------------------------------------------- 1.3 Composition, as a line */

function FunctionMachine({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };

  const Box = ({ x, name, rule }) => (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="28" width="62" height="44" rx="10" fill={c.brand} />
      <text x="31" y="48" textAnchor="middle" style={{ fontSize: 12, fontWeight: 800, fill: c.panel }}>
        {name}
      </text>
      <text x="31" y="62" textAnchor="middle" style={{ fontSize: 9, fontWeight: 600, fill: c.panel, opacity: 0.75 }}>
        {rule}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 280 104" className="w-full">
      <defs>
        <Arrow id="ar-flow" color={c.faint} />
      </defs>

      <text x="12" y="55" textAnchor="middle" style={{ ...value, fontSize: 14 }}>1</text>
      <line x1="24" y1="50" x2="46" y2="50" stroke={c.faint} strokeWidth="1.6" markerEnd="url(#ar-flow)" />

      <Box x={52} name="g" rule="x + 3" />

      <line x1="120" y1="50" x2="142" y2="50" stroke={c.faint} strokeWidth="1.6" markerEnd="url(#ar-flow)" />
      <text x="131" y="42" textAnchor="middle" style={{ ...label, fill: c.brandSoft }}>4</text>

      <Box x={148} name="f" rule="2x" />

      <line x1="216" y1="50" x2="240" y2="50" stroke={c.faint} strokeWidth="1.6" markerEnd="url(#ar-flow)" />
      <text x="258" y="55" textAnchor="middle" style={{ ...value, fontSize: 14, fill: c.brand }}>8</text>

      <text x="140" y="94" textAnchor="middle" style={{ ...label, fill: c.soft }}>
        INNER FUNCTION FIRST — READ f ∘ g FROM THE RIGHT
      </text>
    </svg>
  );
}

/* ------------------------------------------------- 2.1 a = bq + r as bars */

function EuclidLemma({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };
  const unit = 0.78;
  const b = 119 * unit;
  const r = 35 * unit;

  return (
    <svg viewBox="0 0 280 118" className="w-full">
      <text x="4" y="14" style={label}>a = 273</text>
      <rect x="4" y="20" width={273 * unit} height="20" rx="4" fill={c.tint} stroke={c.line} />

      <rect x="4" y="54" width={b} height="26" rx="4" fill={c.brand} />
      <rect x={6 + b} y="54" width={b} height="26" rx="4" fill={c.brand} />
      <rect x={8 + 2 * b} y="54" width={r} height="26" rx="4" fill={c.accent} />

      <text x={4 + b / 2} y="71" textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: c.panel }}>119</text>
      <text x={6 + b + b / 2} y="71" textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: c.panel }}>119</text>
      <text x={8 + 2 * b + r / 2} y="71" textAnchor="middle" style={{ fontSize: 10, fontWeight: 800, fill: "#0E1424" }}>35</text>

      <text x="4" y="98" style={{ ...value, fontSize: 12 }}>273 = 119 × 2 + 35</text>
      <text x="4" y="112" style={{ ...label, fill: c.soft }}>
        q = 2 QUOTIENT · r = 35 REMAINDER · r IS SMALLER THAN b
      </text>
    </svg>
  );
}

function EuclidLadder({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const rounds = [
    ["273", "119", "35"],
    ["119", "35", "14"],
    ["35", "14", "7"],
    ["14", "7", "0"],
  ];

  return (
    <svg viewBox="0 0 280 150" className="w-full">
      <text x="6" y="12" style={label}>DIVIDEND · DIVISOR · REMAINDER</text>

      {rounds.map((row, i) => {
        const y = 26 + i * 28;
        const last = i === rounds.length - 1;
        return (
          <g key={i}>
            {row.map((n, j) => (
              <g key={j}>
                <rect
                  x={10 + j * 74}
                  y={y}
                  width="62"
                  height="22"
                  rx="6"
                  fill={j === 2 ? (last ? c.mist : c.tint) : c.mist}
                  stroke={j === 2 && !last ? c.accent : c.line}
                  strokeWidth="1.4"
                />
                <text
                  x={41 + j * 74}
                  y={y + 15}
                  textAnchor="middle"
                  style={{ fontSize: 11, fontWeight: 700, fill: c.ink }}
                >
                  {n}
                </text>
              </g>
            ))}
            {!last ? (
              <path
                d={`M232 ${y + 11} C258 ${y + 11} 258 ${y + 39} 42 ${y + 39}`}
                fill="none"
                stroke={c.line}
                strokeWidth="1.2"
                strokeDasharray="3 4"
              />
            ) : null}
          </g>
        );
      })}

      <text x="10" y="144" style={{ fontSize: 11, fontWeight: 700, fill: c.brand }}>
        Last non-zero remainder = 7 = HCF
      </text>
    </svg>
  );
}

/* --------------------------------------------------- 2.2 AP as equal steps */

function ApLadder({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };
  const terms = [5, 8, 11, 14, 17];
  const x0 = 26;
  const dx = 57;

  return (
    <svg viewBox="0 0 280 110" className="w-full">
      <line x1="10" y1="74" x2="270" y2="74" stroke={c.line} strokeWidth="1.5" />

      {terms.map((v, i) => {
        const x = x0 + i * dx;
        return (
          <g key={v}>
            <circle cx={x} cy="74" r="5" fill={c.brand} />
            <text x={x} y="94" textAnchor="middle" style={value}>{v}</text>
            <text x={x} y="106" textAnchor="middle" style={label}>{`a${i + 1}`}</text>
            {i < terms.length - 1 ? (
              <>
                <path
                  d={`M${x + 5} 68 Q ${x + dx / 2} 40 ${x + dx - 5} 68`}
                  fill="none"
                  stroke={c.brandSoft}
                  strokeWidth="1.6"
                />
                <text x={x + dx / 2} y="44" textAnchor="middle" style={{ ...label, fill: c.brandSoft }}>
                  +3
                </text>
              </>
            ) : null}
          </g>
        );
      })}

      <text x="10" y="18" style={{ ...label, fill: c.soft }}>
        THE SAME JUMP EVERY TIME — FOUR JUMPS REACH THE FIFTH TERM
      </text>
    </svg>
  );
}

function ApVsGp({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const ap = [3, 6, 9, 12, 15];
  const gp = [3, 6, 12, 24, 48];
  const x = (i) => 30 + i * 56;
  const y = (v) => 108 - (v / 48) * 82;

  const path = (list) => list.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(v)}`).join(" ");

  return (
    <svg viewBox="0 0 280 136" className="w-full">
      <line x1="20" y1="110" x2="268" y2="110" stroke={c.line} strokeWidth="1.5" />
      <line x1="20" y1="16" x2="20" y2="110" stroke={c.line} strokeWidth="1.5" />

      <path d={path(ap)} fill="none" stroke={c.soft} strokeWidth="2" strokeDasharray="5 4" />
      <path d={path(gp)} fill="none" stroke={c.brand} strokeWidth="2.4" />

      {ap.map((v, i) => (
        <circle key={`ap${i}`} cx={x(i)} cy={y(v)} r="3.2" fill={c.soft} />
      ))}
      {gp.map((v, i) => (
        <circle key={`gp${i}`} cx={x(i)} cy={y(v)} r="3.8" fill={c.brand} />
      ))}

      {[1, 2, 3, 4, 5].map((n, i) => (
        <text key={n} x={x(i)} y="124" textAnchor="middle" style={label}>{n}</text>
      ))}

      <text x="200" y="34" style={{ ...label, fill: c.brand, fontSize: 10 }}>GP  ×2 each step</text>
      <text x="176" y="96" style={{ ...label, fill: c.soft, fontSize: 10 }}>AP  +3 each step</text>
      <text x="20" y="134" style={{ ...label, fill: c.soft }}>TERM POSITION n</text>
    </svg>
  );
}

/* ----------------------------------------------- 2.3 GP as repeated ×2 bars */

function GpDoubling({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };
  const terms = [3, 6, 12, 24, 48];
  const x0 = 16;
  const dx = 53;
  const w = 34;
  const base = 96;

  return (
    <svg viewBox="0 0 280 124" className="w-full">
      {terms.map((v, i) => {
        const h = (v / 48) * 62;
        const x = x0 + i * dx;
        return (
          <g key={v}>
            <rect
              x={x}
              y={base - h}
              width={w}
              height={h}
              rx="3"
              fill={i === terms.length - 1 ? c.brand : c.brandSoft}
              opacity={0.35 + i * 0.16}
            />
            <text x={x + w / 2} y={base - h - 5} textAnchor="middle" style={value}>{v}</text>
            <text x={x + w / 2} y={110} textAnchor="middle" style={label}>{`a${i + 1}`}</text>
            {i < terms.length - 1 ? (
              <text x={x + w + (dx - w) / 2} y={base - 4} textAnchor="middle" style={{ ...label, fill: c.accent }}>
                ×2
              </text>
            ) : null}
          </g>
        );
      })}
      <line x1="10" y1={base} x2="270" y2={base} stroke={c.line} strokeWidth="1.5" />
      <text x="10" y="16" style={{ ...label, fill: c.soft }}>
        MULTIPLIED, NOT ADDED — THE GAP WIDENS EVERY STEP
      </text>
    </svg>
  );
}

/* ------------------------------------------------ Physics 1 · Laws of Motion */

function InertiaBus({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };

  const Bus = ({ x, lean, brake, title }) => (
    <g transform={`translate(${x} 0)`}>
      <rect x="4" y="34" width="118" height="44" rx="9" fill={c.mist} stroke={c.line} strokeWidth="1.5" />
      <rect x="12" y="40" width="30" height="18" rx="3" fill={c.tint} stroke={c.line} />
      <circle cx="32" cy="82" r="7" fill={c.panel} stroke={c.soft} strokeWidth="1.6" />
      <circle cx="96" cy="82" r="7" fill={c.panel} stroke={c.soft} strokeWidth="1.6" />

      {/* the passenger */}
      <circle cx={78 + lean} cy={46} r="5.5" fill={c.brand} />
      <line x1="78" y1="70" x2={78 + lean} y2="52" stroke={c.brand} strokeWidth="2.6" strokeLinecap="round" />

      {brake ? (
        <>
          <line x1="40" y1="22" x2="12" y2="22" stroke={c.alert} strokeWidth="2" markerEnd="url(#ar-stop)" />
          <text x="52" y="25" style={{ ...label, fill: c.alert }}>BRAKES</text>
        </>
      ) : (
        <>
          <line x1="86" y1="22" x2="114" y2="22" stroke={c.soft} strokeWidth="2" markerEnd="url(#ar-go)" />
          <text x="14" y="25" style={label}>MOVING</text>
        </>
      )}

      <text x="63" y="104" textAnchor="middle" style={{ ...label, fill: c.soft }}>{title}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 280 112" className="w-full">
      <defs>
        <Arrow id="ar-go" color={c.soft} />
        <Arrow id="ar-stop" color={c.alert} />
      </defs>
      <Bus x={0} lean={0} brake={false} title="BOTH MOVING TOGETHER" />
      <Bus x={152} lean={14} brake title="BUS STOPS, YOU DO NOT" />
    </svg>
  );
}

function ForceMassAccel({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };

  const Row = ({ y, mass, size, accel }) => (
    <g>
      <rect x={20} y={y - size / 2} width={size} height={size} rx="5" fill={c.tint} stroke={c.brand} strokeWidth="1.6" />
      <text x={20 + size / 2} y={y + 4} textAnchor="middle" style={value}>{mass}</text>
      <line x1={28 + size} y1={y} x2={150} y2={y} stroke={c.accent} strokeWidth="2.4" markerEnd="url(#ar-force)" />
      <text x={100} y={y - 8} textAnchor="middle" style={{ ...label, fill: c.accent }}>F = 10 N</text>
      <text x={168} y={y + 4} style={{ ...value, fill: c.brand }}>{accel}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 280 120" className="w-full">
      <defs>
        <Arrow id="ar-force" color={c.accent} />
      </defs>
      <Row y={32} mass="5 kg" size={34} accel="a = 2 m/s²" />
      <Row y={78} mass="10 kg" size={46} accel="a = 1 m/s²" />
      <text x="20" y="114" style={{ ...label, fill: c.soft }}>
        SAME FORCE · TWICE THE MASS · HALF THE ACCELERATION
      </text>
    </svg>
  );
}

function ActionReaction({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 10, fontWeight: 700, fill: c.ink };

  return (
    <svg viewBox="0 0 280 120" className="w-full">
      <defs>
        <Arrow id="ar-act" color={c.brand} />
        <Arrow id="ar-react" color={c.alert} />
      </defs>

      <rect x="48" y="44" width="84" height="30" rx="6" fill={c.mist} stroke={c.line} strokeWidth="1.5" />
      <text x="90" y="63" textAnchor="middle" style={value}>GUN</text>

      <rect x="140" y="52" width="24" height="14" rx="4" fill={c.brand} />
      <text x="152" y="44" textAnchor="middle" style={label}>BULLET</text>

      <line x1="170" y1="59" x2="236" y2="59" stroke={c.brand} strokeWidth="2.4" markerEnd="url(#ar-act)" />
      <text x="203" y="50" textAnchor="middle" style={{ ...label, fill: c.brand }}>ACTION</text>

      <line x1="42" y1="59" x2="14" y2="59" stroke={c.alert} strokeWidth="2.4" markerEnd="url(#ar-react)" />
      <text x="28" y="50" textAnchor="middle" style={{ ...label, fill: c.alert }}>REACTION</text>

      <text x="140" y="96" textAnchor="middle" style={{ ...label, fill: c.soft }}>
        EQUAL IN SIZE · OPPOSITE IN DIRECTION
      </text>
      <text x="140" y="110" textAnchor="middle" style={{ ...label, fill: c.soft }}>
        AND ACTING ON TWO DIFFERENT BODIES
      </text>
    </svg>
  );
}

/* ------------------------------------------------------- Physics 2 · Optics */

function RefractionRay({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };

  return (
    <svg viewBox="0 0 280 140" className="w-full">
      <defs>
        <Arrow id="ar-ray" color={c.brand} />
      </defs>

      <rect x="16" y="70" width="248" height="54" fill={c.tint} />
      <line x1="16" y1="70" x2="264" y2="70" stroke={c.line} strokeWidth="1.6" />
      <text x="22" y="20" style={label}>AIR</text>
      <text x="22" y="118" style={label}>GLASS — DENSER, SO LIGHT SLOWS</text>

      {/* the normal */}
      <line x1="150" y1="16" x2="150" y2="128" stroke={c.faint} strokeWidth="1.2" strokeDasharray="4 4" />
      <text x="156" y="24" style={label}>NORMAL</text>

      {/* incident ray */}
      <line x1="66" y1="18" x2="150" y2="70" stroke={c.brand} strokeWidth="2.4" markerEnd="url(#ar-ray)" />
      <text x="124" y="58" style={{ ...label, fill: c.brand }}>i</text>

      {/* where it would have gone */}
      <line x1="150" y1="70" x2="206" y2="105" stroke={c.faint} strokeWidth="1.2" strokeDasharray="4 4" />

      {/* refracted ray, bent towards the normal */}
      <line x1="150" y1="70" x2="182" y2="124" stroke={c.brand} strokeWidth="2.4" markerEnd="url(#ar-ray)" />
      <text x="158" y="92" style={{ ...label, fill: c.brand }}>r</text>

      <text x="196" y="136" style={{ ...label, fill: c.soft }}>r IS SMALLER THAN i</text>
    </svg>
  );
}

function RefractiveIndex({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };

  return (
    <svg viewBox="0 0 280 124" className="w-full">
      <text x="16" y="18" style={label}>SPEED OF LIGHT IN A VACUUM</text>
      <rect x="16" y="24" width="244" height="18" rx="5" fill={c.brand} />
      <text x="138" y="37" textAnchor="middle" style={{ ...value, fill: c.panel }}>c = 3.00 × 10⁸ m/s</text>

      <text x="16" y="62" style={label}>SPEED OF LIGHT IN WATER</text>
      <rect x="16" y="68" width="183" height="18" rx="5" fill={c.brandSoft} opacity="0.7" />
      <text x="107" y="81" textAnchor="middle" style={{ ...value, fill: c.panel }}>v = 2.25 × 10⁸ m/s</text>
      <line x1="199" y1="68" x2="199" y2="86" stroke={c.accent} strokeWidth="2" />

      <text x="16" y="110" style={{ ...value, fontSize: 13, fill: c.brand }}>n = c / v = 1.33</text>
      <text x="140" y="110" style={{ ...label, fill: c.soft }}>THE BIGGER n IS, THE SLOWER THE LIGHT</text>
    </svg>
  );
}

function TotalInternalReflection({ c }) {
  const label = { fontSize: 8.5, fontWeight: 700, fill: c.faint, letterSpacing: 0.3 };

  return (
    <svg viewBox="0 0 280 140" className="w-full">
      <defs>
        <Arrow id="ar-tir" color={c.brand} />
        <Arrow id="ar-tir2" color={c.alert} />
      </defs>

      <rect x="10" y="62" width="260" height="56" fill={c.tint} />
      <line x1="10" y1="62" x2="270" y2="62" stroke={c.line} strokeWidth="1.6" />
      <text x="14" y="18" style={label}>AIR</text>
      <text x="14" y="112" style={label}>GLASS</text>

      {[70, 146, 214].map((x) => (
        <line key={x} x1={x} y1="26" x2={x} y2="114" stroke={c.faint} strokeWidth="1" strokeDasharray="3 4" />
      ))}

      {/* below the critical angle: most light leaves */}
      <line x1="38" y1="108" x2="70" y2="62" stroke={c.brand} strokeWidth="2.2" />
      <line x1="70" y1="62" x2="110" y2="28" stroke={c.brand} strokeWidth="2.2" markerEnd="url(#ar-tir)" />
      <text x="40" y="132" style={label}>i BELOW c</text>

      {/* at the critical angle: it grazes along the boundary */}
      <line x1="102" y1="112" x2="146" y2="62" stroke={c.brand} strokeWidth="2.2" />
      <line x1="146" y1="62" x2="196" y2="62" stroke={c.accent} strokeWidth="2.4" markerEnd="url(#ar-tir)" />
      <text x="116" y="132" style={{ ...label, fill: c.accent }}>i = c</text>

      {/* past it: nothing gets out */}
      <line x1="176" y1="114" x2="214" y2="62" stroke={c.alert} strokeWidth="2.2" />
      <line x1="214" y1="62" x2="258" y2="114" stroke={c.alert} strokeWidth="2.2" markerEnd="url(#ar-tir2)" />
      <text x="194" y="132" style={{ ...label, fill: c.alert }}>i ABOVE c — ALL REFLECTED</text>
    </svg>
  );
}

function VerticalLineTest({ c }) {
  const label = { fontSize: 8.5, fontWeight: 700, fill: c.faint, letterSpacing: 0.3 };

  const Axes = ({ x, title, good, curve, cross }) => (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="6" width="126" height="96" rx="9" fill={c.mist} stroke={c.line} />
      <line x1="18" y1="88" x2="112" y2="88" stroke={c.line} strokeWidth="1.4" />
      <line x1="18" y1="16" x2="18" y2="88" stroke={c.line} strokeWidth="1.4" />
      <path d={curve} fill="none" stroke={c.brand} strokeWidth="2.2" />
      <line x1="76" y1="14" x2="76" y2="92" stroke={good ? c.ok : c.alert} strokeWidth="1.6" strokeDasharray="4 3" />
      {cross.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.6" fill={good ? c.ok : c.alert} />
      ))}
      <text x="63" y="116" textAnchor="middle" style={{ ...label, fill: good ? c.ok : c.alert }}>
        {title}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 280 124" className="w-full">
      <Axes
        x={0}
        good
        title="CROSSES ONCE — A FUNCTION"
        curve="M22 84 Q 63 14 108 84"
        cross={[[76, 44]]}
      />
      <Axes
        x={152}
        good={false}
        title="CROSSES TWICE — NOT ONE"
        curve="M104 20 Q 20 52 104 84"
        cross={[[76, 27], [76, 77]]}
      />
    </svg>
  );
}

function CompositionOrder({ c }) {
  const label = { fontSize: 8.5, fontWeight: 700, fill: c.faint, letterSpacing: 0.3 };
  const value = { fontSize: 11, fontWeight: 700, fill: c.ink };

  const Row = ({ y, first, second, mid, out, title }) => (
    <g>
      <text x="6" y={y + 4} style={{ ...value, fontSize: 12 }}>1</text>
      <line x1="16" y1={y} x2="34" y2={y} stroke={c.faint} strokeWidth="1.5" markerEnd="url(#ar-co)" />
      <rect x="38" y={y - 13} width="44" height="26" rx="7" fill={c.brand} />
      <text x="60" y={y + 4} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: c.panel }}>{first}</text>
      <text x="94" y={y - 6} textAnchor="middle" style={{ ...label, fill: c.brandSoft }}>{mid}</text>
      <line x1="86" y1={y} x2="104" y2={y} stroke={c.faint} strokeWidth="1.5" markerEnd="url(#ar-co)" />
      <rect x="108" y={y - 13} width="44" height="26" rx="7" fill={c.brand} />
      <text x="130" y={y + 4} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: c.panel }}>{second}</text>
      <line x1="156" y1={y} x2="174" y2={y} stroke={c.faint} strokeWidth="1.5" markerEnd="url(#ar-co)" />
      <text x="186" y={y + 5} style={{ ...value, fontSize: 14, fill: c.brand }}>{out}</text>
      <text x="212" y={y + 4} style={label}>{title}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 280 104" className="w-full">
      <defs>
        <Arrow id="ar-co" color={c.faint} />
      </defs>
      <Row y={26} first="g: x+3" second="f: 2x" mid="4" out="8" title="f ∘ g" />
      <Row y={70} first="f: 2x" second="g: x+3" mid="2" out="5" title="g ∘ f" />
      <text x="6" y="98" style={{ ...label, fill: c.alert }}>
        SAME TWO FUNCTIONS · DIFFERENT ORDER · DIFFERENT ANSWER
      </text>
    </svg>
  );
}

function CoinCard({ c }) {
  const label = { fontSize: 8.5, fontWeight: 700, fill: c.faint, letterSpacing: 0.3 };

  const Scene = ({ x, flicked, title }) => (
    <g transform={`translate(${x} 0)`}>
      {/* the glass */}
      <path d="M38 46 L44 100 L84 100 L90 46" fill={c.tint} stroke={c.line} strokeWidth="1.6" />
      {/* the card */}
      <rect x={flicked ? 96 : 32} y="42" width="64" height="5" rx="2" fill={c.soft} opacity={flicked ? 0.45 : 1} />
      {/* the coin */}
      <circle cx="64" cy={flicked ? 78 : 35} r="7" fill={c.accent} stroke={c.ink} strokeWidth="0.8" />
      {flicked ? (
        <line x1="100" y1="30" x2="128" y2="30" stroke={c.alert} strokeWidth="2" markerEnd="url(#ar-flick)" />
      ) : null}
      <text x="64" y="116" textAnchor="middle" style={{ ...label, fill: c.soft }}>{title}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 280 124" className="w-full">
      <defs>
        <Arrow id="ar-flick" color={c.alert} />
      </defs>
      <Scene x={0} flicked={false} title="COIN RESTING ON THE CARD" />
      <Scene x={150} flicked title="CARD GOES, COIN DROPS STRAIGHT IN" />
    </svg>
  );
}

function ForceAccelGraph({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const pts = [1, 2, 3, 4];

  return (
    <svg viewBox="0 0 280 128" className="w-full">
      <line x1="34" y1="100" x2="254" y2="100" stroke={c.line} strokeWidth="1.5" />
      <line x1="34" y1="16" x2="34" y2="100" stroke={c.line} strokeWidth="1.5" />

      <line x1="34" y1="100" x2="214" y2="24" stroke={c.brand} strokeWidth="2.4" />
      {pts.map((n) => (
        <circle key={n} cx={34 + n * 45} cy={100 - n * 19} r="3.8" fill={c.brand} />
      ))}

      {/* the slope triangle */}
      <line x1="124" y1="62" x2="169" y2="62" stroke={c.accent} strokeWidth="1.6" strokeDasharray="4 3" />
      <line x1="169" y1="62" x2="169" y2="43" stroke={c.accent} strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="176" y="56" style={{ ...label, fill: c.accent }}>SLOPE = m</text>

      <text x="8" y="22" style={label}>F (N)</text>
      <text x="228" y="116" style={label}>a (m/s²)</text>
      <text x="34" y="122" style={{ ...label, fill: c.soft }}>
        DOUBLE THE ACCELERATION AND THE FORCE DOUBLES TOO
      </text>
    </svg>
  );
}

function RocketThrust({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };

  return (
    <svg viewBox="0 0 280 132" className="w-full">
      <defs>
        <Arrow id="ar-up" color={c.brand} />
        <Arrow id="ar-down" color={c.alert} />
      </defs>

      {/* the rocket */}
      <path d="M140 14 C152 30 156 50 156 72 L124 72 C124 50 128 30 140 14 Z" fill={c.tint} stroke={c.brand} strokeWidth="1.8" />
      <path d="M124 60 L112 82 L124 74 Z" fill={c.brand} />
      <path d="M156 60 L168 82 L156 74 Z" fill={c.brand} />
      <circle cx="140" cy="40" r="5" fill={c.panel} stroke={c.brand} strokeWidth="1.4" />

      {/* exhaust */}
      <path d="M128 74 L140 112 L152 74 Z" fill={c.accent} opacity="0.5" />

      <line x1="92" y1="62" x2="92" y2="22" stroke={c.brand} strokeWidth="2.6" markerEnd="url(#ar-up)" />
      <text x="52" y="46" style={{ ...label, fill: c.brand }}>ROCKET UP</text>

      <line x1="196" y1="70" x2="196" y2="112" stroke={c.alert} strokeWidth="2.6" markerEnd="url(#ar-down)" />
      <text x="206" y="96" style={{ ...label, fill: c.alert }}>GAS DOWN</text>

      <text x="140" y="128" textAnchor="middle" style={{ ...label, fill: c.soft }}>
        NOTHING IS PUSHED AGAINST — THE PAIR IS ROCKET AND GAS
      </text>
    </svg>
  );
}

function StickInWater({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };

  return (
    <svg viewBox="0 0 280 132" className="w-full">
      <rect x="70" y="46" width="140" height="72" rx="4" fill={c.tint} stroke={c.line} strokeWidth="1.6" />
      <line x1="70" y1="46" x2="210" y2="46" stroke={c.brandSoft} strokeWidth="1.8" />
      <text x="216" y="44" style={label}>WATER LINE</text>

      {/* the stick above the surface */}
      <line x1="108" y1="14" x2="134" y2="46" stroke={c.ink} strokeWidth="4" strokeLinecap="round" />

      {/* where it really is */}
      <line x1="134" y1="46" x2="168" y2="108" stroke={c.ink} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
      <text x="172" y="104" style={{ ...label, fill: c.soft }}>REAL</text>

      {/* where the eye thinks it is */}
      <line x1="134" y1="46" x2="186" y2="96" stroke={c.alert} strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" />
      <text x="190" y="84" style={{ ...label, fill: c.alert }}>SEEN</text>

      <text x="70" y="128" style={{ ...label, fill: c.soft }}>
        LIGHT BENDS LEAVING THE WATER, SO THE STICK LOOKS RAISED
      </text>
    </svg>
  );
}

function RefractiveIndexTable({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };
  const value = { fontSize: 10.5, fontWeight: 700, fill: c.ink };
  const rows = [
    ["Air", 1.0],
    ["Water", 1.33],
    ["Glass", 1.5],
    ["Diamond", 2.42],
  ];

  return (
    <svg viewBox="0 0 280 132" className="w-full">
      {rows.map(([name, n], i) => {
        const y = 18 + i * 28;
        const w = (n / 2.42) * 150;
        return (
          <g key={name}>
            <text x="6" y={y + 12} style={value}>{name}</text>
            <rect x="66" y={y} width={w} height="17" rx="4" fill={c.brand} opacity={0.35 + i * 0.2} />
            <text x={72 + w} y={y + 13} style={{ ...value, fill: c.brand }}>{n.toFixed(2)}</text>
          </g>
        );
      })}
      <text x="6" y="128" style={{ ...label, fill: c.soft }}>
        A LARGER n MEANS SLOWER LIGHT AND A SHARPER BEND
      </text>
    </svg>
  );
}

function OpticalFibre({ c }) {
  const label = { fontSize: 9, fontWeight: 700, fill: c.faint, letterSpacing: 0.4 };

  return (
    <svg viewBox="0 0 280 120" className="w-full">
      <defs>
        <Arrow id="ar-fib" color={c.brand} />
      </defs>

      <path d="M14 36 L150 36 C210 36 232 52 232 72" fill="none" stroke={c.line} strokeWidth="1.8" />
      <path d="M14 74 L150 74 C186 74 194 74 194 72" fill="none" stroke={c.line} strokeWidth="1.8" />
      <path d="M14 36 L150 36 C210 36 232 52 232 72 L194 72 C194 74 186 74 150 74 L14 74 Z" fill={c.tint} />

      <polyline
        points="18,68 58,40 98,70 138,40 176,66 206,48 216,70"
        fill="none"
        stroke={c.brand}
        strokeWidth="2.2"
        markerEnd="url(#ar-fib)"
      />
      {[[58, 40], [98, 70], [138, 40], [176, 66]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={c.accent} />
      ))}

      <text x="14" y="26" style={label}>CORE — DENSER GLASS</text>
      <text x="14" y="100" style={{ ...label, fill: c.soft }}>
        EVERY BOUNCE IS PAST THE CRITICAL ANGLE, SO NO LIGHT LEAKS OUT
      </text>
      <text x="14" y="114" style={{ ...label, fill: c.accent }}>
        AMBER DOTS MARK TOTAL INTERNAL REFLECTION
      </text>
    </svg>
  );
}

const FIGURES = {
  "cartesian-grid": CartesianGrid,
  "cartesian-tree": CartesianTree,
  "function-map": FunctionMap,
  "function-machine": FunctionMachine,
  "euclid-lemma": EuclidLemma,
  "euclid-ladder": EuclidLadder,
  "ap-ladder": ApLadder,
  "ap-vs-gp": ApVsGp,
  "gp-doubling": GpDoubling,
  "inertia-bus": InertiaBus,
  "force-mass-accel": ForceMassAccel,
  "action-reaction": ActionReaction,
  "refraction-ray": RefractionRay,
  "refractive-index": RefractiveIndex,
  "total-internal-reflection": TotalInternalReflection,
  "vertical-line-test": VerticalLineTest,
  "composition-order": CompositionOrder,
  "coin-card": CoinCard,
  "force-accel-graph": ForceAccelGraph,
  "rocket-thrust": RocketThrust,
  "stick-in-water": StickInWater,
  "refractive-index-table": RefractiveIndexTable,
  "optical-fibre": OpticalFibre,
};

export function figureCaption(name, lang) {
  return CAPTIONS[name]?.[lang] ?? CAPTIONS[name]?.en ?? "";
}

export function hasFigure(name) {
  return Boolean(name && FIGURES[name]);
}

export default function Figure({ name, tone = "light", bare = false }) {
  const Drawing = name ? FIGURES[name] : null;
  if (!Drawing) return null;

  const c = PALETTES[tone] ?? PALETTES.light;
  if (bare) return <Drawing c={c} />;

  return (
    <div
      className={`mt-3 overflow-hidden rounded-xl border p-3 ${
        tone === "dark" ? "border-nightLine bg-nightSoft" : "border-line bg-white"
      }`}
    >
      <Drawing c={c} />
    </div>
  );
}
