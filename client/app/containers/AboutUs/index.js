import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class AboutUs extends React.PureComponent {
  render() {
    return (
      <div className='about-us margin-top-compact pd-default mb-5'>
        <section className='about-intro'>
          <h1 className='text-3xl text-center font-semibold mb-6'>
            About Tohanniees Skincare
          </h1>

          <div className='about-content space-y-8'>
            <div className='about-section'>
              <h2 className='text-2xl my-3 font-semibold text-other'>
                Our Story
              </h2>
              <p className='leading-relaxed text-gray-700'>
                Founded in 2019, <strong>Tohanniees Skincare</strong> is a proudly Nigerian brand built on the belief that true beauty begins with healthy, confident skin. 
                What started as a passion project by a certified cosmetologist has evolved into a trusted name in natural skincare, one that blends science, nature, and care to deliver visible results.
              </p>
              <p className='leading-relaxed text-gray-700 mt-3'>
                Every product is thoughtfully formulated with <strong>pure, high-quality ingredients</strong> sourced responsibly and crafted with precision to nourish, restore, and protect your skin the natural way.
              </p>
            </div>

            <div className='about-section'>
              <h2 className='text-2xl my-3 font-semibold text-other'>
                Our Philosophy
              </h2>
              <p className='leading-relaxed text-gray-700'>
                We believe skincare should be <strong>gentle, effective, and honest</strong>. 
                That’s why every formula we create is grounded in dermatological science, guided by nature, and free from harsh chemicals. 
                With Tohanniees Skincare, you don’t just treat your skin you honor it.
              </p>
            </div>

            <div className='about-section'>
              <h2 className='text-2xl my-3 font-semibold text-other'>
                Our Mission & Values
              </h2>
              <p className='leading-relaxed text-gray-700'>
                Officially registered in <strong>Nigeria since 2020</strong> and expanding to the <strong>United Kingdom</strong>, we continue to redefine clean beauty through education, innovation, and trust. 
                Our founder’s advanced studies in cosmetic science have allowed us to push boundaries creating formulas that are both luxurious and result-driven.
              </p>
              <p className='leading-relaxed text-gray-700 mt-3'>
                Over the years, we’ve helped <strong>thousands of individuals</strong> overcome skin challenges, rebuild confidence, and rediscover the joy of healthy skin.
              </p>
              <p className='leading-relaxed text-gray-700 mt-3'>
                <strong>Our mission is simple:</strong> to empower you to love your skin naturally. 
                Whether you’re just starting your skincare journey or refining your routine, Tohanniees Skincare is here to guide you every step of the way.
              </p>
            </div>

            <div className='about-commitment bg-gray-50 p-6 rounded-2xl shadow-sm'>
              <h3 className='text-2xl mb-3 font-semibold text-other'>
                Why Choose Tohanniees Skincare?
              </h3>
              <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                <li>Expert formulations crafted by certified cosmetologists</li>
                <li>Pure, naturally sourced, and skin-friendly ingredients</li>
                <li>Science-backed solutions for visible, lasting results</li>
                <li>Trusted by thousands across Nigeria and beyond</li>
                <li>Committed to restoring confidence and natural beauty</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, actions)(AboutUs);
