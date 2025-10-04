/**
 *
 * OrderSummary
 *
 */

import React from 'react';
import DropdownConfirm from '../../Common/DropdownConfirm';
import Button from '../../Common/Button';

import { Col } from 'reactstrap';
import { ROLES } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const AdminOrderSummary = props => {
  const { order, all_currency, user, updateOrderItemStatus } = props;
  const navigate = useNavigate()
  const subTotal = order.products.reduce((sum, product) => {
    const discountedPrice = product.totalPrice - (product.totalPrice * (product.discountPrice / 100));
    return sum + discountedPrice;
  }, 0);
  // const total = (subTotal + Math.round(order.paymentFees / 100)).toLocaleString()
  const total = subTotal.toLocaleString()

  const renderSecondItemsAction = orderId => {
    const isAdmin = user.role === ROLES.Admin;
    if (isAdmin) {
      return (
        <DropdownConfirm label='Delete Order'>
          <div className='d-flex flex-column align-items-center justify-content-center p-2'>
            {order.status === 'true' ? 
                (<p className='text-center mb-2'>{`This order has been paid, deleting this order would mean a refund should be processed.`}</p>)
            :
            (
                <p className='text-center mb-2'>{`Are you sure you want to Delete this order.`}</p>
            )
            }
            <Button
              variant='danger'
              id='CancelOrderItemPopover'
              size='sm'
              text='Confirm Delete'
              role='menuitem'
              className='cancel-order-btn'
              onClick={() => updateOrderItemStatus(orderId, 'delete', navigate)}
            />
          </div>
        </DropdownConfirm>
      );
    }
  };

  const OrderStatusAction = (orderId, orderStatus) => {
    const isAdmin = user.role === ROLES.Admin;
    if (isAdmin) {
        if (orderStatus === 'true') {
            return (
                <DropdownConfirm label={orderStatus === 'true' && 'paid'}>
                  <div className='d-flex flex-column align-items-center justify-content-center p-2'>
                    <p className='text-center mb-2'>{`This order has been paid, no action needed`}</p>
                  </div>
                </DropdownConfirm>
              );
        } else {
        return (
            <DropdownConfirm label={orderStatus === 'false' && 'unpaid'}>
            <div className='d-flex flex-column align-items-center justify-content-center p-2'>
                <p className='text-center mb-2'>{`Changing this order to paid would mean you have confirmed the payment has been successful`}</p>
                <Button
                variant='danger'
                id='CancelOrderItemPopover'
                  size='sm'
                text='Mark order as paid'
                  role='menuitem'
                className='cancel-order-btn'
                onClick={() => updateOrderItemStatus(orderId, 'paid')}
                />
            </div>
            </DropdownConfirm>
        );
        }
    }
  };

  return (
    <Col className='order-summary pt-3'>
      <h2 className='text-2xl font-extrabold'>Order Summary</h2>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Subtotal: </p>
        <p className='summary-value ml-auto'>{all_currency[order.currency]}{(subTotal).toLocaleString()}</p>
      </div>
      {/*<div className='d-flex align-items-center summary-item'>
      <p className='summary-label'>Service Charge: </p>
      <p className='summary-value ml-auto'>{all_currency[order.currency]}{(Math.round(order.paymentFees / 100)).toLocaleString()}</p>
      </div>*/}

      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Shipping & Handling: </p>
        <p className='summary-value ml-auto'>{all_currency[order.currency]}0</p>
      </div>

      <hr />
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Total: </p>
        <p className='summary-value ml-auto'>{all_currency[order.currency]}{total}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', paddingBottom: '10px' }}>

        <div className='text-right mt-2 mt-md-0'>
            {OrderStatusAction(order._id, order.status)}
        </div>
        <div className='text-right mt-2 mt-md-0'>
            {renderSecondItemsAction(order._id)}
        </div>
    </div>
    </Col>

  );
};

export default AdminOrderSummary;
