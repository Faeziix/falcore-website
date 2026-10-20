import { SiteNavigation } from "@/components/site-navigation";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { buildSocialShareMetadata, generatedShareCard } from "@/lib/social-share-metadata";
import { PolicySection } from "./_components/policy-section";

const PRIVACY_DESCRIPTION =
  "Falcore privacy policy: what this website records when you visit, what I collect when you book a call or email me, and how to opt out or ask me to delete it.";

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
                <span className="text-foreground">Page view counts.</span> I use
                Vercel Web Analytics to count page views and see which pages
                are read, where visitors come from and what kind of device they
                use. It sets no cookies and does not identify you.
              </p>
              <p>
                <span className="text-foreground">
                  Business visitor identification.
                </span>{" "}
                I use Instantly&apos;s website visitor tool (installed as
                Leadsy) to learn which businesses visit this site. It places
                cookies in your browser, uses your IP address to estimate your
                location, and may match your visit to your company and, in some
                cases, to your professional profile. I may use what it finds to
                contact businesses about my services.
              </p>
            </PolicySection>

            <PolicySection heading="Cookies">
              <p>
                The visitor identification tool sets these cookies:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <code className="font-mono text-sm text-foreground">_reb2buid</code>{" "}
                  recognises your browser on later visits (kept for about a
                  year).
                </li>
                <li>
                  <code className="font-mono text-sm text-foreground">_reb2bsessionID</code>{" "}
                  groups the pages you view in one visit (deleted when you close
                  your browser).
                </li>
                <li>
                  <code className="font-mono text-sm text-foreground">_reb2bgeo</code>{" "}
                  stores your estimated location (kept for 20 days).
                </li>
              </ul>
              <p>
                You can block or delete these cookies in your browser settings;
                the site works the same without them. My hosting provider may
                also use essential cookies for performance and security.
              </p>
            </PolicySection>

            <PolicySection heading="How I Use Your Information">
              <p>
                I use this information to reply to you, to understand how the
                website is used, to find businesses that may need my help, and
                to deliver the work you hire me for. I do not sell or rent your
                personal information.
              </p>
            </PolicySection>

            <PolicySection heading="Third-Party Services">
              <p>
                This website is hosted on Vercel, which also provides the page
                view counts. Scheduling is handled by Calendly, and business
                visitor identification by Instantly and its data partners. Each
                handles data under its own privacy policy.
              </p>
            </PolicySection>

            <PolicySection heading="Your Choices">
              <p>
                You can opt out of visitor identification by blocking cookies
                for this site or using a tracker blocker. You can also email me
                at <ContactEmailLink /> to ask what I hold about you, to correct
                it, or to have it deleted.
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
