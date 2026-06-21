interface AccentTitleProps {
  before: string;
  accent: string;
  after?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function AccentTitle({
  before,
  accent,
  after = "",
  as: Tag = "h2",
  className = "",
}: AccentTitleProps) {
  return (
    <Tag
      className={`font-display text-[28px] leading-[1.1] font-medium tracking-[-0.01em] text-cream md:text-[40px] ${className}`}
    >
      {before} <span className="text-reactor-green">{accent}</span>
      {after}
    </Tag>
  );
}
