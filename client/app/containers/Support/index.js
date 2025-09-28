/*
 *
 * Support
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { default as SupportManager } from '../../components/Manager/Support';
import { Link } from 'react-router-dom';
import Button from '../../components/Common/Button';

class Support extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='support margin-top-compact'>
        <h3 className='text-3xl'>Support</h3>
        <hr />
        <div className='mt-3'>
          <Link to='/contact'><Button
            text={'Open a ticket here'}
          >
          </Button></Link>
        </div>
        <div className='mt-5'>
          <SupportManager user={user} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default connect(mapStateToProps, actions)(Support);
