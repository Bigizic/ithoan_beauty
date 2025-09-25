'use client';

import React from 'react';

export const PrivacyPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#1c1c1c] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c1c] mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              At Tohanniees Beauty, we collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Book an appointment or consultation</li>
              <li>Create an account on our website</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for customer service</li>
              <li>Participate in surveys or promotions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c1c] mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process appointments and transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c1c] mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c1c] mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c1c] mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at privacy@tohannieesbeauty.com or call us at (555) 123-4567.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};