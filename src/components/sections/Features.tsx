import { motion, useReducedMotion } from "motion/react";
import { features } from "../../data/content";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { TypePill } from "../ui/TypePill";

// Bento sizing: feature 0 and 3 span two columns on large screens.
const spanClass = (index: number) =>
  index === 0 || index === 3 ? "lg:col-span-2" : "lg:col-span-1";

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-cream/8">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
            Your field capabilities
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[28px] font-medium text-cream md:text-[40px]">
            Connect the dots from prompts to{" "}
            <span className="text-reactor-green">production</span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <StaggerItem
              key={feature.title}
              as="article"
              className={spanClass(index)}
            >
              <motion.div
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="surface-card group relative h-full overflow-hidden rounded-2xl border border-cream/8 p-6 transition-all duration-300 hover:border-reactor-green/40 hover:shadow-glow-green"
              >
                <div className="glow-reactor pointer-events-none absolute -top-16 -right-16 h-40 w-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <TypePill>{feature.tag}</TypePill>
                    <span className="font-mono text-[11px] text-hot-steel/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[19px] font-medium text-cream">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[14px] leading-relaxed text-hot-steel">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
