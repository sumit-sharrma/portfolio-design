"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CRITTERS = [
  `  _[]_
 [o  o]
 |====|
  d  b`,
  ` .-"-.
( o o )
 | ~ |
 '"""'`,
  ` /\\_/\\
( o.o )
 > ^ <`,
  `  .--.
 @(oo)@
  ( - )
   " "`,
  ` /^ ^\\
( o.o )
 (u u)`,
  ` (\\_/)
 (o.o)
c(")(")`,
  ` ,___,
 {O,O}
 /)_)
 -"-"-`,
  ` /\\v/\\
(=o.o=)
 (   )
  w w`,
  `(o)   (o)
 \\  _  /
 ( o.o )`,
];

interface CritterDividerProps {
  className?: string;
  travelDistance?: number;
  duration?: number;
}

export function CritterDivider({
  className,
  travelDistance = 200,
  duration = 12,
}: CritterDividerProps) {
  const [critter, setCritter] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pick must run after mount so server and client markup match
    setMounted(true);
    setCritter(pickRandom(CRITTERS));
  }, []);

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setCritter(pickRandom(CRITTERS));
    }, 100);
  };

  if (!mounted) {
    return <div className={cn("critter", className)} aria-hidden="true" />;
  }

  const style = {
    "--dur": `${duration}s`,
    "--travel": `${travelDistance}px`,
  } as React.CSSProperties;

  const moverStyle = {
    animation: `travel var(--dur, ${duration}s) linear infinite alternate`,
    transform: "translate(0, -50%)",
  } as React.CSSProperties;

  return (
    <div
      className={cn("critter relative h-20 overflow-hidden", className)}
      aria-hidden="true"
      style={style}
    >
      <div
        className="mover absolute left-0 top-1/2 will-change-transform"
        style={moverStyle}
        onAnimationIteration={handleAnimationEnd}
      >
        <pre
          className="critter-art"
          style={{
            fontFamily: "ui-monospace, Menlo, Consolas, monospace",
            whiteSpace: "pre",
            color: "var(--color-primary)",
            fontSize: "13px",
            lineHeight: "1.15",
            opacity: 0.92,
            textAlign: "left",
            margin: 0,
            cursor: "pointer",
            transition: "opacity 0.18s",
            animation: "hop 1.15s ease-in-out infinite",
          } as React.CSSProperties}
        >
          {critter}
        </pre>
      </div>

      <style jsx global>{`
        @keyframes travel {
          from { transform: translate(0, -50%); }
          to { transform: translate(var(--travel, 200px), -50%); }
        }
        @keyframes hop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mover, .critter-art { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}