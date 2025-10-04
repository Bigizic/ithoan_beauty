/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import { ROLES } from '../../constants';
// added new_link.json 4-12-24.. to disable merchants dashboard
import dashboardLinks from './new_links.json';
import { isDisabledMerchantAccount } from '../../utils/app';
import Admin from '../../components/Manager/Dashboard/Admin';
import Merchant from '../../components/Manager/Dashboard/Merchant';
import Customer from '../../components/Manager/Dashboard/Customer';
import DisabledMerchantAccount from '../../components/Manager/DisabledAccount/Merchant';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const {
      user, isLoading,
      isMenuOpen, toggleDashboardMenu,
      setDashboardRouter, routeType
    } = this.props;

    if (isDisabledMerchantAccount(user))
      return <DisabledMerchantAccount user={user} />;

    return (
      <div className='margin-top-compact'>
        {isLoading ? (
          <LoadingIndicator inline />
        ) : user.role === ROLES.Admin ? (
          <Admin
            user={user}
            isMenuOpen={isMenuOpen}
            links={dashboardLinks[ROLES.Admin]}
            toggleMenu={toggleDashboardMenu}
            setDashboardRouter={setDashboardRouter}
            routeType={routeType}
          />
        ) : user.role === ROLES.Merchant && user.merchant ? (
          <Merchant
            user={user}
            isMenuOpen={isMenuOpen}
            links={dashboardLinks[ROLES.Merchant]}
            toggleMenu={toggleDashboardMenu}
            setDashboardRouter={setDashboardRouter}
            routeType={routeType}
          />
        ) : (
          <Customer
            user={user}
            isMenuOpen={isMenuOpen}
            links={dashboardLinks[ROLES.Member]}
            toggleMenu={toggleDashboardMenu}
            setDashboardRouter={setDashboardRouter}
            routeType={routeType}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    isLoading: state.account.isLoading,
    isMenuOpen: state.dashboard.isMenuOpen,
    routeType: state.dashboard.routeType,
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
