import { useEffect, useState } from "react";

export function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 60);
    const t2 = setTimeout(() => setPhase("out"), 1750);
    const t3 = setTimeout(onDone, 2650);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black transition-opacity duration-900 ease-out"
      style={{ opacity: phase === "out" ? 0 : 1 }}
    >
      <h1
        className="text-4xl font-semibold tracking-tight transition-all duration-1000 ease-out sm:text-6xl"
        style={{
          color: "#9D174D",
          opacity: phase === "in" ? 0 : 1,
          transform: phase === "in" ? "translateY(10px) scale(0.98)" : "none",
          textShadow: "0 0 60px rgba(157,23,77,0.55)",
        }}
      >
        raktsetu.
      </h1>
    </div>
  );
}
