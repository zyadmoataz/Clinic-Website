function hashBit(seed: string, r: number, c: number): boolean {
  let h = 2166136261;
  const input = `${seed}:${r}:${c}`;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h & 1) === 1;
}

function isFinderCell(r: number, c: number, size: number): boolean | null {
  const corners = [
    [0, 0],
    [0, size - 7],
    [size - 7, 0]
  ];
  for (const [sr, sc] of corners) {
    const dr = r - sr;
    const dc = c - sc;
    if (dr >= 0 && dr < 7 && dc >= 0 && dc < 7) {
      if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
      if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
      return false;
    }
  }
  return null;
}

export function QrCodeSvg({ value, size = 96 }: { value: string; size?: number }) {
  const grid = 21;
  const cells: { x: number; y: number }[] = [];

  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      const finder = isFinderCell(r, c, grid);
      const active = finder !== null ? finder : hashBit(value, r, c);
      if (active) cells.push({ x: c, y: r });
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${grid} ${grid}`}
      role="img"
      aria-label={`Check-in QR code for ticket ${value}`}
      className="bg-surface border-border text-text rounded-xl border p-1.5"
    >
      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width="0.92"
          height="0.92"
          rx="0.15"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
