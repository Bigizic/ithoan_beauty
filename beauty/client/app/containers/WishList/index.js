/*
 *
 * WishList
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import WishList from '../../components/Manager/WishList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Wishlist extends React.PureComponent {
  componentDidMount() {
    this.props.fetchWishlist();
  }

  render() {
    const { wishlist, isLoading, updateWishlist, selectCurrency, all_currency } = this.props;

    const displayWishlist = wishlist.length > 0;

    return (
      <div className='wishlist-dashboard'>
        <SubPage title={'Your Wishlist'} isMenuOpen={null}>
          {isLoading && <LoadingIndicator />}
          {displayWishlist && (
            <WishList wishlist={wishlist} updateWishlist={updateWishlist} all_currency={all_currency} selectCurrency={selectCurrency} />
          )}
          {!isLoading && !displayWishlist && (
            <NotFound message='You have no items in your wishlist yet.' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const sL = state.currency.select_currency.length;
  return {
    wishlist: state.wishlist.wishlist,
    isLoading: state.wishlist.isLoading,

    all_currency: state.currency.all_currency,
    selectCurrency: sL > 0 ? state.currency.select_currency : state.currency.default_currency,
  };
};

export default connect(mapStateToProps, actions)(Wishlist);
