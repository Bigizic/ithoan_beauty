/**
 *
 * OrderMeta
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

const OrderAddress = props => {
  const { order } = props;

  return (
    <div className='order-meta my-4'>
      <h2 className='mb-0 text-xl font-extrabold'>Shipping Address</h2>
      <Row>
        <Col xs='12' md='8'>
          <p className='one-line-ellipsis'>{order.user && order.user}</p>
          <p className='one-line-ellipsis'>{order.selectedAddress.address && order.selectedAddress.address} {order.selectedAddress.city && order.selectedAddress.city}</p>
          <p className='one-line-ellipsis'>{order.selectedAddress.state && order.selectedAddress.state} {order.selectedAddress.country && order.selectedAddress.country}</p>
          <p className='one-line-ellipsis'>{order.phoneNumber && order.phoneNumber}</p>
        </Col>
      </Row>
    </div>
  );
};

export default OrderAddress;
