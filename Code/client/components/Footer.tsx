import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  prefetch?: boolean;
};

type FooterGroup = {
  title: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Invoice Generation", href: "/api/auth/login", prefetch: false },
      { label: "Public Invoice", href: "/api/auth/login", prefetch: false },
      { label: "Cover Letter", href: "/api/auth/login", prefetch: false },
      { label: "E-Resume", href: "/api/auth/login", prefetch: false },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "ATS Guide", href: "/blog/ats-optimized-resume" },
      { label: "Resume Templates", href: "/blog/professional-resume-templates" },
      { label: "Sharing Guide", href: "/blog/share-your-resume" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "https://github.com/Aravin/Resume-Vita", external: true },
      { label: "Contact", href: "https://github.com/Aravin/Resume-Vita", external: true },
      { label: "Support Us", href: "https://github.com/Aravin/Resume-Vita", external: true },
      { label: "Report Issue", href: "https://github.com/Aravin/Resume-Vita", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of use", href: "https://tnc.aravin.net/", external: true },
      { label: "Privacy policy", href: "https://tnc.aravin.net/", external: true },
      { label: "Cookie policy", href: "https://tnc.aravin.net/", external: true },
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Aravin/Resume-Vita",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/resumevita/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com/channels/1444920496499200143/1444920497581326338",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <footer className="mt-16 border-t border-border/70 bg-slate-950 text-slate-100 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1.2fr_2fr] lg:gap-14 lg:px-12">
          <div className="max-w-md space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300/90">
                Resume Vita
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Simple resume tools for fast job applications.
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Build, export, and share polished resumes without extra clutter. Everything stays focused on getting your profile in front of recruiters faster.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-emerald-200">
                Free to use
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Open source
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                ATS focused
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm text-slate-300 transition-colors hover:text-emerald-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        prefetch={link.prefetch}
                        className="block text-sm text-slate-300 transition-colors hover:text-emerald-300"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-slate-950/95">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 text-sm text-slate-300 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
            <p className="leading-6">
              A product by{" "}
              <a
                href="https://www.aravin.net/?ref=resumeVita"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white transition-colors hover:text-emerald-300"
              >
                Aravin
              </a>{" "}
              with 💝
              <br className="hidden sm:block" />
              Free & Open Source © {new Date().getFullYear()}
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
