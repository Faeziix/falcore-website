import Nav from "@/components/nav";
import Footer from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Falcore privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            Last updated: April 3, 2026
          </p>

          <div className="space-y-8 text-muted-foreground text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Information We Collect
              </h2>
              <p>
                When you book a call through our scheduling tool (Calendly), we
                collect your name, email address, and any information you
                provide in the booking form. We do not collect personal data
                through our website beyond what you voluntarily submit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                How We Use Your Information
              </h2>
              <p>
                We use the information you provide solely to communicate with
                you about our services, respond to your inquiries, and deliver
                the work you hire us for. We do not sell, rent, or share your
                personal information with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Third-Party Services
              </h2>
              <p>
                Our website is hosted on Vercel. Scheduling is handled through
                Calendly. These services may collect anonymous usage data in
                accordance with their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Cookies
              </h2>
              <p>
                Our website does not use tracking cookies or analytics tools
                that collect personal data. Essential cookies may be used by
                our hosting provider for performance and security purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Data Retention
              </h2>
              <p>
                We retain your contact information for as long as necessary to
                provide our services or as required by law. You can request
                deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Contact
              </h2>
              <p>
                If you have any questions about this privacy policy, contact us
                at{" "}
                <a
                  href="mailto:contact@falcoretech.com"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  contact@falcoretech.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
