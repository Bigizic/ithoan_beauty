/*
 *
 * Banner
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import actions from '../../actions';
// import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Page404 from '../../components/Common/Page404';

class Banner extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='banner-dashboard'>
        <Routes>
          <Route path='' element={<List />} />
          {/* {user.role === ROLES.Admin && ( */}
          <Route path='add' element={<Add />} />
          {/* )} */}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
  };
};

export default connect(mapStateToProps, actions)(Banner);
