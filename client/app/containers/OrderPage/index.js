/**
 *
 * OrderPage
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import OrderDetails from '../../components/Manager/OrderDetails';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { withRouter } from '@/withRouter';
import { useNavigate } from 'react-router-dom';

class OrderPageContainer extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
    this.props.fetchAllMyProduct();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const {
      navigate,
      order,
      user,
      isLoading,
      cancelOrder,
      updateOrderItemStatus,

      all_currency,
      products,
      onAddProducts,
      deleteOrderCartItems,
      makePaymentUnpaidOrder,
      orderIsLoading,
    } = this.props;

    return (
      <div className='order-page margin-top-compact pd-default'>
        {isLoading ? (
          <LoadingIndicator backdrop />
        ) : order._id ? (
          <OrderDetails
            order={order}
            user={user}
            cancelOrder={cancelOrder}
            updateOrderItemStatus={updateOrderItemStatus}
            all_currency={all_currency}
            products={products}
            onAddProducts={(v, orderId, cartId) => onAddProducts(v, orderId, cartId)}
            deleteOrderCartItems={(cartId, productId) => deleteOrderCartItems(cartId, productId)}
            makePaymentUnpaidOrder={makePaymentUnpaidOrder}
            orderIsLoading={orderIsLoading}
            onBack={() => {
              if (window.location.toString().includes('success')) {
                navigate('/dashboard/orders');
              } else {
                navigate(-1);
              }
            }}
          />
        ) : (
          <NotFound message='No order found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
    order: state.order.order,
    isLoading: state.order.isLoading,

    all_currency: state.currency.all_currency,
    products: state.order.allMyProducts,

    orderIsLoading: state.payment.orderIsLoading,
  };
};

const OrderPage = (props) => {
  const navigate = useNavigate()
  return <OrderPageContainer navigate={navigate} {...props} />
}

export default connect(mapStateToProps, actions)(withRouter(OrderPage));
