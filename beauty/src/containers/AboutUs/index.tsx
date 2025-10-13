import React from 'react';
import { TH_BEAUTY } from '../../../app/constants';
import { ServicesProps } from '../../interface';
import { Instagram, MessageCircle, Camera } from 'lucide-react';

class AboutUs extends React.PureComponent<ServicesProps> {
  render() {
    const { services } = this.props;
    return (
      <div className='about-us-page font-sans text-gray-800 mt-[8em]'>
        {/* hero section */}
        <section className='hero-section py-20 bg-gradient-to-b from-[#fff9f5] via-[#fff] to-[#fdf7f1]'>
          <div className='max-w-5xl mx-auto px-6 text-left md:text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 text-gray-900'>
              Welcome To <span className='text-[#EABE30]'>Tohanniees Beauty</span>
            </h1>
            <p className='text-lg md:text-xl text-gray-700 font-light'>
              Where Elegance Meets Rejuvenation
            </p>
          </div>
        </section>

        {/* about section */}
        <section className='content-section py-16 bg-white'>
          <div className='max-w-5xl mx-auto px-6'>
            <div className='mb-16 text-center'>
              <p className='text-[16px] md:text-xl leading-relaxed text-gray-700 mb-6 text-left'>
                At <strong>Tohanniees Beauty</strong>, we believe true beauty starts from self-care.
                Our mission is to create a serene escape where wellness and sophistication blend seamlessly
                refreshing your body, calming your mind, and restoring your natural glow.
              </p>
              <p className='text-lg md:text-xl leading-relaxed text-gray-700 text-left'>
                We offer premium treatments, from <strong>Spa Therapies</strong> to
                <strong> Body Polishes</strong>, <strong>Pedicures</strong>, and <strong>Therapeutic Massages</strong>.
                Each experience is tailored to your comfort, using expert techniques and the finest products.
              </p>
            </div>

            {/* service highlight */}
            <div className='services-highlight bg-gradient-to-r from-[#fdf6e3] to-[#fff9f0] border border-[#f3e7c9] py-10 px-5 md:px-10 rounded-2xl shadow-sm'>
              <h2 className='text-3xl font-semibold mb-8 text-center text-gray-900'>
                Our Signature Services
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {services.map((title, idx) => (
                  <div key={idx} className='service-item'>
                    <h3 className='font-semibold text-xl mb-2 text-[#EABE30]'>{title.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: title.description }} className='text-gray-600'></p>
                  </div>
                ))}
              </div>
            </div>

            {/* location section */}
            <div className='location-section my-20 text-center'>
              <h2 className='text-3xl font-semibold mb-8 text-gray-900'>Visit Us</h2>
              <div className='map-container rounded-2xl overflow-hidden shadow-lg mb-8'>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.3019876560722!2d3.5064944017040713!3d6.695872587447435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103be9005469265b%3A0x86ad0b80cf5b7812!2sTohanniees%20Beauty!5e0!3m2!1sen!2sng!4v1759578326754!5m2!1sen!2sng"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tohanniees Beauty Location"
                ></iframe>
              </div>
              <a
                href={TH_BEAUTY.location}
                target="_blank"
                rel="noopener noreferrer"
                className='inline-block px-8 py-3 bg-[#EABE30] text-white font-medium rounded-full hover:bg-[#d6a829] transition'
              >
                Get Directions
              </a>
            </div>

            {/* contact section */}
            <div className='contact-section my-20'>
              <h2 className='text-3xl font-semibold mb-8 text-center text-gray-900'>
                Connect With Us
              </h2>
              <div className='flex flex-wrap justify-center gap-5'>
                <a
                  href={TH_BEAUTY.whatsapp}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full hover:bg-[#1da955] transition'
                >
                  <MessageCircle size={20} /> WhatsApp
                </a>
                <a
                  href={TH_BEAUTY.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-6 py-3 bg-[#E4405F] text-white rounded-full hover:bg-[#c73652] transition'
                >
                  <Instagram size={20} /> Instagram
                </a>
                <a
                  href={TH_BEAUTY.snapchat}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-6 py-3 bg-[#FFFC00] text-gray-900 font-semibold rounded-full hover:bg-[#f0e200] transition'
                >
                  <Camera size={20} /> Snapchat
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* cta section */}
        <section className='cta-section py-20 bg-[#0e0e0e] text-white text-center'>
          <div className='max-w-4xl mx-auto px-6'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Ready To Experience True Beauty?
            </h2>
            <p className='text-lg md:text-xl mb-10 text-gray-300'>
              Book your appointment today and step into luxury.
            </p>
            <a
              href='/booking'
              className='inline-block px-10 py-4 bg-[#EABE30] text-white font-semibold rounded-full hover:bg-[#d6a829] transition'
            >
              Book Now
            </a>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutUs;
