import { SiteNavigation } from "@/components/site-navigation";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";

const PRIVACY_DESCRIPTION =
  "Falcore privacy policy: what I collect when you book a call or email me, how I use it, and how to ask me to delete it.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY_DESCRIPTION,
  alternates: { canonical: "/privacy" },
  ...buildSocialShareMetadata({
    title: "Privacy Policy | Falcore",
    description: PRIVACY_DESCRIPTION,
    path: "/privacy",
    image: generatedShareCard("default", "Falcore: the technical arm your business is missing"),
  }),
};

export default function PrivacyPage() {
  return (
    <>
      <SiteNavigation />
      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-12">
            Last updated: October 20, 2026
          </p>

          <div className="space-y-8 text-muted-foreground text-base leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Information I Collect
              </h2>
              <p>
                When you book a call through my scheduling tool (Calendly), I
                collect your name, email address, and any information you
                provide in the booking form. I do not collect personal data
                through this website beyond what you voluntarily submit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                How I Use Your Information
              </h2>
              <p>
                I use the information you provide solely to communicate with
                you about my services, respond to your inquiries, and deliver
                the work you hire me for. I do not sell, rent, or share your
                personal information with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Third-Party Services
              </h2>
              <p>
                This website is hosted on Vercel. Scheduling is handled through
                Calendly. These services may collect anonymous usage data in
                accordance with their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Cookies
              </h2>
              <p>
                This website does not use tracking cookies or analytics tools
                that collect personal data. Essential cookies may be used by
                the hosting provider for performance and security purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Data Retention
              </h2>
              <p>
                I keep your contact information for as long as necessary to
                provide my services or as required by law. You can ask me to
                delete your data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Contact
              </h2>
              <p>
                If you have any questions about this privacy policy, email me
                at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  {CONTACT_EMAIL}
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
