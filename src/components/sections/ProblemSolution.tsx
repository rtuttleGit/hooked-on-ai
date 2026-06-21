import { problemSolution } from "../../data/content";
import { Reveal } from "../motion/Reveal";

function BulletList({
  items,
  tone,
}: {
  items: readonly string[];
  tone: "muted" | "accent";
}) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[15px] leading-relaxed text-hot-steel"
        >
          <span
            className={`mt-2 h-1.5 w-1.5 shrink-0 ${tone === "accent" ? "bg-reactor-green" : "bg-hot-steel"}`}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProblemSolution() {
  return (
    <section className="border-b border-cream/8 bg-coolant-deep/30">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <Reveal direction="right">
          <h2 className="font-display text-[24px] font-medium text-cream md:text-[28px]">
            {problemSolution.problem.heading}
          </h2>
          <p className="mt-3 text-[15px] text-hot-steel">
            {problemSolution.problem.intro}
          </p>
          <BulletList items={problemSolution.problem.items} tone="muted" />
        </Reveal>

        <Reveal direction="left">
          <h2 className="font-display text-[24px] font-medium text-cream md:text-[28px]">
            {problemSolution.solution.heading}
          </h2>
          <p className="mt-3 text-[15px] text-hot-steel">
            {problemSolution.solution.intro}
          </p>
          <BulletList items={problemSolution.solution.items} tone="accent" />
        </Reveal>
      </div>
    </section>
  );
}
