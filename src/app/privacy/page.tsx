import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Shortlink",
  description:
    "Read the privacy policy for go.melvinjonesrepol.com to learn how your data is collected, used, and protected.",
  alternates: {
    canonical: "https://go.melvinjonesrepol.com/privacy",
  },
};

export default function Privacy() {
  return (
    <main className="p-3 md:p-8">
      <section>
        <h1 className="text-center text-2xl font-semibold">Privacy Policy</h1>
        <div className="mt-4 w-full md:max-w-3xl mx-auto">
          <div className="col-span-full">
            <p>
              This Privacy Policy outlines how go.melvinjonesrepol.com collects,
              uses, and protects your information when you visit or interact
              with this website.
            </p>

            <h3 className="mt-4 font-semibold">1. Information We Collect</h3>
            <p>
              We only collect the links you submit for shortening. No personal
              information, IP addresses, or browser details are collected.
            </p>

            <h3 className="mt-4 font-semibold">
              2. How We Use Your Information
            </h3>
            <p>
              The submitted links are used solely to provide the link shortening
              service. We do not analyze, track, or use your links for any other
              purpose.
            </p>

            <h3 className="mt-4 font-semibold">3. Cookies and Tracking</h3>
            <p>
              This service does not use cookies or any tracking technologies.
            </p>

            <h3 className="mt-4 font-semibold">4. Data Sharing and Security</h3>
            <p>
              We do not sell, share, or disclose your submitted links to third
              parties except as required by law. Reasonable measures are taken
              to safeguard the links you submit.
            </p>

            <h3 className="mt-4 font-semibold">
              5. Link Retention and Deletion
            </h3>
            <p>
              Shortened links may be deleted permanently after a certain period
              of time or upon request. This ensures that your data is not
              retained longer than necessary.
            </p>

            <h3 className="mt-4 font-semibold">6. Changes to This Policy</h3>
            <p>
              This policy may be updated from time to time. Changes will be
              posted on this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
