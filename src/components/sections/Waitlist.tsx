import { howItWorks } from "../../data/content";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { WaitlistForm } from "../ui/WaitlistForm";

export function Waitlist() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-b border-cream/8 bg-coolant-deep/30"
    >
      <div
        className="bg-tech-grid mask-radial-fade pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
            Clearance pending
          </p>
          <h2 className="mt-4 font-display text-[32px] font-medium text-cream md:text-[40px]">
            Request your <span className="text-reactor-green">clearance</span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-hot-steel">
            The course is in development. Join the waitlist to get notified at
            launch, plus curriculum previews and early-bird pricing.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-xl">
          <WaitlistForm id="waitlist-main" />
        </Reveal>

        <Stagger
          as="ul"
          className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-3"
        >
          {[
            "Curriculum previews before launch",
            "Early-bird pricing for waitlist members",
            "No spam — mission updates only",
          ].map((item) => (
            <StaggerItem
              key={item}
              as="li"
              className="flex gap-2 text-[13px] text-hot-steel"
            >
              <span className="text-reactor-green" aria-hidden>
                ✓
              </span>
              {item}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="border-b border-cream/8">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
            The operation
          </p>
          <h2 className="mt-4 font-display text-[28px] font-medium text-cream md:text-[40px]">
            Your <span className="text-reactor-green">mission</span>
          </h2>
          <p className="mt-3 text-[15px] text-hot-steel">
            Three steps from recruit to operational, at your own pace.
          </p>
        </Reveal>

        <Stagger as="ol" className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map((item) => (
            <StaggerItem
              key={item.step}
              as="li"
              className="surface-card relative rounded-2xl border border-cream/8 p-6 transition-colors hover:border-reactor-green/30"
            >
              <span className="font-display text-[40px] font-medium text-reactor-green/20">
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-[18px] font-medium text-cream">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-hot-steel">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
