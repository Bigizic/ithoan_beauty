/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import CampaignList from '../../components/Manager/CampaignList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchCampaigns();
    // this.props.fetchProductBoughtCount();
    this.props.fetchMailingListDetails();
    this.props.fetchUsers();
  }

  render() {
    const { campaigns, isLoading, data, users } = this.props;

    return (
      <>
        <SubPage
          title='Campaigns'
          actionTitle='Create'
          handleAction={'/dashboard/campaigns/create'}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : campaigns.length > 0 ? (
            <CampaignList campaigns={campaigns} data={data} users={users} isLoading={isLoading}/>
          ) : (
            <NotFound message='No campaign message.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    campaigns: state.campaign.campaigns,
    isLoading: state.campaign.isLoading,
    data: state.campaign.mailingListDetails,
    users: state.users.users,
  };
};

export default connect(mapStateToProps, actions)(List);
