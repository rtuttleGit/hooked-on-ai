import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-hull-black text-cream border border-cream/16 hover:bg-[#11201a]",
  secondary:
    "bg-cream text-hull-black hover:bg-[#e8e0cc] hover:shadow-[0_0_24px_-6px_rgba(45,224,145,0.5)]",
  ghost: "bg-transparent text-cream border border-cream/16 hover:bg-cream/4 hover:border-reactor-green/40",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-body text-[13px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-reactor-green disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
