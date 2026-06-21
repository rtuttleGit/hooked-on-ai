interface TypePillProps {
  children: string;
}

export function TypePill({ children }: TypePillProps) {
  return (
    <span className="inline-block bg-warning-amber px-2.5 py-1 font-mono text-[9px] tracking-[1.4px] text-hull-black uppercase">
      {children}
    </span>
  );
}
