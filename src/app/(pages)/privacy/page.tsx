import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - QRupones',
  description: 'Privacy Policy for QRupones by Toptech S.R.L. Learn about how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicy() {
  return (
    <main className='min-h-screen bg-white text-gray-700' style={{ fontSize: '16px' }}>
      {/* Header */}
      <header className='border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-10'>
        <div className='max-w-[1024px] mx-auto px-6 py-4 flex items-center justify-between'>
          <Link href='/' className='font-bold text-[#002239] hover:opacity-70 transition-opacity' style={{ fontSize: '24px' }}>
            QRupones
          </Link>
          <Link href='/' className='font-medium text-[#a780b7] hover:underline transition-colors' style={{ fontSize: '18px' }}>
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className='max-w-[1024px] mx-auto px-6 py-16'>
        {/* Title */}
        <header className='mb-12'>
          <h1 className='font-bold text-[#002239] mb-4' style={{ fontSize: '48px', textAlign: 'left' }}>Privacy Policy</h1>
          <p className='text-gray-500' style={{ fontSize: '18px', textAlign: 'left' }}>
            QRupones · Toptech S.R.L. | Last updated: December 23, 2025
          </p>
        </header>

        {/* Intro */}
        <p className='leading-relaxed mb-16' style={{ fontSize: '18px' }}>
          At QRupones (&ldquo;QRupones&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a product of Toptech S.R.L., we respect your privacy
          and are committed to protecting the personal data we collect through our websites, applications, and services. This Privacy
          Policy explains what data we collect, why we collect it, how we use it, and your rights.
        </p>

        {/* Sections */}
        <div className='space-y-12' style={{ fontSize: '18px', lineHeight: '1.7' }}>

          {/* Section 1 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>1. Data Controller</h2>
            <div className='space-y-2'>
              <p><span className='font-semibold text-[#002239]'>Product/Service:</span> QRupones (by Toptech S.R.L.)</p>
              <p><span className='font-semibold text-[#002239]'>Company:</span> Toptech S.R.L.</p>
              <p><span className='font-semibold text-[#002239]'>Website:</span> toptech.com.bo (and any QRupones landing pages hosted by Toptech)</p>
              <p><span className='font-semibold text-[#002239]'>Contact email:</span> <a href='mailto:support@toptech.com.bo' className='text-[#a780b7] hover:underline'>support@toptech.com.bo</a></p>
              <p><span className='font-semibold text-[#002239]'>Address:</span> Canal Cotoca 3er anillo interno #3630, Santa Cruz, Bolivia</p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>2. Scope</h2>
            <p className='mb-4'>This Policy applies to:</p>
            <ul className='list-disc ml-6 space-y-2'>
              <li>Visits to QRupones pages, landing pages, and related pages.</li>
              <li>Contact forms, demo requests, and quote requests related to QRupones.</li>
              <li>QRupones systems, QR coupon/QR payment flows, dashboards, and related modules (web/mobile) when you interact with our support channels or cloud services (if applicable).</li>
              <li>Communications via WhatsApp, email, or other official channels related to QRupones.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>3. Information We May Collect</h2>
            <p className='mb-6'>We may collect the following types of information:</p>

            <h3 className='font-semibold text-[#002239] mb-3' style={{ fontSize: '22px', textAlign: 'left' }}>a) Information you provide</h3>
            <ul className='list-disc ml-6 space-y-2 mb-6'>
              <li>Full name</li>
              <li>Phone/WhatsApp number</li>
              <li>Email address</li>
              <li>Company name, tax ID (if applicable), city, industry</li>
              <li>Messages and requests you send us (support, sales, demos)</li>
              <li>Information required to configure QRupones (e.g., business identifiers, branch info), if applicable</li>
            </ul>

            <h3 className='font-semibold text-[#002239] mb-3' style={{ fontSize: '22px', textAlign: 'left' }}>b) Information collected automatically</h3>
            <ul className='list-disc ml-6 space-y-2 mb-6'>
              <li>IP address, browser type, device information</li>
              <li>Pages visited and usage events (cookies/analytics)</li>
              <li>Date/time and basic site performance data</li>
              <li>Technical logs related to QR generation, delivery, and validation (when applicable)</li>
            </ul>

            <h3 className='font-semibold text-[#002239] mb-3' style={{ fontSize: '22px', textAlign: 'left' }}>c) Information from third parties</h3>
            <p>If you contact or use QRupones through platforms such as Meta/Facebook, WhatsApp, or others, we may receive basic profile/channel information (e.g., identifiers, name, number, message content), as permitted by the platform and what you choose to share.</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>4. How We Use Your Information</h2>
            <p className='mb-4'>We use your information to:</p>
            <ul className='list-disc ml-6 space-y-2 mb-6'>
              <li>Respond to inquiries, demo requests, and quote requests for QRupones.</li>
              <li>Provide technical support and customer service.</li>
              <li>Operate QRupones features (e.g., generating, sending, validating QR coupons or transaction references).</li>
              <li>Manage our commercial and administrative relationship.</li>
              <li>Improve our services, security, and user experience.</li>
              <li>Send service-related communications (e.g., technical notices, configuration messages).</li>
            </ul>
            <p className='italic text-gray-500'>If we send marketing communications, you can opt out at any time.</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>5. Legal Basis for Processing</h2>
            <p className='mb-4'>We process personal data when:</p>
            <ul className='list-disc ml-6 space-y-2'>
              <li>You give consent (e.g., by submitting a form or contacting us).</li>
              <li>It is necessary to provide the service or respond to your request.</li>
              <li>We have a legitimate interest (security, fraud prevention, service improvement).</li>
              <li>We must comply with legal obligations.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>6. Cookies and Similar Technologies</h2>
            <p className='mb-4'>We may use cookies to:</p>
            <ul className='list-disc ml-6 space-y-2 mb-6'>
              <li>Enable core website functionality</li>
              <li>Measure and analyze traffic (usage statistics)</li>
              <li>Improve security</li>
            </ul>
            <p>You can control cookies through your browser settings. Disabling cookies may affect certain site features.</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>7. Sharing of Information</h2>
            <p className='mb-4'><span className='font-semibold text-[#002239]'>We do not sell your personal data.</span></p>
            <p className='mb-4'>We may share data only when necessary with:</p>
            <ul className='list-disc ml-6 space-y-2 mb-6'>
              <li>Service providers for hosting, email, analytics, support, communications, and messaging platforms (including WhatsApp Business providers).</li>
              <li>Payment or invoicing providers, if applicable (only to the extent needed).</li>
              <li>Authorities when required by law.</li>
            </ul>
            <p>These providers may only process data on our behalf, for the purposes described, and under reasonable security measures.</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>8. International Data Transfers</h2>
            <p>Some technology providers may be located outside Bolivia. Where applicable, we take reasonable steps to safeguard data (contracts, standard clauses, and security controls), depending on the provider&apos;s available safeguards.</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>9. Data Security</h2>
            <p>We apply technical and organizational measures to protect your data (access controls, best practices, monitoring). However, no system is 100% secure. If we identify a relevant security incident, we will take steps to mitigate it.</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>10. Data Retention</h2>
            <p className='mb-4'>We retain personal data:</p>
            <ul className='list-disc ml-6 space-y-2 mb-6'>
              <li>For as long as needed to fulfill the purposes described in this Policy.</li>
              <li>As required to meet legal, contractual, audit, or compliance obligations.</li>
            </ul>
            <p>Support messages and logs may be retained to maintain service history, prevent fraud, and improve support quality.</p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>11. Your Rights</h2>
            <p className='mb-4'>Depending on applicable laws, you may request:</p>
            <ul className='list-disc ml-6 space-y-2 mb-6'>
              <li>Access to your personal data</li>
              <li>Correction/updates</li>
              <li>Deletion (where applicable)</li>
              <li>Objection or restriction of processing</li>
              <li>Withdrawal of consent (where applicable)</li>
            </ul>
            <p className='mb-2'>To exercise your rights, contact: <a href='mailto:support@toptech.com.bo' className='text-[#a780b7] hover:underline'>support@toptech.com.bo</a></p>
            <p>We may request minimal information to verify your identity.</p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>12. Children&apos;s Privacy</h2>
            <p>QRupones is not intended for children without a parent/guardian&apos;s authorization. If you believe a child provided us personal data, contact us so we can delete it.</p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>13. Third-Party Links</h2>
            <p>Our pages may contain links to third-party websites. We are not responsible for their privacy practices. We recommend reviewing their privacy policies.</p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>14. Changes to This Policy</h2>
            <p>We may update this Policy from time to time. We will post the current version on this page and update the &ldquo;Last updated&rdquo; date.</p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className='font-bold text-[#002239] mb-6' style={{ fontSize: '28px', textAlign: 'left' }}>15. Contact Us</h2>
            <p className='mb-4'>If you have questions about this Policy or our data practices:</p>
            <div className='space-y-2'>
              <p><span className='font-semibold text-[#002239]'>Email:</span> <a href='mailto:support@toptech.com.bo' className='text-[#a780b7] hover:underline'>support@toptech.com.bo</a></p>
              <p><span className='font-semibold text-[#002239]'>Company:</span> Toptech S.R.L.</p>
              <p><span className='font-semibold text-[#002239]'>Address:</span> Canal Cotoca 3er anillo interno #3630, Santa Cruz, Bolivia</p>
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className='border-t border-gray-200'>
        <div className='max-w-[1024px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-gray-500' style={{ fontSize: '16px' }}>© {new Date().getFullYear()} QRupones · Toptech S.R.L.</p>
          <Link href='/' className='font-medium text-[#a780b7] hover:underline' style={{ fontSize: '16px' }}>
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </main>
  );
}
