const GRAD_FROM = [0x34, 0x52, 0xd6];
const GRAD_TO = [0x17, 0xc3, 0xd4];

function mix(t) {
  const c = GRAD_FROM.map((from, i) => Math.round(from + (GRAD_TO[i] - from) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

// The kolam ring, drawn as its own mark. Twelve dots run the gradient from deep
// blue round to cyan, with a solid centre. The ring turns, the centre stays put.
function Mark({ px, tone, spin }) {
  const dots = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 24 + Math.cos(a) * 16,
      y: 24 + Math.sin(a) * 16,
      r: i % 3 === 0 ? 3.6 : 2.8,
    };
  });

  const mono = tone === "mono";

  return (
    <svg width={px} height={px} viewBox="0 0 48 48" aria-hidden className="shrink-0">
      <g className={spin ? "logo-spin" : undefined}>
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={mono ? "#ffffff" : mix(i / 11)}
            opacity={mono ? 0.9 : 1}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="6.5" fill={mono ? "#ffffff" : "#2246C7"} />
    </svg>
  );
}

export default function Logo({ size = 38, tone = "color", stacked = false, spin = true }) {
  const fontSize = Math.round(size * 0.52);

  const wordClass =
    tone === "mono"
      ? "text-white"
      : tone === "grad"
      ? "grad-brand bg-clip-text text-transparent"
      : "text-ink";

  const aiClass =
    tone === "mono" ? "text-white" : tone === "grad" ? "text-transparent" : "text-cyan";

  const word = (
    <span
      className={`whitespace-nowrap font-display font-extrabold leading-none tracking-tight ${wordClass}`}
      style={{ fontSize }}
    >
      Kalvi Thun<span className={aiClass}>AI</span>
    </span>
  );

  if (stacked) {
    return (
      <span className="inline-flex flex-col items-center gap-4 text-center">
        <Mark px={size} tone={tone} spin={spin} />
        {word}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark px={size} tone={tone} spin={spin} />
      {word}
    </span>
  );
}
