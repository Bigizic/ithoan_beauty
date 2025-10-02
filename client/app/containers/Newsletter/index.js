/*
 *
 * Newsletter
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import Input from '@/components/Store/Tags/Input';
import Button from '@/components/Store/Tags/Button';
import LoadingIndicator from '@/components/Common/LoadingIndicator';
// import Input from '../../components/Common/Input';
// import Button from '../../components/Common/Button';

class Newsletter extends React.PureComponent {
  render() {
    const { email, newsletterChange, subscribeToNewsletter, formErrors, isLoading } =
      this.props;

    const handleSubmit = event => {
      event.preventDefault();
      subscribeToNewsletter();
    };

    return (
      <div className='newsletter-form'>
        {isLoading && <LoadingIndicator />}
        <form onSubmit={handleSubmit}>
          <div className='subscribe'>
            {/*<Input
              type={'text'}
              error={formErrors['email']}
              name={'email'}
              placeholder={'Please Enter Your Email'}
              value={email}
              onInputChange={(name, value) => {
                newsletterChange(name, value);
              }}
              inlineElement={SubscribeButton}
            />*/}
            <Input
              placeholder={'Enter Your Email'}
              type={'email'}
              className='py-[8px] px-[15px] text-black newsletter-input-footer'
              data-aos="fade-right"
              data-aos-once="true"
              inlineElement={SubBtn}
              error={formErrors['email']}
              value={email}
              onInputChange={(name, value) => {
                newsletterChange(name, value);
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

const SubBtn = (
  <Button
    type='submit'
    data-aos="fade-left" data-aos-once="true"
    text={'→'}
    fontSize={'14px'}
    className='w-[fit-content] px-[1em] bg-signature border-none rounded-[5px]'
  />
)

/*const SubscribeButton = (
  <Button round={3} type='submit' variant='primary' text='Subscribe' />
);*/

const mapStateToProps = state => {
  return {
    email: state.newsletter.email,
    formErrors: state.newsletter.formErrors,
    isLoading: state.newsletter.isLoading
  };
};

export default connect(mapStateToProps, actions)(Newsletter);
