import { techStack } from "../../data/content";
import { Marquee } from "../ui/Marquee";

export function TrustMarquee() {
  return (
    <section className="border-b border-cream/8 bg-hull-black py-8">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-6 text-center font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
          Standard-issue field kit
        </p>
        <Marquee items={techStack} />
      </div>
    </section>
  );
}
