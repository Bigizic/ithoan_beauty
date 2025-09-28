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

        <div className="faq_image">
          <h2>Frequently asked questions</h2>
        </div>

        <div className="faqs">
          {/* general */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={"General"}
            children={<Faq data={generalData} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* product */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={"Product"}
            children={<Faq data={productData} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* payment & billing */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={"Payment & billing"}
            children={<Faq data={billingData} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* shipping & delivery */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={"Shipping & Delivery"}
            children={<Faq data={shippingAndDelivery} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* techical support */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={"Technical Support"}
            children={<Faq data={technicalSupport} styles={styles} config={config} />}>
          </DropdownConfirm>

          {/* privacy & security */}
          <DropdownConfirm
            className={"faq_page_dropdown"}
            label={"Privacy & Security"}
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
