import React from 'react';
import { ShieldCheck, CalendarDays, CreditCard, HeartPulse, UserCheck, AlertCircle, Users } from 'lucide-react';

class Policy extends React.PureComponent {
  render() {
    return (
      <div className='policy-page my-[6em] bg-white pd-default'>
        <h1 className='text-4xl font-bold text-center mb-10 py-12'>
          Tohanniees Beauty Policies & Protocols
        </h1>

        <div className='space-y-10 text-gray-800 leading-relaxed'>
          <section className='policy-section'>
            <div className='flex items-center gap-2 mb-4'>
              <CalendarDays className='w-6 h-6 text-[#EABE30]' />
              <h2 className='text-2xl font-semibold'>1. Appointments & Scheduling</h2>
            </div>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Book in advance to secure your preferred appointment time.</li>
              <li>Face-to-face consultation with Tohanniees: ₦10,000.</li>
              <li>A 24-hour cancellation notice is required to avoid fees.</li>
              <li>Late arrivals (15+ minutes) may result in reduced treatment time or cancellation.</li>
            </ul>
          </section>

          <section className='policy-section'>
            <div className='flex items-center gap-2 mb-4'>
              <CreditCard className='w-6 h-6 text-[#EABE30]' />
              <h2 className='text-2xl font-semibold'>2. Payments & Deposits</h2>
            </div>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Deposits may be required for certain services or package bookings.</li>
              <li>Full payment is due before or immediately after service completion.</li>
              <li>We accept cash, bank transfers, and approved digital payment platforms.</li>
            </ul>
          </section>

          <section className='policy-section'>
            <div className='flex items-center gap-2 mb-4'>
              <HeartPulse className='w-6 h-6 text-[#EABE30]' />
              <h2 className='text-2xl font-semibold'>3. Health & Safety Protocols</h2>
            </div>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Please disclose any allergies, skin conditions, or health concerns prior to treatment.</li>
              <li>We uphold strict hygiene standards, including tool sanitization and sterilization.</li>
              <li>Services may be adjusted or declined to ensure client safety and well-being.</li>
            </ul>
          </section>

          <section className='policy-section'>
            <div className='flex items-center gap-2 mb-4'>
              <UserCheck className='w-6 h-6 text-[#EABE30]' />
              <h2 className='text-2xl font-semibold'>4. Professional Conduct</h2>
            </div>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Our staff upholds the highest standards of professionalism and respect.</li>
              <li>Inappropriate behavior from clients will not be tolerated and may lead to termination of service.</li>
              <li>All client information is treated with the utmost confidentiality.</li>
            </ul>
          </section>

          <section className='policy-section'>
            <div className='flex items-center gap-2 mb-4'>
              <AlertCircle className='w-6 h-6 text-[#EABE30]' />
              <h2 className='text-2xl font-semibold'>5. Refunds & Complaints</h2>
            </div>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Payments for completed services are non-refundable.</li>
              <li>Feedback is encouraged within 24 hours of service for prompt resolution.</li>
              <li>Product sales are final unless the item is proven defective.</li>
            </ul>
          </section>

          <section className='policy-section'>
            <div className='flex items-center gap-2 mb-4'>
              <Users className='w-6 h-6 text-[#EABE30]' />
              <h2 className='text-2xl font-semibold'>6. Client Responsibilities</h2>
            </div>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Arrive prepared for treatment (e.g., no creams or oils before waxing).</li>
              <li>Be punctual to help maintain smooth scheduling for all clients.</li>
              <li>Children or companions are not permitted in treatment rooms without prior approval.</li>
            </ul>
          </section>

          <section className='policy-section'>
            <div className='flex items-center gap-2 mb-4'>
              <ShieldCheck className='w-6 h-6 text-[#EABE30]' />
              <h2 className='text-2xl font-semibold'>7. Staff Protocols</h2>
            </div>
            <ul className='list-disc pl-6 space-y-2'>
              <li>All staff maintain a professional appearance and calm demeanor.</li>
              <li>Every treatment is clearly explained, and client consent is obtained before proceeding.</li>
              <li>We strive to provide a serene and relaxing spa atmosphere at all times.</li>
            </ul>
          </section>

          <div className='mt-12 p-6 rounded-lg text-center mb-12'>
            <p className='text-lg font-medium text-gray-700'>
              Thank you for choosing tohanniees beauty. we look forward to serving you with excellence and care.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Policy;
