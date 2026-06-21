interface LogoProps {
  variant?: "lockup" | "mark";
  className?: string;
}

export function Logo({ variant = "lockup", className = "" }: LogoProps) {
  if (variant === "mark") {
    return (
      <img
        src="/assets/hook-mark.svg"
        alt="Hooked on AI"
        className={`h-8 w-8 ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/assets/hook-mark.svg"
        alt=""
        aria-hidden="true"
        className="h-9 w-9 shrink-0"
      />
      <span className="flex items-center gap-1.5 font-display text-[15px] leading-none font-medium tracking-[0.14em] text-cream uppercase">
        <span>Hooked&nbsp;on</span>
        <span className="bg-reactor-green px-1.5 py-1 leading-none tracking-normal text-hull-black">
          AI
        </span>
      </span>
    </span>
  );
}
