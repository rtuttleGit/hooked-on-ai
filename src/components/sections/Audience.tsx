import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { audienceIntro, audiences } from "../../data/content";
import { Reveal } from "../motion/Reveal";
import { AccentTitle } from "../ui/AccentTitle";

export function Audience() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const persona = audiences[active];

  return (
    <section
      id="who-its-for"
      className="relative overflow-hidden border-b border-cream/8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(20,56,48,0.55),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="max-w-2xl">
          <AccentTitle
            before={audienceIntro.heading}
            accent={audienceIntro.accentWord}
            after={` ${audienceIntro.headingEnd}`}
          />
          <p className="mt-5 text-[16px] leading-relaxed text-hot-steel">
            {audienceIntro.description}
          </p>
        </Reveal>

        {/* Segmented toggle */}
        <Reveal delay={0.1} className="mt-10">
          <div
            role="tablist"
            aria-label="Choose your path"
            className="inline-flex rounded-full border border-cream/12 bg-coolant-deep/40 p-1 backdrop-blur-sm"
          >
            {audiences.map((a, index) => {
              const isActive = active === index;
              return (
                <motion.button
                  key={a.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(index)}
                  whileTap={reduce ? undefined : { scale: 0.95 }}
                  className="relative flex items-center gap-1.5 rounded-full px-5 py-2.5 font-body text-[13px] font-medium transition-colors md:text-[14px]"
                >
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : "audience-pill"}
                      className="absolute inset-0 rounded-full bg-reactor-green shadow-[0_0_24px_-4px_rgba(45,224,145,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-1.5 ${isActive ? "text-hull-black" : "text-hot-steel hover:text-cream"}`}
                  >
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={reduce ? { opacity: 0 } : { opacity: 0, width: 0 }}
                          animate={reduce ? { opacity: 1 } : { opacity: 1, width: 14 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden text-hull-black"
                          aria-hidden
                        >
                          ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {a.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <Reveal delay={0.15} className="mt-8">
          <div className="card-glow-border relative overflow-hidden rounded-3xl border border-cream/8 bg-gradient-to-br from-coolant-deep/50 to-hull-black p-6 shadow-[0_24px_80px_-40px_rgba(45,224,145,0.4)] md:p-10">
            <div
              className="glow-reactor pointer-events-none absolute -top-24 -right-16 h-72 w-72 opacity-60"
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={persona.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative"
              >
                {/* Decrypt scanline sweep on each selection */}
                {!reduce && (
                  <motion.div
                    initial={{ y: "-110%", opacity: 0.7 }}
                    animate={{ y: "130%", opacity: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-reactor-green/25 via-reactor-green/5 to-transparent"
                    aria-hidden
                  />
                )}

                <div className="relative grid gap-8 md:grid-cols-[1fr_1fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[1.4px] text-reactor-green uppercase">
                        {persona.persona}
                      </span>
                      <ClearanceBadge reduce={!!reduce} />
                    </div>
                    <h3 className="mt-3 font-display text-[24px] font-medium text-cream md:text-[30px]">
                      {persona.headline}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-hot-steel">
                      {persona.summary}
                    </p>
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      className="mt-6 inline-flex rounded-xl border border-reactor-green/24 bg-reactor-green/[0.06] px-4 py-3"
                    >
                      <p className="text-[13px] leading-relaxed text-cream">
                        {persona.outcome}
                      </p>
                    </motion.div>
                  </div>

                  <div className="md:border-l md:border-cream/8 md:pl-8">
                    <p className="mb-4 font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
                      Decrypted intel
                    </p>
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.09, delayChildren: 0.18 },
                        },
                      }}
                      className="space-y-4"
                    >
                      {persona.points.map((point) => (
                        <motion.li
                          key={point}
                          variants={{
                            hidden: {
                              opacity: 0,
                              ...(reduce ? {} : { x: 14 }),
                            },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
                            },
                          }}
                          className="flex gap-3 text-[15px] leading-relaxed text-cream"
                        >
                          <span className="mt-0.5 shrink-0 text-reactor-green">
                            ✓
                          </span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-[14px] text-hot-steel">
            Not sure which one you are?{" "}
            <span className="text-cream">
              You&apos;re exactly who this is for.
            </span>{" "}
            Every recruit graduates operational, shipping the same real mission.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ClearanceBadge({ reduce }: { reduce: boolean }) {
  return (
    <motion.span
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 360, damping: 20 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-reactor-green/30 bg-reactor-green/10 px-2.5 py-1 font-mono text-[9px] tracking-[1.4px] text-reactor-green uppercase"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full bg-reactor-green ${reduce ? "" : "animate-pulse-glow"}`}
        aria-hidden
      />
      Clearance granted
    </motion.span>
  );
}
