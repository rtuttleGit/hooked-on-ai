interface MarqueeProps {
  items: readonly string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="flex w-max animate-marquee gap-12">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-[13px] tracking-[1.4px] whitespace-nowrap text-hot-steel uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
