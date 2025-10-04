/*
 *
 * ForgotPassword
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import { Navigate, Link } from 'react-router-dom';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

class ForgotPassword extends React.PureComponent {
  render() {
    const {
      authenticated,
      forgotFormData,
      formErrors,
      forgotPasswordChange,
      forgotPassowrd
    } = this.props;

    if (authenticated) return <Navigate to='/dashboard' />;

    const handleSubmit = event => {
      event.preventDefault();
      forgotPassowrd();
    };

    return (
      <div className='forgot-password-form margin-top-compact'>
        <h3 className='text-2xl'>Forgot Password</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs='12' md='6'>
              <Input
                type={'text'}
                error={formErrors['email']}
                label={'Email Address'}
                name={'email'}
                placeholder={'Please Enter Your Email'}
                value={forgotFormData.email}
                onInputChange={(name, value) => {
                  forgotPasswordChange(name, value);
                }}
              />
            </Col>
          </Row>
          <hr />
          <div className='d-flex flex-column flex-md-row align-items-md-center forgot_password_div'>
            <Button
              className='mb-3 mb-md-0 signup_signup padding_top_extender'
              type='submit'
              text='Send Email'
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
    forgotFormData: state.forgotPassword.forgotFormData,
    formErrors: state.forgotPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(ForgotPassword);
