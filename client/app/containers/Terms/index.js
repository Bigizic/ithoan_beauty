import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

class Terms extends React.PureComponent {
  render() {
    return (
      <div className='terms'>
        <h1>Tohanniees Skincare Privacy Policy</h1>

        <h2>PERSONAL INFORMATION WE COLLECT</h2>
        <p>
        When you visit the Site, we collect personal information that you provide to us, including your name, address, and phone number, for the purpose of processing orders. This information is necessary to fulfill your purchases and deliver products or services to you.
        </p>
        <h3>Technologies we use:</h3>
        <ul>
          <li>“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier.</li>
          <li>“Log files” track actions occurring on the Site and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
          <li>“Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.</li>
        </ul>

        <h2>HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
        <p>
          We use the Order Information that we collect generally to fulfill any orders placed through the Site (including
          processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
        </p>
        <ul>
          <li>Communicate with you;</li>
          <li>Screen our orders for potential risk or fraud;</li>
          <li>Provide you with information or advertising relating to our products or services.</li>
        </ul>

        <h2>SHARING YOUR PERSONAL INFORMATION</h2>
        <p>
          We share your Personal Information with third parties to help us use your Personal Information, as described above.
          For example, we use Google Analytics to help us understand how our customers use the Site.
        </p>

        <h2>BEHAVIOURAL ADVERTISING</h2>
        <p>
          As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.
        </p>

        <h2>DO NOT TRACK</h2>
        <p>
          Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
        </p>

        <h2>DATA RETENTION</h2>
        <p>
          When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
        </p>

        <h2>CHANGES</h2>
        <p>
          We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
        </p>

        <h2>CONTACT US</h2>
        <p>
          For more information about our privacy practices, if you have questions, or if you would like to make a complaint,
          please contact us by e-mail at support@tohannieesskincare.com
        </p>

        <h1>TOHANNIEES SKINCARE RETURN AND REFUND POLICY</h1>

        <h2>Strict No Refund Policy:</h2>
        <p>
            At Tohanniees Skincare, we maintain a strict no refund policy. Once an order has been paid for, it is considered final, and refunds are not possible under any circumstances. We encourage all customers to carefully review their orders before completing payment.
        </p>

        <h2>No Exchange:</h2>
        <p>
            Exchanges are not offered after payment has been made. Please ensure to verify products before making payment, as there will be no exchange or refund once payment is complete.
        </p>

        <h2>Contact Us:</h2>
        <p>
            If you have any questions or concerns, please contact our customer support team through our social media channels or email.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Terms);
