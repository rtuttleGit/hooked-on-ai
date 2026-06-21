import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { course, curriculumIntro, curriculumWeeks } from "../../data/content";
import { Reveal } from "../motion/Reveal";
import { AccentTitle } from "../ui/AccentTitle";

export function Curriculum() {
  const [activeWeek, setActiveWeek] = useState(0);
  const reduce = useReducedMotion();
  const active = curriculumWeeks[activeWeek];

  return (
    <section
      id="curriculum"
      className="border-b border-cream/8 bg-coolant-deep/20"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] tracking-[1.4px] text-reactor-green uppercase">
            {course.name} · {curriculumWeeks.length} modules
          </p>
          <AccentTitle
            before={curriculumIntro.heading}
            accent={curriculumIntro.accentWord}
            after={` ${curriculumIntro.headingEnd}`}
          />
          <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-hot-steel">
            {curriculumIntro.description}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="flex flex-col gap-2 lg:sticky lg:top-24 lg:self-start">
            {curriculumWeeks.map((week, index) => {
              const isActive = activeWeek === index;
              return (
                <button
                  key={week.week}
                  type="button"
                  onClick={() => setActiveWeek(index)}
                  className={`relative overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors ${
                    isActive
                      ? "border-reactor-green/40 bg-reactor-green/8"
                      : "border-cream/8 bg-transparent hover:border-cream/16 hover:bg-cream/4"
                  }`}
                >
                  {isActive && !reduce && (
                    <motion.span
                      layoutId="week-indicator"
                      className="absolute top-0 left-0 h-full w-0.5 bg-reactor-green"
                    />
                  )}
                  <span className="font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
                    Module {String(week.week).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-display text-[15px] font-medium text-cream">
                    {week.codename}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-hot-steel">
                    {week.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="card-glow-border surface-card relative min-h-[260px] overflow-hidden rounded-2xl border border-cream/8 p-6 shadow-glow-green md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.week}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span className="font-mono text-[11px] tracking-[1.4px] text-reactor-green uppercase">
                  Module {String(active.week).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[24px] font-medium text-cream md:text-[30px]">
                  {active.codename}
                </h3>
                <p className="mt-1 font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
                  {active.title}
                </p>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-hot-steel">
                  {active.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
                  <span>{active.lessons} lessons</span>
                  <span aria-hidden>·</span>
                  <span>{active.duration}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
