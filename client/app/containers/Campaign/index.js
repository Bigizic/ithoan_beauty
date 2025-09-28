/*
 *
 * Product
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import actions from '../../actions';

// import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Preview from './Preview';
import Page404 from '../../components/Common/Page404';

class Campaign extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='product-dashboard'>
        <Routes>
          <Route path='' element={<List />} />
          <Route path='preview/:id' element={<Preview />} />
          {/* {user.role === ROLES.Admin && ( */}
          <Route exact path='create' element={<Add />} />
          {/* )} */}
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

export default connect(mapStateToProps, actions)(Campaign);
