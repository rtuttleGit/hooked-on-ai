import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

interface KineticHeadlineProps {
  words: readonly string[];
  intervalMs?: number;
  className?: string;
}

export function KineticHeadline({
  words,
  intervalMs = 2400,
  className = "",
}: KineticHeadlineProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs, reduce]);

  return (
    <span
      className={`relative inline-flex items-center align-bottom whitespace-nowrap ${className}`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.4em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.4em", filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-reactor-green"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.06em] bg-reactor-green animate-blink" aria-hidden />
    </span>
  );
}
