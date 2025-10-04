/*
 *
 * Banner list
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import BannerList from '../../components/Manager/BannerList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Bannerlist extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBanners();
  }

  render() {
    const { history, banners, isLoading, updateBannerlist, deleteBanner } = this.props;

    return (
      <>
        <SubPage
          title='Banners'
          actionTitle='Add'
          handleAction={'/dashboard/banner/add'}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : banners.length > 0 ? (
            <BannerList banners={banners} updateBannerlist={updateBannerlist} deleteBanner={deleteBanner} />
          ) : (
            <NotFound message='No Banners found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    banners: state.banner.banners,
    isLoading: state.banner.isLoading
  };
};

export default connect(mapStateToProps, actions)(Bannerlist);
