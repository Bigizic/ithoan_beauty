import React from 'react';
import { connect } from 'react-redux';

import actions from '../../../actions';

import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import UpdateShippingInfo from './updateShippingInfo';

class AdminOrderAddress extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAllMyProduct();
    this.props.setOrderShippingInformation();
  }


  downloadReceipt = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  };

  render() {
    const { order, updateOrderShippingInformation, orderShippingInfo, isLoading, updateShippingInformation } = this.props;
    const subTotal = order.products.reduce((sum, product) => {
      const discountedPrice = product.totalPrice - (product.totalPrice * (product.discountPrice / 100));
      return sum + discountedPrice;
    }, 0);
    const total = subTotal.toLocaleString();

    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '30px', flexWrap: 'wrap' }} className="order-meta">
        <div className='w-full'>
          <h2 className="text-2xl w-full my-4 font-extrabold">Shipping Address</h2>
          <p>{order.user && order.user}</p>
          <p>{order.userEmail && order.userEmail}</p>
          <p>{order.selectedAddress && order.selectedAddress.address} {order.selectedAddress && order.selectedAddress.city}</p>
          <p>{order.selectedAddress && order.selectedAddress.state} {order.selectedAddress && order.selectedAddress.country}</p>
          <p>{order.phoneNumber && order.phoneNumber}</p>
          <div>
            <h2 className="my-2 text-lg font-bold">Dispatch Details</h2>
            <p>{order.deliveryType}</p>
          </div>

          <UpdateShippingInfo updateShippingInformation={updateShippingInformation} isLoading={isLoading} order={orderShippingInfo} updateOrderShippingInformation={updateOrderShippingInformation}/>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mb-3">Payment Details</h2>
          <p><b>Amount: </b> {order.currency && (order.currency).toUpperCase()} {total}</p>
          <p><b>Payment channel: </b> {order.paymentType ? order.paymentType : 'None'}</p>
          <p><b>Payment Status: </b> {order.status === 'true' ? 'Paid' : 'Not Paid'}</p>
          <p><b>Paid on: </b> {formatDate(order.created)}</p>
          <p><b>Currency: </b> {order.currency &&(order.currency).toUpperCase()}</p>
          <p><b>Note:</b> {order.note !== 'null' ? order.note : '"customer did not leave a note"'} </p>
        </div>

        <div>
          {/*<h2 className="mb-0">Payment Receipt</h2>*/}
          <div className="admin_order_receipts">
            {order.receipts && order.receipts.map((item, index) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} key={index}>
                <img src={item} alt={`Receipt ${index + 1}`} height={140} width={140} />
                <Button text="Download Receipt" size="sm" onClick={() => this.downloadReceipt(item)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
    orderShippingInfo: state.shipping.orderShippingInfo,
    isLoading: state.shipping.isLoading,
  };
};

export default connect(mapStateToProps, actions)(AdminOrderAddress);
