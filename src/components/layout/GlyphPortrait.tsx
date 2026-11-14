import type { CSSProperties } from "react";
import { PLATE_GRID, PLATE_RAMP } from "@/lib/glyphPlate";

/**
 * Glyph plate (Terminal theme).
 *
 * The photograph reduced to a 64 x 53 brightness grid and set in Martian Mono,
 * one character per cell. The data is static, so the plate is server-rendered:
 * no canvas, no image request, no animation loop. The print-head entrance and
 * the cell flare are CSS transitions the browser owns, which also means hit
 * testing is the browser's job rather than a hand-rolled cursor distance check.
 */
const COLS = PLATE_GRID[0].length;
const ROWS = PLATE_GRID.length;
const CELL_W = 1;
const CELL_H = 1.6;

export function GlyphPortrait() {
  return (
    <div className="plate-frame">
      <svg
        className="plate"
        viewBox={`0 0 ${COLS * CELL_W} ${ROWS * CELL_H}`}
        role="img"
        aria-label="Portrait of Sumit Sharma, printed as a grid of characters sampled from his photograph."
      >
        {PLATE_GRID.map((row, r) => (
          <g
            key={r}
            className="plate-row"
            style={{ "--i": r } as CSSProperties}
          >
            {[...row].map((digit, c) => {
              const level = digit.charCodeAt(0) - 48;
              return (
                <g key={c} className="plate-cell">
                  <rect
                    className="plate-hit"
                    x={c * CELL_W}
                    y={r * CELL_H}
                    width={CELL_W}
                    height={CELL_H}
                  />
                  {level > 0 && (
                    <text
                      className={`plate-glyph l${level}`}
                      x={c * CELL_W + CELL_W / 2}
                      y={r * CELL_H + CELL_H * 0.76}
                    >
                      {PLATE_RAMP[level]}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
