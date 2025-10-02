/**
 *
 * OrderMeta
 *
 */

import React, { useState } from 'react';

import { Row, Col } from 'reactstrap';

import { CART_ITEM_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { ArrowBackIcon } from '../../Common/Icon';
import PaymentGateway from '../../../containers/PaymentGateway';
import { useNavigate } from 'react-router-dom';

const OrderMeta = props => {
  const { order, cancelOrder, onBack, makePaymentUnpaidOrder } = props;
  const navigate = useNavigate()
  const [isPaymentGatewayActive, setIsPaymentGatewayActive] = useState(false);

  const subTotal = order.products.reduce((sum, product) => {
    const discountedPrice = product.totalPrice - (product.totalPrice * (product.discountPrice / 100));
    return sum + discountedPrice;
  }, 0);

  const renderMetaAction = () => {
    const isNotDelivered =
      order.products.filter(i => i.status === CART_ITEM_STATUS.Delivered)
        .length < 1;

  };

  const OrderStatusAction = (orderId, orderStatus, subTotal) => {
    return (
      <div style={{ width: 'fit-content', marginBottom: '15px', marginLeft: '0px' }} className='d-flex flex-column align-items-left justify-content-left p-2'>
        <Button
          variant='primary'
          id='CancelOrderItemPopover'
          size='sm'
          text={orderStatus === 'false' && 'Make payment'}
          role='menuitem'
          className='cancel-order-btn'
          onClick={() => {
            setIsPaymentGatewayActive(true);
            makePaymentUnpaidOrder(orderId, subTotal);
          }}
        />
      </div>
    );
  };

  return (
    <div className='order-meta'>
      <div className='d-flex align-items-center justify-content-between mb-3 title'>
        <h2 className='mb-0 text-xl font-extrabold'>Order Details</h2>
        <Button
          variant='link'
          icon={<ArrowBackIcon />}
          size='sm'
          text='Back to orders'
          onClick={() => navigate('/dashboard/orders')}
        ></Button>
      </div>

      <div>
        {order.status === 'false' &&
          <div className='mt-2 mt-md-0 flex flex-col items-center'>
            <h2 className='font-bold font-2xl'>You can make payment for this order</h2>
            {OrderStatusAction(order._id, order.status, subTotal)}
          </div>
        }
        {isPaymentGatewayActive && <PaymentGateway />}
      </div>

      <Row>
        <Col xs='12' md='8'>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order ID</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${order._id}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Date</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${formatDate(
                order.created
              )}`}</span>
            </Col>
          </Row>

          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Status</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{`${order.products[0].status}`}</span>
            </Col>
          </Row>

        </Col>
        <Col xs='12' md='4' className='text-left text-md-right'>
          {renderMetaAction()}
        </Col>
      </Row>
    </div>
  );
};

export default OrderMeta;
