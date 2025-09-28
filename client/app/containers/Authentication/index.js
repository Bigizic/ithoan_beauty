/**
 *
 * Authentication
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import actions from '../../actions';

const Authentication = (props) => {
  const { children, authenticated } = props
  if (!authenticated) {
    return <Navigate to='/login' />;
  } else {
    return children
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(Authentication);
