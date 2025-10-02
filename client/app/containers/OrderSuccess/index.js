/*
 *
 * OrderSuccess
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { withRouter } from '@/withRouter';

class OrderSuccess extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const { order, isLoading } = this.props;

    return (
      <div className='order-success margin-top-compact'>
        {isLoading ? (
          <LoadingIndicator />
        ) : order._id ? (
          <div className='order-message'>
            <h2 className='text-xl'>Thank you for your order!</h2>
            <p>
              Order{' '}
              <Link
                to={{
                  pathname: `/order/${order._id}`,
                  state: { prevPath: location.pathname }
                }}
                // to={`/order/${order._id}?success`}
                className='order-label'
              >
                #{order._id}
              </Link>{' '}
              is complete.
            </p>
            <p>A confirmation email will be sent to you shortly. Please check your inbox</p>
            <p>if you don't see it, be sure to check your spam or junk folder as well.</p>
            <div className='order-success-actions'>
              <Link to='/dashboard/orders' className='btn-link'>
                Manage Orders
              </Link>
              <Link to='/shop' className='btn-link shopping-btn'>
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <NotFound message='No order found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order,
    isLoading: state.order.isLoading
  };
};

export default connect(mapStateToProps, actions)(withRouter(OrderSuccess));
