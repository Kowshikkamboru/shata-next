import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="relative z-[2] py-6 px-[clamp(1.5rem,5vw,3.5rem)] flex items-center justify-between flex-wrap gap-4"
      style={{
        borderTop: "1px solid rgba(60,35,10,0.09)",
        background: "var(--color-surface)",
      }}
    >
      <Link href="#" className="flex items-center gap-2 no-underline text-ink font-[var(--font-body)] text-sm font-bold">
        <span className="w-[5px] h-[5px] bg-accent rounded-full" />
        Shata
      </Link>

      <ul className="flex gap-6 list-none">
        {[
          { label: "Privacy", href: "https://www.theshata.com/privacy-policy" },
          { label: "Terms", href: "https://www.theshata.com/terms-and-conditions" },
          { label: "Careers", href: "https://www.theshata.com/careers" },
          { label: "Contact", href: "#contact" },
        ].map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-[var(--font-mono)] text-[10px] tracking-[.8px] uppercase text-ink-dim no-underline hover:text-ink-soft transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* Social Links */}
        <div className="flex gap-3">
          {[
            { label: "Facebook", href: "https://www.facebook.com/share/ju64Pjjz9rok8efU/?mibextid=LQQJ4d" },
            { label: "Twitter", href: "https://x.com/AppShata" },
            { label: "LinkedIn", href: "https://www.linkedin.com/company/shata/" },
            { label: "Instagram", href: "https://www.instagram.com/shata_app/" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-mono)] text-[9px] tracking-[.6px] uppercase text-ink-dim no-underline hover:text-accent transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
        <span className="font-[var(--font-mono)] text-[10px] text-ink-dim">
          © 2025 Shata Events Pvt. Ltd.
        </span>
      </div>
    </footer>
  );
}
