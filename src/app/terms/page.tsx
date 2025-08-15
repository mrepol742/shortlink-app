import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Shortlink",
  description: "Terms of Service for go.melvinjonesrepol.com",
  alternates: {
    canonical: "https://go.melvinjonesrepol.com/terms",
  },
};

export default function Terms() {
  return (
    <main className="p-3 md:p-8">
      <section>
        <h1 className="text-center text-2xl font-semibold">Terms of Service</h1>
        <div className="mt-4 w-full md:max-w-3xl mx-auto">
          <div className="col-span-full">
            <p>
              Welcome to go.melvinjonesrepol.com. By accessing or using this
              website, you agree to be bound by these Terms of Service. If you
              do not agree with any part of these terms, you may not use the
              website.
            </p>

            <h3 className="mt-4 font-semibold">1. Use of Service</h3>
            <p>
              You may use this URL shortening service solely for lawful
              purposes. You agree not to use the service for any illegal,
              harmful, or abusive activities, including but not limited to
              spamming, phishing, distributing malware, or violating the rights
              of others.
            </p>

            <h3 className="mt-4 font-semibold">2. User Content</h3>
            <p>
              You are solely responsible for the content you submit, shorten, or
              share using this service. You must ensure that your content does
              not violate any applicable laws or third-party rights.
            </p>

            <h3 className="mt-4 font-semibold">3. No Warranty</h3>
            <p>
              This service is provided &quot;as is&quot; without warranties of any kind,
              either express or implied. The owner does not guarantee the
              availability, reliability, or security of the service.
            </p>

            <h3 className="mt-4 font-semibold">4. Limitation of Liability</h3>
            <p>
              The owner shall not be liable for any damages or losses resulting
              from your use or inability to use the service, including but not
              limited to loss of data, profits, or business opportunities.
            </p>

            <h3 className="mt-4 font-semibold">5. Termination</h3>
            <p>
              The owner reserves the right to suspend or terminate your access
              to the service at any time, without notice, for any reason,
              including violation of these Terms.
            </p>

            <h3 className="mt-4 font-semibold">6. Changes to Terms</h3>
            <p>
              These terms may be updated from time to time without notice.
              Continued use of the website after any such changes constitutes
              your acceptance of the new Terms.
            </p>

            <h3 className="mt-4 font-semibold">7. Contact</h3>
            <p>
              If you have any questions about these Terms, please contact me via
              the contact form.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
