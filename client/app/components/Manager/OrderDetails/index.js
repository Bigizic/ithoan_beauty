/**
 *
 * OrderDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import OrderMeta from '../OrderMeta';
import OrderItems from '../OrderItems';
import OrderSummary from '../OrderSummary';
import OrderAddress from '../OrderAddress';

import AdminOrderAddress from '../AdminOrderAddress';
import AdminOrderItems from '../AdminOrderItems';
import AdminOrderSummary from '../AdminOrderSummary';
import AdminOrderMeta from '../AdminOrderMeta';

import { ROLES } from '../../../constants';

const OrderDetails = props => {
  const {
    order, user,
    cancelOrder, updateOrderItemStatus,
    onBack, all_currency,
    onAddProducts, deleteOrderCartItems,
    products, makePaymentUnpaidOrder,
    orderIsLoading,} = props;
  if (user.role === ROLES.Admin) {
    return (
      <div className='order-details'>
        <Row>
          <Col xs='12' md='12'>
            <AdminOrderMeta order={order} cancelOrder={cancelOrder} all_currency={all_currency} onBack={onBack} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xs='12' md='12'>
            <AdminOrderAddress order={order}/>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xs='12' lg='8'>
            <AdminOrderItems
              order={order}
              user={user}
              updateOrderItemStatus={updateOrderItemStatus}
              all_currency={all_currency}
              products={products}
              onAddProducts={(v, orderId, cartId) => onAddProducts(v, orderId, cartId)}
              deleteOrderCartItems={(cartId, productId) => deleteOrderCartItems(cartId, productId)}
            />
          </Col>
          <Col xs='12' lg='4' className='mt-5 mt-lg-0'>
            <AdminOrderSummary
            order={order}
            all_currency={all_currency}
            user={user}
            updateOrderItemStatus={updateOrderItemStatus}
            />
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className='order-details'>
        <Row>
          <Col xs='12' md='12'>
            <OrderMeta
              order={order}
              cancelOrder={cancelOrder}
              onBack={onBack}
              makePaymentUnpaidOrder={makePaymentUnpaidOrder} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xs='12' md='12'>
            <OrderAddress order={order}/>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xs='12' lg='8'>
            <OrderItems
              order={order}
              user={user}
              updateOrderItemStatus={updateOrderItemStatus}
              all_currency={all_currency}
            />
          </Col>
          <Col xs='12' lg='4' className='mt-5 mt-lg-0'>
            <OrderSummary
            order={order}
            all_currency={all_currency}
            orderIsLoading={orderIsLoading}
            />
          </Col>
        </Row>
      </div>
    );
  };
}

export default OrderDetails;
