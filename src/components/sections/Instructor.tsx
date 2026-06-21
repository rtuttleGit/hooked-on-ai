import { instructor } from "../../data/content";
import { Reveal } from "../motion/Reveal";

export function Instructor() {
  return (
    <section className="border-b border-cream/8">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
            Meet your handler
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[auto_1fr] md:gap-12">
          <Reveal direction="right" className="flex">
            <div className="relative h-28 w-28 shrink-0 md:h-36 md:w-36">
              <div className="glow-reactor animate-pulse-glow absolute -inset-3 rounded-full" />
              <img
                src="/assets/ryan-tuttle.png"
                alt={instructor.name}
                width={144}
                height={144}
                loading="lazy"
                className="relative h-full w-full rounded-full border border-reactor-green/30 object-cover"
              />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <h2 className="font-display text-[28px] font-medium text-cream md:text-[32px]">
              {instructor.name}
            </h2>
            <p className="mt-1 font-mono text-[11px] tracking-[1.4px] text-reactor-green uppercase">
              {instructor.role}
            </p>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-hot-steel">
              {instructor.bio}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/8 pt-8">
              {instructor.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-[20px] font-medium text-cream md:text-[24px]">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[13px] text-hot-steel">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
