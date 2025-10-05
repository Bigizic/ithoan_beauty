import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { ROLES } from '../../constants';
import actions from '../../actions';
import List from './List';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';

class Booking extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className='booking-dashboard'>
        <Routes>
          <Route exact path='' element={<List />} />
          {user.role === ROLES.Admin && (
            <Route path='edit/:bookingId' element={<Edit />} />
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

export default connect(mapStateToProps, actions)(Booking);
