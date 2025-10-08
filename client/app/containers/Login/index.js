/*
 *
 * Login
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SigninProvider from '../../components/Common/SigninProvider';


const Login = (props) => {
  const {
    authenticated,
    loginFormData,
    loginChange,
    login,
    formErrors,
    isLoading,
    isSubmitting,
    default_currency,

    googleSignin,
  } = props;
  const navigate = useNavigate()

  if (authenticated) return <Navigate to='/dashboard' />;

  const registerLink = () => {
    navigate('/register');
  };

  const handleSubmit = event => {
    event.preventDefault();
    login(default_currency);
  };

  return (
    <div className='login-form mt-[12em] lg:mt-[18em] flex flex-col justify-center'>

      {isLoading && <LoadingIndicator />}
      <div className='my-3'>
        <h2 className='text-3xl text-center' data-aos="fade-right">Welcome Back</h2>
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
                value={loginFormData.email}
                onInputChange={(name, value) => {
                  loginChange(name, value);
                }}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                type={'password'}
                error={formErrors['password']}
                label={'Password'}
                name={'password'}
                placeholder={'Please Enter Your Password'}
                value={loginFormData.password}
                onInputChange={(name, value) => {
                  loginChange(name, value);
                }}
              />
            </Col>
          </Col>
          <Col
            xs={{ size: 12, order: 1 }}
            md={{ size: '6', order: 2 }}
            className='mb-2 mb-md-0 my-3'
          >
            <SigninProvider
              googleSignin={(v) => googleSignin(v)}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column'>
          <div className='d-flex mb-3 mb-md-0 login_div_div md:justify-around md:w-[60%] md:self-center'>
            <Button
              type='submit'
              className='signup_signup padding_top_extender rounded-[5px] border-none'
              text='Login'
              disabled={isSubmitting}
            />
            <Button
              text='Create an account'
              variant='secondary'
              className='ml-md-3 signup_login padding_top_extender'
              onClick={registerLink}
            />
          </div>
          <Link
            className='redirect-link forgot-password-link text-center'
            to={'/forgot-password'}
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting,

    default_currency: state.currency.default_currency,
  };
};

export default connect(mapStateToProps, actions)(Login);
