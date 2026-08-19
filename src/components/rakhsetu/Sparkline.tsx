export function Sparkline({
  data,
  height = 64,
  stroke = "var(--rose)",
  fill = true,
}: {
  data: number[];
  height?: number;
  stroke?: string;
  fill?: boolean;
}) {
  const w = 100;
  const max = Math.max(...data) * 1.12;
  const min = Math.min(...data) * 0.8;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / (max - min)) * height;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${w},${height} L0,${height} Z`;
  const id = `g-${stroke.replace(/[^a-z]/gi, "")}`;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="h-16 w-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill ? <path d={area} fill={`url(#${id})`} /> : null}
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      <circle cx={pts.at(-1)?.[0] ?? 0} cy={pts.at(-1)?.[1] ?? 0} r="1.8" fill={stroke} />
    </svg>
  );
}
