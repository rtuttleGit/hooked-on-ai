import { transformation } from "../../data/content";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { AccentTitle } from "../ui/AccentTitle";

export function Transformation() {
  return (
    <section className="relative overflow-hidden border-b border-cream/8">
      <div className="bg-tech-grid mask-radial-fade pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <AccentTitle
            before="The"
            accent={transformation.accentWord}
            after=" you'll make"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          {/* Before */}
          <Reveal direction="right">
            <div className="surface-card h-full rounded-2xl border border-cream/8 p-6 md:p-8">
              <span className="font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
                {transformation.before.label}
              </span>
              <ul className="mt-6 space-y-4">
                {transformation.before.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-relaxed text-hot-steel"
                  >
                    <span className="mt-1 shrink-0 font-mono text-hot-steel">×</span>
                    <span className="line-through decoration-hot-steel/40">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Arrow */}
          <Reveal
            direction="none"
            delay={0.15}
            className="flex items-center justify-center md:px-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-reactor-green/40 bg-reactor-green/8 font-mono text-reactor-green md:rotate-0">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </div>
          </Reveal>

          {/* After */}
          <Reveal direction="left">
            <div className="card-glow-border h-full rounded-2xl border border-reactor-green/24 bg-gradient-to-br from-reactor-green/[0.1] to-coolant-deep/20 p-6 shadow-glow-green md:p-8">
              <span className="font-mono text-[11px] tracking-[1.4px] text-reactor-green uppercase">
                {transformation.after.label}
              </span>
              <Stagger as="ul" className="mt-6 space-y-4">
                {transformation.after.items.map((item) => (
                  <StaggerItem
                    key={item}
                    as="li"
                    className="flex gap-3 text-[15px] leading-relaxed text-cream"
                  >
                    <span className="mt-0.5 shrink-0 text-reactor-green">✓</span>
                    <span>{item}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
