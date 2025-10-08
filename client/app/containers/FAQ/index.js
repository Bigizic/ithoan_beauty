import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import actions from '../../actions';
import Faq from "react-faq-component";
import DropdownConfirm from "../../components/Common/DropdownConfirm";
import faqData from './data.json'

const { generalData, productData, billingData, shippingAndDelivery, technicalSupport, privacyAndSecurity } = faqData;

class FaqPage extends React.PureComponent {
  render() {
    const styles = {
      bgColor: "white",
      rowTitleColor: "black",
      rowTitleTextSize: '16px',
      rowContentColor: "#48484a",
      rowContentTextSize: '15px',
      rowContentPaddingTop: '5px',
      rowContentPaddingBottom: '5px',
      arrowColor: "black",
    }

    const config = {
      animate: true,
      tabFocus: true
    };
    return (
      <div className='faq_page'>

        <div className="w-full mt-[5em] md:mt-[10em]">
          {/* hero image */}
          <div className="relative w-full h-[70vh] md:h-[80vh]">
            <img
              src="/images/banners/faq.jpeg"
              alt="faq banner"
              className="w-full h-full object-cover"
            />
            <div style={{ background: 'rgba(0, 0, 0, 0.4)' }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1
                data-aos="fade-up"
                className="text-3xl md:text-5xl font-bold text-white tracking-wide"
              >
                Frequently Asked Questions
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl"
              >
                find answers to our most common questions about products,
                shipping, billing, and more. we’re here to guide you on your
                skincare journey.
              </p>
            </div>
          </div>
        </div>

        <div className="faqs pd-default">
          {/* general */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={<p>General</p>}
            children={<Faq data={generalData} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* product */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={<p>Product</p>}
            children={<Faq data={productData} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* payment & billing */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={<p>Payment & billing</p>}
            children={<Faq data={billingData} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* shipping & delivery */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={<p>Shipping & Delivery</p>}
            children={<Faq data={shippingAndDelivery} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* techical support */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={<p>Technical Support</p>}
            children={<Faq data={technicalSupport} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* privacy & security */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={<p>Privacy & Security</p>}
            children={<Faq data={privacyAndSecurity} styles={styles} config={config} />}>
          </DropdownConfirm>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(FaqPage);
