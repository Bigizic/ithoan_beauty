import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { formatDate } from '../../../utils/date';

// Ongoing/Delivered Component
const OngoingOrders = ({ orders, all_currency }) => {
  const ordersLength = orders.length;
  return (
    <div className='order-list'>
      {ordersLength > 0 ?
        (
          orders.map((order, index) => (
            <OrderItem key={index} order={order} all_currency={all_currency} />
          ))
        )
        :
        (
          <div className='emptyOrders' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
            <p>Empty</p>
            <Link to='/shop'><Button>Start Shopping</Button></Link>
          </div>
        )

      }
    </div>
  );
};

// Cancelled Component
const CancelledOrders = ({ orders, all_currency }) => {
  const ordersLength = orders.length;
  return (
    <div className='order-list'>
      {ordersLength > 0 ?
        (
          orders.map((order, index) => (
            <OrderItem key={index} order={order} all_currency={all_currency} />
          ))
        )
        :
        (
          <div className='emptyOrders' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
            <p>Empty</p>
            <Link to='/shop'><Button>Start Shopping</Button></Link>
          </div>
        )

      }
    </div>
  );
};

// Order Item Component
const OrderItem = ({ order, all_currency }) => {
  const navigate = useNavigate()
  const renderFirstItem = () => {
    const product = order.products?.[0]?.product;
    return (
      <img
        className='item-image'
        src={product?.imageUrl || '/images/placeholder-image.png'}
        alt='product'
      />
    );
  };

  return (
    <div className='order-box'>
      <Link to={`/order/${order._id}`} className='d-block box-link' onClick={() => navigate(`/order/${order._id}`)}>
        <div className='d-flex flex-column flex-lg-row mb-3'>
          <div className='order-first-item p-lg-3'>{renderFirstItem()}</div>
          <div className='d-flex flex-column flex-xl-row justify-content-between flex-1 ml-lg-2 mr-xl-4 p-3'>
            <div className='order-details'>

              <div className='mb-1'>
                <b>Order # </b>
                <span className='order-label'>{order._id}</span>
              </div>
              <div className='mb-1'>
                <b>Ordered on: </b>
                <span className='order-label'>{formatDate(order.created)}</span>
              </div>

              <div className='mb-1'>
                <b>Status: </b>
                <span className={`order-label ${order.products[0].status}`}>
                  {order.products[0].status}
                </span>
              </div>


            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Main Order List Component
const OrderList = ({ orders, all_currency }) => {
  const [activeTab, setActiveTab] = useState('ongoing');

  // Group orders into two categories
  const groupedOrders = [
    orders.filter(order => order.status === 'true' && order.products[0].status !== 'Cancelled'), // Ongoing/Delivered
    orders.filter(order => order.status === 'false' || order.products[0].status === 'Cancelled'),
  ];

  return (
    <div className='order-list-container'>
      {/* Tabs */}
      <div style={{ margin: '20px auto', display: 'flex', gap: '20px' }} className='tabs'>
        <button
          className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          ONGOING/DELIVERED ({groupedOrders[0].length})
        </button>
        <button
          className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          CANCELLED/NOT SUCESSFUL ({groupedOrders[1].length})
        </button>
      </div>

      {/* Render Components Based on Active Tab */}
      {activeTab === 'ongoing' ? (
        <OngoingOrders orders={groupedOrders[0]} all_currency={all_currency} />
      ) : (
        <CancelledOrders orders={groupedOrders[1]} all_currency={all_currency} />
      )}
    </div>
  );
};

export default OrderList;
