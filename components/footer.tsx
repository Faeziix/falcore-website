const footerLinks = {
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="text-xl font-bold tracking-tighter text-foreground">FALCORE</span>
            <p className="text-foreground/50 text-sm mt-3 leading-relaxed">
              Web design for local businesses.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground/70">Navigate</h4>
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
            <h4 className="text-sm font-semibold mb-4 text-foreground/70">Connect</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
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
            <h4 className="text-sm font-semibold mb-4 text-foreground/70">Get in Touch</h4>
            <p className="text-sm text-foreground/40">hello@falcorewebdesign.com</p>
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
          <p className="text-sm text-foreground/30">Built with care.</p>
        </div>
      </div>
    </footer>
  );
}
