/*
 *
 * Newsletter Unsubscribe
 *
 */

import React from 'react';
import { Buffer } from 'buffer';
import { connect } from 'react-redux';
import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { withRouter } from '@/withRouter';

class NewsletterUnsubscribe extends React.PureComponent {
    componentDidMount() {
        let eMail = this.props.match.params.email;
        eMail = Buffer.from(eMail, 'base64').toString('utf-8');
        if ( eMail ) { this.props.newsletterUnsubscribeChange(null, eMail) }
    }

  render() {
    const {
        email, eMail, newsletterUnsubscribeChange,
        unsubscribeToNewsletter, formErrors, isLoading,
    } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      unsubscribeToNewsletter();
    };

    return (
      <div className='unsubscribe-newsletter-form margin-top-compact'>
        { isLoading && <LoadingIndicator /> }
        <p>Confirm the email you want to unsubscribe</p>
        <form onSubmit={handleSubmit}>
          <div className='unsubscribe'>
            <Input
              type={'text'}
              error={formErrors['email']}
              name={'email'}
              placeholder={'Please Enter Your Email'}
              value={eMail && eMail || email}
              onInputChange={(name, value) => {
                newsletterUnsubscribeChange(name, value);
              }}
            />
          </div>
          <SubscribeButton />
        </form>
      </div>
    );
  }
}

const SubscribeButton = () => {
  return (
    <Button round={3} type='submit' variant='primary' text='Unsubscribe' />
  )
};

const mapStateToProps = state => {
  return {
    email: state.newsletterUnsubscribe.email,
    formErrors: state.newsletterUnsubscribe.formErrors,
    isLoading: state.newsletterUnsubscribe.isLoading,
  };
};

export default connect(mapStateToProps, actions)(withRouter(NewsletterUnsubscribe));
