"use client";

const items = [
  "Photography",
  "Events",
  "Catering",
  "Venues",
  "Entertainment",
  "Planning",
  "Invite Design",
  "Mehendi",
  "Makeup",
  "Decoration",
];

export function Strip() {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative z-[2] overflow-hidden py-3.5"
      style={{
        borderTop: "1px solid rgba(60,35,10,0.09)",
        borderBottom: "1px solid rgba(60,35,10,0.09)",
        background: "var(--color-surface)",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[100px] z-[1]"
        style={{ background: "linear-gradient(to right, var(--color-surface), transparent)" }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-[100px] z-[1]"
        style={{ background: "linear-gradient(to left, var(--color-surface), transparent)" }}
      />

      <div
        className="flex gap-12 w-max"
        style={{ animation: "scrollLeft 28s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 font-[var(--font-mono)] text-[10px] tracking-[1.8px] uppercase text-ink-soft whitespace-nowrap"
          >
            <span className="w-[3px] h-[3px] bg-accent rounded-full" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
