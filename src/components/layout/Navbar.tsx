import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { navLinks } from "../../data/content";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-cream/8 bg-hull-black/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-body text-[13px] text-hot-steel transition-colors hover:text-cream"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-reactor-green transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a href="#waitlist" className="shrink-0">
          <Button variant="secondary">Join waitlist</Button>
        </a>
      </div>
    </motion.header>
  );
}
