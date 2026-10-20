import { SiteNavigation } from "@/components/site-navigation";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { PolicySection } from "./_components/policy-section";

const PRIVACY_DESCRIPTION =
  "Falcore privacy policy: what I collect when you book a call or email me, how page views are counted, and how to ask me to delete your data.";

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

function ContactEmailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="text-accent hover:text-accent/80 transition-colors"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

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
            <PolicySection heading="Who I Am">
              <p>
                Falcore is my freelance practice, based in Dubai. I am
                responsible for the data described here. You can reach me at{" "}
                <ContactEmailLink />.
              </p>
            </PolicySection>

            <PolicySection heading="Information You Give Me">
              <p>
                When you book a call through my scheduling tool (Calendly), I
                collect your name, email address and anything you add to the
                booking form. When you email me, I receive your email address
                and your message.
              </p>
            </PolicySection>

            <PolicySection heading="What This Website Records When You Visit">
              <p>
                I use Vercel Web Analytics to count page views and see which
                pages are read, where visitors come from and what kind of device
                they use. It sets no cookies and does not identify you.
              </p>
            </PolicySection>

            <PolicySection heading="Cookies">
              <p>
                This website does not set tracking cookies. My hosting provider
                may use essential cookies for performance and security.
              </p>
            </PolicySection>

            <PolicySection heading="How I Use Your Information">
              <p>
                I use your information to reply to you, to understand how the
                website is used, and to deliver the work you hire me for. I do
                not sell, rent, or share your personal information.
              </p>
            </PolicySection>

            <PolicySection heading="Third-Party Services">
              <p>
                This website is hosted on Vercel, which also provides the page
                view counts. Scheduling is handled by Calendly. Each handles
                data under its own privacy policy.
              </p>
            </PolicySection>

            <PolicySection heading="Your Choices">
              <p>
                You can email me at <ContactEmailLink /> to ask what I hold
                about you, to correct it, or to have it deleted.
              </p>
            </PolicySection>

            <PolicySection heading="Data Retention">
              <p>
                I keep your contact information for as long as necessary to
                provide my services or as required by law, and delete it sooner
                if you ask.
              </p>
            </PolicySection>

            <PolicySection heading="Contact">
              <p>
                If you have any questions about this privacy policy, email me
                at <ContactEmailLink />.
              </p>
            </PolicySection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
