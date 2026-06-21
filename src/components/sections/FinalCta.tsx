import { useReducedMotion } from "motion/react";
import { finalCta } from "../../data/content";
import { Reveal } from "../motion/Reveal";
import { TypePill } from "../ui/TypePill";
import { WaitlistForm } from "../ui/WaitlistForm";

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-cream/8">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-tech-grid mask-radial-fade absolute inset-0" />
        <div className="glow-reactor animate-pulse-glow absolute bottom-0 left-1/2 h-[460px] w-[640px] -translate-x-1/2 translate-y-1/3" />
        {!reduce && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-reactor-green/40 to-transparent animate-scan" />
        )}
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
        <Reveal direction="none">
          <TypePill>{finalCta.eyebrow}</TypePill>
          <h2 className="mt-6 font-display text-[34px] leading-[1.08] font-medium tracking-[-0.01em] text-cream md:text-[52px]">
            Accept your{" "}
            <span className="text-reactor-green">{finalCta.accentWord}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-hot-steel md:text-[18px]">
            {finalCta.subtitle}
          </p>
        </Reveal>

        <Reveal direction="none" delay={0.1} className="mx-auto mt-10 max-w-xl">
          <WaitlistForm id="final-waitlist" />
        </Reveal>
      </div>
    </section>
  );
}
