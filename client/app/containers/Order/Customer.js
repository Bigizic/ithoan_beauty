/*
 *
 * Customer
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import { ROLES } from '../../constants';
import SubPage from '../../components/Manager/SubPage';
import AdminOrderList from '../../components/Manager/AdminOrderList';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import SearchResultMeta from '../../components/Manager/SearchResultMeta';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Pagination from '../../components/Common/Pagination';


class Customer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleOrderSearch = e => {
    if (e.value.length >= 2) {
      this.props.searchOrders({ name: 'order', value: e.value });
      this.setState({
        search: e.value
      });
    } else {
      this.setState({
        search: ''
      });
    }
  };

  handleOnPagination = (n, v) => {
    this.props.fetchOrders(v);
  };

  render() {
    const {
      user,
      orders,
      isLoading,
      searchedOrders,
      advancedFilters,
      searchOrders,

      all_currency,
    } = this.props;
    const { currentPage } = advancedFilters;
    const { search } = this.state;
    const isSearch = search.length > 0;
    const filteredOrders = search ? orders.filter(o => o._id.includes(search)) : orders;
    const displayPagination = advancedFilters.totalPages > 1;
    const displayOrders = filteredOrders && filteredOrders.length > 0;


    return (
      <div className='order-dashboard'>
        <SubPage
          title='Customer Orders'
          actionTitle='My Orders'
          handleAction={() =>
            user.role === ROLES.Admin && '/dashboard/orders'
          }
        >
          {user.role === ROLES.Admin ?
            (
              <div style={{ display: 'flex', gap: '30px', marginBottom: '20px', marginTop: '0px' }}>
                <div style={{ textAlign: 'center', background: 'lightgreen', padding: '10px 10px', borderRadius: '5px' }}>{advancedFilters.count} Total Orders</div>
                <div style={{ textAlign: 'center', background: 'lightgreen', padding: '10px 10px', borderRadius: '5px' }}>{advancedFilters.paidCount} Paid Orders</div>
                <div style={{ textAlign: 'center', background: 'lightgreen', padding: '10px 10px', borderRadius: '5px' }}>{advancedFilters.count - advancedFilters.paidCount} Unpaid Orders</div>
              </div>
            )
            :
            (
              ''
            )}
          <OrderSearch
            onBlur={this.handleOrderSearch}
            onSearch={this.handleOrderSearch}
            onSearchSubmit={this.handleOrderSearch}
          />
          {isLoading && <LoadingIndicator />}
          {displayOrders && (
            <>
              {!isSearch && displayPagination && (
                <Pagination
                  totalPages={advancedFilters.totalPages}
                  onPagination={this.handleOnPagination}
                  currentPage={currentPage}
                />
              )}

              {user.role === ROLES.Admin ?
                (
                  <AdminOrderList
                    orders={filteredOrders}
                    all_currency={all_currency}
                    advancedFilters={advancedFilters}
                  />
                )
                :
                (
                  <OrderList
                    orders={filteredOrders}
                    all_currency={all_currency}
                  />
                )
              }

              {!isSearch && displayPagination && user.role === ROLES.Admin &&(
                <Pagination
                  totalPages={advancedFilters.totalPages}
                  onPagination={this.handleOnPagination}
                  currentPage={currentPage}
                />
              )}
            </>
          )}
          {!isLoading && !displayOrders && (
            <NotFound message='No orders found.' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    orders: state.order.orders,
    searchedOrders: state.order.searchedOrders,
    isLoading: state.order.isLoading,
    advancedFilters: state.order.advancedFilters,
    isOrderAddOpen: state.order.isOrderAddOpen,

    all_currency: state.currency.all_currency,
  };
};

export default connect(mapStateToProps, actions)(Customer);
