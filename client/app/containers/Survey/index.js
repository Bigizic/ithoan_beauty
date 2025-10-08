import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import actions from '../../actions';
import List from './List';
import Page404 from '../../components/Common/Page404';

class Survey extends React.PureComponent {
  render() {
    return (
      <div className='survey-dashboard'>
        <Routes>
          <Route path='' element={<List />} />
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

export default connect(mapStateToProps, actions)(Survey);
