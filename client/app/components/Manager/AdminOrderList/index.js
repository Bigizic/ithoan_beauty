import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/date';

import Button from '../../Common/Button';

import { RefreshIcon } from '../../Common/Icon';
import { DropdownItem } from 'reactstrap';
import DropdownConfirm from '../../Common/DropdownConfirm';
import { DateRangePickerComponent } from '../../Common/DatePicker'
import moment from 'moment';

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'unpaid':
      return 'badge-danger';

    case 'Shipped':
      return 'badge-success';

    case 'Confirmed':
      return 'badge-info';

    case 'pending':
      return 'badge-warning';

    case 'Processing':
      return 'badge-info';

    case 'Not_processed':
      return 'badge-warning';

    case 'completed':
      return 'badge-info';
      
    case 'Cancelled':
      return 'badge-danger';
    default:
      return 'badge-secondary';
  }
};

/**
 * renders ongoing / delivered component
 * @param {orders} param0  - orders from db
 * @param {all_currency} - all currencies form reducer
 * @returns 
 */
const OrderComponent = ({ orders, all_currency }) => {
  if (orders.length === 0) {
    return (
      <div
        className="emptyOrders"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        <p>empty</p>
      </div>
    );
  }

  return (
    <div className="order-list overflow-x-scroll">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>order #</th>
            <th>name/email</th>
            <th>date</th>
            <th>amount</th>
            <th>order status</th>
            <th>payment status</th>
            <th>payment channel</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <OrderItem
              key={order._id}
              order={order}
              all_currency={all_currency}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};




/**
 * redners advanced filter component, i.e the date range, payment status, order status
 * @param {applyFilter} param0 
 * @param {selecetedFilters} param1 - handles selected filters like
 * @returns 
 */

export const AdvanceFilters = ({ applyFilter, selectedFilters }) => {
  const filters = [
    { label: 'Date Range', options: ['Today', 'Yesterday', 'This Week', 'This Month'] },
    { label: 'Payment Status', options: ['Paid', 'Not Paid'] },
    { label: 'Order Status', options: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);


  const handleSelect = (filterLabel, option) => {
    // Create a copy of the current selectedOptions state
    const updatedOptions = [...selectedOptions];

    // Find the current filter that matches the filterLabel, if it exists
    let existingFilter = updatedOptions.find(filter => {
      return (
        (filter.paymentStatus && filter.paymentStatus !== null) ||
        (filter.date && filter.date !== null) ||
        (filter.orderStatus && filter.orderStatus !== null)
      );
    });

    // If no filter exists, initialize a new filter object
    if (!existingFilter) {
      existingFilter = { date: null, paymentStatus: null, orderStatus: null };
      updatedOptions.push(existingFilter); // Add the new filter to the array
    }

    // Update the relevant field based on the filterLabel
    if (filterLabel === 'Payment Status') {
      existingFilter.paymentStatus = option;
    } else if (filterLabel === 'Date Range') {
      existingFilter.date = option;
    } else if (filterLabel === 'Order Status') {
      existingFilter.orderStatus = option;
    }

    // Update the selected options state and apply the filter
    setSelectedOptions(updatedOptions);
    applyFilter(filterLabel, option, updatedOptions);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    if (startDate && endDate) {
      const startFormatted = startDate.toISOString();
      const endFormatted = endDate.toISOString();

      // Pass the formatted date range to handleSelect
      handleSelect('Date Range', { startDate: startFormatted, endDate: endFormatted });
    }
  };


  return (
    <div className='advanced-filters mt-3'>
      <div style={{ alignContent: 'center' }}>
        <Button
          icon={<RefreshIcon />}
          text={'Clear Filters'}
          size='sm'
          onClick={() => window.location.reload()}
        //onClick={() => setShowMore(true)}
        />
      </div>
      {filters.map((filter, index) => (
        <div key={index}>
          <DropdownConfirm label={selectedFilters[filter.label] || filter.label}>
            {filter.label === 'Date Range' ? (
              <div style={{ minWidth: '310px' }}>
                <DateRangePickerComponent onDateChange={handleDateRangeChange} />
                {filter.options.map((option, i) => (
                  <DropdownItem key={i} onClick={() => handleSelect(filter.label, option)}>
                    {option}
                  </DropdownItem>
                ))}
              </div>
            ) : (
              <div>
                {filter.options.map((option, i) => (
                  <DropdownItem key={i} onClick={() => handleSelect(filter.label, option)}>
                    {option}
                  </DropdownItem>
                ))}
              </div>
            )}
          </DropdownConfirm>
        </div>
      ))}
    </div>
  );
};




/**
 * order item componnet
 * @param {order} param0  orders from db
 * @param {all_curreny} param1 - all currency from reducers
 * @returns 
 */
const OrderItem = ({ order, all_currency, index }) => {
  const navigate = useNavigate()
  const subTotal = order.products.reduce((sum, product) => {
    const discountedPrice =
      product.totalPrice - product.totalPrice * (product.discountPrice / 100);
    return sum + discountedPrice;
  }, 0);
  const total = subTotal.toLocaleString();

  return (
    <tr className='cursor-pointer' onClick={() => navigate(`/order/${order._id}`)}>
      <td>
        <Link to={`/order/${order._id}`}>{order._id}</Link>
      </td>
      <td>{order.user}</td>
      <td>{formatDate(order.created)}</td>
      <td>{total}</td>
      <td>
        <span
          className={`badge ${getStatusBadgeClass(order.products[0].status.replace(
            ' ',
            '_'
          ))}`}
        >
          {order.products[0].status}
        </span>
      </td>
      <td>{order.status === 'true' ? 'paid' : 'not paid'}</td>
      <td>{order.paymentType}</td>
      <td>
        <Link to={`/order/${order._id}`} className="btn btn-sm btn-secondary">
          view
        </Link>
      </td>
    </tr>
  );
};






/**
 *  Handles Admin order list
 * @param {orders} param0  orders from db
 * @param {all_currency} param1 all_currency from reducer
 * @param {advancedFilters} param2 - advanced filters from reducers
 * @returns 
 */
// Main Order List Component
const AdminOrderList = ({ orders, all_currency, advancedFilters }) => {
  const [activeTab, setActiveTab] = useState('paid');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [showMore, setShowMore] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});

  // Group orders into 7 categories
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);
  const groupedOrders = [
    filteredOrders.filter(order => order.status === 'true'), // Ongoing/Delivered
    filteredOrders.filter(order => order.status === 'false'), // not paid
    filteredOrders.filter(order => order.products[0].status === 'Not processed'),
    filteredOrders.filter(order => order.products[0].status === 'Processing'),
    filteredOrders.filter(order => order.products[0].status === 'Shipped'),
    filteredOrders.filter(order => order.products[0].status === 'Delivered'),
    filteredOrders.filter(order => order.products[0].status === 'Cancelled'),
  ];


  /**
   * 
   * @param {*} filterType - can be Date Range, Payment Status, Order status
   * @param {*} op The name of the filter type selected || can be shipping for order status
   *               can be today for date range || and can be not paid for payment status

   * @param {*} option object in this format
   *                   [{
                          date: today || last week || yesterday, date-range
                          orderStatus: shipped || delivered || not processed || processing,
                          paymentStatus: paid || not paid
                        }]
   * @returns
   */
  const applyFilter = (filterType, op, option) => {
    if (filterType === 'Date Range') {
      const { startDate, endDate } = op
      let render = null;
      if (startDate && endDate) {
        render = <span>{moment(startDate).format('YYYY-MM-DD')} - {moment(endDate).format('YYYY-MM-DD')}</span>
      }
      if (op === 'Today') {
        const startOfDay = moment().startOf('day');
        const endOfDay = moment().endOf('day');
        render = <span>{moment(startOfDay).format('YYYY-MM-DD')} - {moment(endOfDay).format('YYYY-MM-DD')}</span>
      }
      if (op === 'Yesterday') {
        const startOfYesterday = moment().subtract(1, 'days').startOf('day');
        const endOfYesterday = moment().subtract(1, 'days').endOf('day');
        render = <span>{moment(startOfYesterday).format('YYYY-MM-DD')} - {moment(endOfYesterday).format('YYYY-MM-DD')}</span>
      }
      if (op === 'This Week') {
        const startOfWeek = moment().startOf('week');
        const endOfWeek = moment().endOf('week');
        render = <span>{moment(startOfWeek).format('YYYY-MM-DD')} - {moment(endOfWeek).format('YYYY-MM-DD')}</span>
      }
      if (op === 'This Month') {
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        render = <span>{moment(startOfMonth).format('YYYY-MM-DD')} - {moment(endOfMonth).format('YYYY-MM-DD')}</span>
      }
      setSelectedFilters(prev => ({ ...prev, [filterType]: render }));
    } else {
      setSelectedFilters(prev => ({ ...prev, [filterType]: op }));
    }

    // example of option
    /*
      [
        {
          date: today || last week || yesterday,
          orderStatus: shipped || delivered || not processed || processing,
          paymentStatus: paid || not paid
        }
      ]
    */

    /**
     * - returns a date range
     * @param {*} parsedOrder  - orders already parsed
     * @param {*} dates - date from option
     * @returns 
     */
    const fetchDate = (dates) => {
      let startDate, endDate = null;

      if (dates.startDate && dates.endDate) {  // first parsing for date with startDate and endDate
        startDate = moment(dates.startDate);
        endDate = moment(dates.endDate);
      }

      if (dates === 'Today') {  // second parsing for Today date
        startDate = moment().startOf('day');
        endDate = moment().endOf('day');
      }

      if (dates === 'Yesterday') {  // third parsing for Yesterday date
        startDate = moment().subtract(1, 'days').startOf('day');
        endDate = moment().subtract(1, 'days').endOf('day');
      }

      if (dates === 'This Week') {
        startDate = moment().startOf('week');
        endDate = moment().endOf('week');
      }

      if (option[0].date === 'This Month') {
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
      }
      return [startDate, endDate]
    }


    /**
     * 
     * @param {*} date 
     * @param {*} paymentStatus 
     * @param {*} orderStatus 
     * @returns 
     */
    const optionHelper = (date, paymentStatus, orderStatus) => {
      const newDate = date && fetchDate(date);
      const payStatus = paymentStatus && option[0].paymentStatus === 'Paid' ? 'true' : 'false'
      let filteredOptions = null;

      // date alone
      if (date && !paymentStatus && !orderStatus) {
        filteredOptions = orders.filter(order => {
          const orderDate = moment(order.created);
          return orderDate.isBetween(newDate[0], newDate[1], null, '[]');
        });
        return filteredOptions
      }

      // paymentStatus alone
      if (!date && paymentStatus && !orderStatus) {
        filteredOptions = orders.filter(order => {
          return order.status === payStatus
        });
        return filteredOptions
      }

      // orderStatus alone
      if (!date && !paymentStatus && orderStatus) {
        filteredOptions = orders.filter(order => {
          return order.products[0].status === orderStatus
        });
        return filteredOptions
      }

      // order and payment and date
      if (orderStatus && paymentStatus && date) {
        const tempFilteredOrders = orders.filter(order => {
          return order.status === payStatus && order.products[0].status === orderStatus
        });
        filteredOptions = tempFilteredOrders.filter(order => {
          const orderDate = moment(order.created);
          return orderDate.isBetween(newDate[0], newDate[1], null, '[]');
        });
        return filteredOptions
      }

      // order and payment
      if (orderStatus && paymentStatus) {
        filteredOptions = orders.filter(order => {
          return order.status === payStatus && order.products[0].status === orderStatus
        });
        return filteredOptions
      }

      // date and order
      if (date && orderStatus) {
        filteredOptions = orders.filter(order => {
          const orderDate = moment(order.created);
          return order.products[0].status === orderStatus && orderDate.isBetween(newDate[0], newDate[1], null, '[]');
        });
        return filteredOptions
      }

      // payment and date
      if (paymentStatus && date) {
        filteredOptions = orders.filter(order => {
          const orderDate = moment(order.created);
          return order.status === payStatus && orderDate.isBetween(newDate[0], newDate[1], null, '[]');
        });
        return filteredOptions
      }

    }


    // SECTIONS


    // Paid Not Paid Section
    if (filterType === 'Payment Status') {
      const newOption = optionHelper(option[0].date, option[0].paymentStatus, option[0].orderStatus);
      const payStatus = option[0].paymentStatus === 'Paid' ? 'true' : 'false'
      setFilteredOrders(newOption);
      payStatus === 'true' ? setActiveTab('paid') : setActiveTab('notPaid')
    }


    // Date Range Section
    if (filterType === 'Date Range') {
      const newOption = optionHelper(option[0].date, option[0].paymentStatus, option[0].orderStatus)
      setFilteredOrders(newOption);
      setActiveTab('date')
    }


    // Order Status Section
    if (filterType === 'Order Status') {
      const newOption = optionHelper(option[0].date, option[0].paymentStatus, option[0].orderStatus)
      const optionOrder = option[0].orderStatus
      setFilteredOrders(newOption);

      if (optionOrder === 'Cancelled') {
        setActiveTab('cancelled')
        return;

      } else if (optionOrder === 'Delivered') {
        setActiveTab('Delivered')
        return;

      } else if (optionOrder === 'Shipped') {
        setActiveTab('Shipped');
        return;

      } else if (optionOrder === 'Processing') {
        setActiveTab('Processing')
        return;

      } else if (optionOrder === 'Not processed') {
        setActiveTab('Not Processed')
        return;
      }
    }
    setShowMore(false);
  };



  return (
    <div className='order-list-container'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        <div>
          <AdvanceFilters applyFilter={applyFilter} selectedFilters={selectedFilters} />
        </div>

      </div>
      {/* Tabs */}
      {showMore &&
        <div>
          <div style={{ marginTop: '15px' }}>
            <Button
              variant='secondary'
              text={showAdvanced === true ? 'Hide Advanced Tabs' : 'Show Advanced Tabs'}
              onClick={() => setShowAdvanced(!showAdvanced)}
            />
          </div>
          <div style={{ margin: '20px auto', display: 'flex', gap: '20px', flexWrap: 'wrap' }} className='tabs'>
            <button
              className={`tab ${activeTab === 'paid' ? 'active' : ''}`}
              onClick={() => setActiveTab('paid')}
            >
              PAID ORDERS ({groupedOrders[0].length})
            </button>


            <button
              className={`tab ${activeTab === 'notPaid' ? 'active' : ''}`}
              onClick={() => setActiveTab('notPaid')}
            >
              NOT PAID ({groupedOrders[1].length})
            </button>

            {showAdvanced &&
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <button
                  className={`tab ${activeTab === 'Not Processed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Not Processed')}
                >
                  NOT PROCESSED ({groupedOrders[2].length})
                </button>

                <button
                  className={`tab ${activeTab === 'Processing' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Processing')}
                >
                  PROCESSING ({groupedOrders[3].length})
                </button>


                <button
                  className={`tab ${activeTab === 'Shipped' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Shipped')}
                >
                  SHIPPED ({groupedOrders[4].length})
                </button>


                <button
                  className={`tab ${activeTab === 'Delivered' ? 'active' : ''}`}
                  onClick={() => setActiveTab('Delivered')}
                >
                  DELIVERED ({groupedOrders[5].length})
                </button>

                <button
                  className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cancelled')}
                >
                  CANCELLED ({groupedOrders[6].length})
                </button>
              </div>
            }


          </div>
        </div>
      }


      {/* Render Components Based on Active Tab */}
      {activeTab === 'paid' && (
        <OrderComponent orders={groupedOrders[0]} all_currency={all_currency} />
      )}
      {activeTab === 'notPaid' && (
        <OrderComponent orders={groupedOrders[1]} all_currency={all_currency} />
      )}
      {activeTab === 'Not Processed' && (
        <OrderComponent orders={groupedOrders[2]} all_currency={all_currency} />
      )}
      {activeTab === 'Processing' && (
        <OrderComponent orders={groupedOrders[3]} all_currency={all_currency} />
      )}
      {activeTab === 'Shipped' && (
        <OrderComponent orders={groupedOrders[4]} all_currency={all_currency} />
      )}
      {activeTab === 'Delivered' && (
        <OrderComponent orders={groupedOrders[5]} all_currency={all_currency} />
      )}
      {activeTab === 'cancelled' && (
        <OrderComponent orders={groupedOrders[6]} all_currency={all_currency} />
      )}
      {activeTab === 'date' && (
        (
          (filteredOrders.length) > 0 ?
            (
              <OrderComponent orders={filteredOrders} all_currency={all_currency} />

            )
            :
            (<p style={{ marginTop: '10%', fontSize: '20px', textAlign: 'center' }}>No record</p>)
        )
      )}


    </div>
  );
};

export default AdminOrderList;
