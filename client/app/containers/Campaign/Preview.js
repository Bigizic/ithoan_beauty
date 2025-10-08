/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import CampaignPreview from '../../components/Manager/CampaignPreview';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { withRouter } from '@/withRouter';

class Preview extends React.PureComponent {
  componentDidMount() {
    this.props.resetCampaigns();
    const campaignId = this.props.match.params.id;
    this.props.fetchCampaign(campaignId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetCampaigns();
      const campaignId = this.props.match.params.id;
      this.props.fetchCampaign(campaignId);
    }
  }

  render() {
    const {
      user,
      campaign,
      deleteCampaign,
      sendCampaign,
      subscribers,
      fetchSubscribers,
      isLoading,
    } = this.props;

    return (
      <SubPage
        title='Viewing Campaign'
        actionTitle='Cancel'
      >
        {isLoading && <LoadingIndicator />}
        {campaign?._id ? (
          <CampaignPreview
            user={user}
            campaign={campaign}
            deleteCampaign={deleteCampaign}
            sendCampaign={sendCampaign}
            subscribers={subscribers}
            fetchSubscribers={fetchSubscribers}
          />
        ) : (
          <NotFound message='No product found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    campaign: state.campaign.campaign,
    isLoading: state.campaign.isLoading,
    subscribers: state.campaign.subscribers,
  };
};

export default connect(mapStateToProps, actions)(withRouter(Preview));
