import React, { useState } from 'react';
import { Col } from 'reactstrap';


const OrderSummary = props => {
  const { order, all_currency } = props;

  const subTotal = order.products.reduce((sum, product) => {
    const discountedPrice = product.totalPrice - (product.totalPrice * (product.discountPrice / 100));
    return sum + discountedPrice;
  }, 0);
  const total = subTotal.toLocaleString();

  return (
    <Col className='order-summary pt-3'>
      <h2 className='text-xl font-extrabold'>Order Summary</h2>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Subtotal: </p>
        <p className='summary-value ml-auto'>{all_currency[order.currency]}{(subTotal).toLocaleString()}</p>
      </div>

      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Shipping & Handling: </p>
        <p className='summary-value ml-auto'>{all_currency[order.currency]}0</p>
      </div>

      <hr />
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Total: </p>
        <p className='summary-value ml-auto'>{all_currency[order.currency]}{total}</p>
      </div>
    </Col>
  );
};

export default OrderSummary;
