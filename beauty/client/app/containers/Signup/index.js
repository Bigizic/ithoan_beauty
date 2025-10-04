/*
 *
 * Signup
 *
 */

import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Navigate, Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import Checkbox from '../../components/Common/Checkbox';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SignupProvider from '../../components/Common/SignupProvider';
import { useDispatch } from 'react-redux';


const PhoneNumberInput = ({ onPhoneChange, error }) => {
  const [value, setValue] = useState('');

  const handleChange = (phoneNumber) => {
    setValue(phoneNumber);
    if (onPhoneChange) {
      onPhoneChange(phoneNumber);
    }
  };

  return (
    <div>
      <label htmlFor="phone-input" style={{ marginBottom: '10px', display: 'block' }}>
        Phone Number:
      </label>
      <PhoneInput
        id="phone-input"
        placeholder="Enter phone number"
        defaultCountry="NG"
        value={value}
        onChange={handleChange}
        international
        countryCallingCodeEditable={true}
        className="phone-input"
        style={{ border: '1px solid #cecece', paddingLeft: '1em', gap: '1em' }}
      />
      <span style={{ color: 'red' }} className='invalid-message'>{error && error[0]}</span>
    </div>
  );
};


class Signup extends React.PureComponent {

  render() {
    const {
      authenticated,
      signupFormData,
      formErrors,
      isLoading,
      isSubmitting,
      isSubscribed,
      signupChange,
      signUp,
      subscribeChange,
      default_currency,

      googleSignup,
    } = this.props;

    if (authenticated) return <Navigate to='/dashboard' />;

    const handleSubmit = event => {
      event.preventDefault();
      signUp(default_currency);
    };

    return (
      <div className='signup-form mt-[12em] lg:mt-[18em] flex flex-col justify-center'>
        {isLoading && <LoadingIndicator />}
        <div className='my-3'>
          <h2 className='text-3xl text-center' data-aos="fade-right">Create Your Account and Glow With Us</h2>
          <p className='text-md text-center'>Sign up today for glowing benefits from expert skincare tips to special offers made just for you.</p>
        </div>
        <hr />
        <form onSubmit={handleSubmit} noValidate>
          <Row className='w-100 items-center flex-col-reverse m-0'>
            <Col
              xs={{ size: 12, order: 2 }}
              md={{ size: '6', order: 1 }}
              className='p-0'
            >
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['email']}
                  label={'Email Address'}
                  name={'email'}
                  placeholder={'Please Enter Your Email'}
                  value={signupFormData.email}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>

              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['firstName']}
                  label={'First Name'}
                  name={'firstName'}
                  placeholder={'Please Enter Your First Name'}
                  value={signupFormData.firstName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
              <Col xs='12' md='12'>
                <Input
                  type={'text'}
                  error={formErrors['lastName']}
                  label={'Last Name'}
                  name={'lastName'}
                  placeholder={'Please Enter Your Last Name'}
                  value={signupFormData.lastName}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>

              <Col xs='12' md='12'>
                <PhoneNumberInput
                  name={'phoneNumber'}
                  error={formErrors['phoneNumber']}
                  onPhoneChange={(name) => {
                    signupChange('phoneNumber', name);
                  }
                  }>

                </PhoneNumberInput>

              </Col>

              <Col xs='12' md='12'>
                <Input
                  type={'password'}
                  label={'Password'}
                  error={formErrors['password']}
                  name={'password'}
                  placeholder={'Please Enter Your Password'}
                  value={signupFormData.password}
                  onInputChange={(name, value) => {
                    signupChange(name, value);
                  }}
                />
              </Col>
            </Col>
            <Col
              xs={{ size: 12, order: 1 }}
              md={{ size: '6', order: 2 }}
              className='mb-2 mb-md-0'
            >
              <SignupProvider
                googleSignup={(v) => googleSignup(v)}
              />
            </Col>
          </Row>
          <hr />
          <Checkbox
            id={'subscribe'}
            label={'Subscribe to newsletter'}
            checked={isSubscribed}
            onChange={subscribeChange}
            className={"flex justify-center w-full"}
          />
          <div className='d-flex flex-column flex-md-row align-items-md-center signup_center'>
            <Button
              className='signup_signup padding_top_extender'
              type='submit'
              text='Sign Up'
              disabled={isSubmitting}
            />
            <Link className='mt-3 mt-md-0 redirect-link signup_login' to={'/login'}>
              <Button className='padding_top_extender' variant='secondary' text='Back to login'>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    isSubscribed: state.signup.isSubscribed,

    default_currency: state.currency.default_currency,
  };
};

export default connect(mapStateToProps, actions)(Signup);
