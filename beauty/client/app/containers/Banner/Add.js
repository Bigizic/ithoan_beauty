/*
 *
 * Add banner
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddBanner from '../../components/Manager/AddBanner';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
  render() {
    const {
      history,
      bannerFormData,
      formErrors,
      bannerChange,
      addBanner,
      isLoading
    } = this.props;

    return (
      <SubPage
        title='Add Banner'
        actionTitle='Cancel'
      >
        <AddBanner
          bannerFormData={bannerFormData}
          formErrors={formErrors}
          bannerChange={bannerChange}
          addBanner={addBanner}
          isLoading={isLoading}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    bannerFormData: state.banner.bannerFormData,
    formErrors: state.banner.formErrors,
    isLoading: state.banner.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Add);
