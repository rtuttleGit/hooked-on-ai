import { motion, useReducedMotion } from "motion/react";
import { hero, proofStats } from "../../data/content";
import { Button } from "../ui/Button";
import { KineticHeadline } from "../ui/KineticHeadline";
import { StatCounter } from "../ui/StatCounter";
import { TypePill } from "../ui/TypePill";
import { WaitlistForm } from "../ui/WaitlistForm";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-cream/8">
      {/* Animated tech backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-tech-grid mask-radial-fade absolute inset-0" />
        <div className="glow-reactor animate-pulse-glow absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2" />
        <div className="glow-amber absolute top-40 -right-20 h-72 w-72" />
        {!reduce && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-reactor-green/50 to-transparent animate-scan" />
        )}
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TypePill>{hero.eyebrow}</TypePill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-display text-[34px] leading-[1.05] font-medium tracking-[-0.01em] text-cream md:text-[60px]"
          >
            {hero.titleStart}
            <span className="mt-2 block">{hero.titleLead}</span>
            <span className="block whitespace-nowrap">
              <KineticHeadline words={hero.kineticWords} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-2xl text-[17px] leading-relaxed text-hot-steel md:text-[19px]"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-10 max-w-lg"
          >
            <WaitlistForm id="hero-waitlist" compact />
            <p className="mt-4 font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
              {hero.trustLine}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6"
          >
            <a href="#curriculum">
              <Button variant="ghost">{hero.secondaryCta}</Button>
            </a>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="surface-card mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/8 md:grid-cols-4"
        >
          {proofStats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 transition-colors hover:bg-reactor-green/[0.04] md:p-6"
            >
              <dt className="font-display text-[28px] font-medium text-reactor-green md:text-[34px]">
                <StatCounter to={stat.value} suffix={stat.suffix} />
              </dt>
              <dd className="mt-1 text-[13px] text-hot-steel">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
