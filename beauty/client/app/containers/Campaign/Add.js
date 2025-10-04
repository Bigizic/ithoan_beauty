/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddCampaign from '../../components/Manager/AddCampaign';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  componentDidMount() {
    //this.props.fetchBrandsSelect();
  }


  render() {
    const {
      user,
      campaignFormData,
      formErrors,
      campaignChange,
      addCampaign,
      isLoading,
    } = this.props;

    return (
      <SubPage
        title='Create Campaign'
        actionTitle='Cancel'
      >
        <AddCampaign
          user={user}
          campaignFormData={campaignFormData}
          formErrors={formErrors}
          campaignChange={campaignChange}
          addCampaign={addCampaign}
          isLoading={isLoading}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    campaignFormData: state.campaign.campaignFormData,
    formErrors: state.campaign.formErrors,

    isLoading: state.campaign.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Add);
