import { faqItems } from "../../data/content";
import { Reveal } from "../motion/Reveal";
import { Accordion, AccordionItem } from "../ui/Accordion";

export function FAQ() {
  return (
    <section id="faq" className="border-b border-cream/8">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
            Mission briefing
          </p>
          <h2 className="mt-4 font-display text-[28px] font-medium text-cream md:text-[40px]">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                defaultOpen={index === 0}
              />
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
