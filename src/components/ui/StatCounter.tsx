import {
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}

export function StatCounter({
  to,
  prefix = "",
  suffix = "",
  durationMs = 1400,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: durationMs / 1000,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, durationMs, reduce]);

  const display = reduce ? to : value;

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
