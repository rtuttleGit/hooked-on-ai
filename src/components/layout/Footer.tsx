import { course, site } from "../../data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/8 bg-hull-black">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-[18px] font-medium text-cream">
              {site.name}
            </p>
            <p className="mt-2 max-w-sm text-[15px] text-hot-steel">
              {site.tagline}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-reactor-green" aria-hidden />
              {course.name} · status: recruiting
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[1.4px] text-hot-steel uppercase">
              {site.handle}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#curriculum"
              className="text-[13px] text-hot-steel hover:text-cream"
            >
              Curriculum
            </a>
            <a
              href="#waitlist"
              className="text-[13px] text-hot-steel hover:text-cream"
            >
              Waitlist
            </a>
            <a
              href="#faq"
              className="text-[13px] text-hot-steel hover:text-cream"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-cream/8 pt-8 text-[13px] text-hot-steel md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <a href={`mailto:${site.contactEmail}`} className="hover:text-cream">
            {site.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
