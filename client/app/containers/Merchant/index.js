/*
 *
 * Merchant
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import actions from '../../actions';
import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Page404 from '../../components/Common/Page404';

class Merchant extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='merchant-dashboard'>
        <Routes>
          <Route exact path='' element={<List />} />
          {user.role === ROLES.Admin && (
            <Route exact path='add' element={<Add />} />
          )}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Merchant);
