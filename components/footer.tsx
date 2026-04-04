import Logo from "./logo";

const footerLinks = {
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <Logo size="md" />
            <p className="text-foreground/50 text-sm mt-3 leading-relaxed">
              The technical arm your business is missing.
            </p>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 text-foreground/70 block">Navigate</span>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/40 hover:text-foreground/80 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold mb-4 text-foreground/70 block">Get in Touch</span>
            <a
              href="mailto:hello@falcoretech.com"
              className="text-sm text-foreground/40 hover:text-foreground/80 transition-colors"
            >
              hello@falcoretech.com
            </a>
            <a
              href="#contact"
              className="text-sm text-primary hover:text-primary/80 transition-colors mt-2 inline-block"
            >
              Book a Call
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-foreground/30">
            &copy; 2026 Falcore. All rights reserved.
          </p>
          <a
            href="/privacy"
            className="text-sm text-foreground/30 hover:text-foreground/50 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
