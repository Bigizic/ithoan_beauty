import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Terms extends React.PureComponent {
  render() {
    return (
      <div className='terms margin-top-compact pd-default'>

        {/* privacy policy section */}
        <section id='privacy-policy'>
          <h1>Tohanniees Skincare Privacy Policy</h1>

          <h2 id='personal-information'>Personal Information We Collect</h2>
          <p>
            When you visit the site, we collect personal information that you provide to us, including your name, address, and phone number, for the purpose of processing orders. This information is necessary to fulfill your purchases and deliver products or services to you.
          </p>

          <h3 id='technologies-we-use'>Technologies We Use</h3>
          <ul>
            <li>Cookies are data files placed on your device or computer and often include an anonymous unique identifier.</li>
            <li>Log files track actions on the site and collect data including IP address, browser type, ISP, referring/exit pages, and date/time stamps.</li>
            <li>Web beacons, tags, and pixels are electronic files used to record information about how you browse the site.</li>
          </ul>

          <h2 id='how-we-use'>How Do We Use Your Personal Information?</h2>
          <p>
            We use the order information that we collect generally to fulfill any orders placed through the site (including processing your payment information, arranging for shipping, and providing you with invoices and order confirmations).
          </p>
          <ul>
            <li>Communicate with you.</li>
            <li>Screen our orders for potential risk or fraud.</li>
            <li>Provide you with information or advertising relating to our products or services.</li>
          </ul>

          <h2 id='sharing-info'>Sharing Your Personal Information</h2>
          <p>
            We share your personal information with third parties to help us use your personal information, as described above. For example, we use Google Analytics to understand how our customers use the site.
          </p>

          <h2 id='behavioural-advertising'>Behavioural Advertising</h2>
          <p>
            As described above, we use your personal information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.
          </p>

          <h2 id='do-not-track'>Do Not Track</h2>
          <p>
            Please note that we do not alter our site’s data collection and use practices when we see a “Do Not Track” signal from your browser.
          </p>

          <h2 id='data-retention'>Data Retention</h2>
          <p>
            When you place an order through the site, we will maintain your order information for our records unless and until you ask us to delete this information.
          </p>

          <h2 id='policy-changes'>Changes</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons.
          </p>

          <h2 id='contact-privacy'>Contact Us</h2>
          <p>
            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href='mailto:support@tohannieesskincare.com'>support@tohannieesskincare.com</a>.
          </p>
        </section>

        {/* return & refund policy section */}
        <section id='refund-policy' className='mt-10'>
          <h1 id="refund-policy">Tohanniees Skincare Return And Refund Policy</h1>

          <h2 id='no-refund'>Strict No Refund Policy</h2>
          <p>
            At Tohanniees Skincare, we maintain a strict no refund policy. Once an order has been paid for, it is considered final, and refunds are not possible under any circumstances. Please review orders carefully before completing payment.
          </p>

          <h2 id='no-exchange'>No Exchange</h2>
          <p>
            Exchanges are not offered after payment has been made. Ensure that you verify products before making payment, as there will be no exchange or refund once payment is complete.
          </p>

          <h2 id='contact-refund'>Contact Us</h2>
          <p>
            If you have any questions or concerns, please contact our customer support team through our social media channels or by e-mail.
          </p>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({})
export default connect(mapStateToProps, actions)(Terms)
