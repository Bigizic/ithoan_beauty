/**
 * admin dashboard
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import { BarChart, Bar, Legend, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DropdownItem, Col } from 'reactstrap';
import DropdownConfirm from '../../components/Common/DropdownConfirm';
import { DateRangePickerComponent } from '../../components/Common/DatePicker';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import moment from 'moment';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import ToggleSwitch from '../../components/Common/ToggleButton';
import Input from '../../components/Common/Input';

class AdminDashboard extends React.PureComponent {
  componentDidMount() {
    this.props.getMaintenanceStatus();

    this.props.getSelectedOverview();
    this.props.fetchAdminOverview(null);
    this.props.fetchRecentOrders();

    this.props.fetchRecentOrders();

    this.props.setAnalyticsData();
  }

  render() {
    const {
      user,
      orders,
      recentOrders,
      boughtProducts,
      totalUsers,
      totalReviews,

      fetchAdminOverview,
      selectedOverview,
      setSelectedOverview,

      fetchAnalyticsData,
      setAnalyticsData,

      all_currency,
      selectCurrency,
      campaigns,
      websiteVisits,

      isLoading,
      handleMaintenance,

      skincareMaintenanceStatus,
      beautyMaintenanceStatus,

      skincareInputMaintenanceText,
      beautyInputMaintenanceText,

      setInputMaintenanceText,
      setMaintenanceStatus,
      websiteInfo,
      setInputWebsiteInfo,
      websiteInfoText,
      handleSetWebsiteInfo,
      websiteInfoStatus

    } = this.props;

    let sF = {};
    if (selectedOverview.dateRange.startDate && selectedOverview.dateRange.endDate) {
      sF.dateRange = `${moment(selectedOverview.dateRange.startDate).format('YYYY-MM-DD')} - ${moment(selectedOverview.dateRange.endDate).format('YYYY-MM-DD')}`;
    } else {
      sF.dateRange = selectedOverview.dateRange
    }

    const columns = [
      {
        Header: 'Order Number & Name',
        accessor: 'meta',
      },
      {
        Header: 'Date',
        accessor: 'created'
      },
      {
        Header: 'Total',
        accessor: 'total',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Discount',
        accessor: 'discount',
      },
      {
        Header: 'Payment',
        accessor: 'paymentStatus',
      },
      {
        Header: 'Channel',
        accessor: 'paymentType',
      },
      {
        Header: 'Currency',
        accessor: 'currency',
      },
    ];

    const handleSelectDate = (dateRange) => {
      if (dateRange) {
        fetchAdminOverview({ dateRange: dateRange });
        setSelectedOverview({ dateRange: dateRange });
        setAnalyticsData()
      }

    }

    const handleDateRangeChange = (startDate, endDate) => {
      if (startDate && endDate) {
        // Dispatch an action to fetch data based on date range
        fetchAdminOverview({
          dateRange: {
            startDate, endDate
          }
        });
        setSelectedOverview({
          dateRange: {
            startDate, endDate
          }
        })
        setAnalyticsData()
      }
    };


    /**
     * 
     * @param {*} props 
     * @returns 
     */
    const OrdersTable = () => {
      const data = orders || [];
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data });

      return (
        <table
          {...getTableProps()}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                style={{ backgroundColor: '#da3e8e', color: '#fff' }}
              >
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      padding: '12px',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      borderBottom: '2px solid #eaeaea',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  style={{ borderBottom: '1px solid #eaeaea', background: '#fff', color: 'black' }}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontWeight: cell.column.id === 'Name' ? 'bold' : 'normal',
                        color:
                          cell.column.id === 'Payment' && cell.value === 'Paid'
                            ? 'green'
                            : cell.column.id === 'Payment' && cell.value === 'Not Paid'
                              ? 'red'
                              : 'inherit',
                        backgroundColor:
                          cell.column.id === 'Payment' && cell.value === 'Paid'
                            ? 'rgba(144, 238, 144, 0.2)'
                            : cell.column.id === 'Payment' && cell.value === 'Not Paid'
                              ? 'rgba(255, 99, 71, 0.2)'
                              : 'transparent',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };



    /**
     * 
     * @param {*} handleDateRangeChange 
     * @returns 
     */
    const OverviewFilter = () => {
      const filters = [
        {
          label: 'Date Range',
          options: [
            'Today', 'Yesterday', 'This Week',
            'This Month', 'Last Month', 'This Year',
            'Last Year', 'All Time'
          ]
        }
      ];
      return (
        <div>
          {filters.map((filter, index) => (
            <div key={index}>
              <DropdownConfirm label={<span>{sF.dateRange}</span>}>
                {filter.label === 'Date Range'
                  ? (
                    <div style={{ minWidth: '310px' }}>
                      <DateRangePickerComponent onDateChange={handleDateRangeChange} />
                      {filter.options.map((option, i) => (
                        <DropdownItem key={i} onClick={() => handleSelectDate(option)}>
                          {option}
                        </DropdownItem>
                      ))}
                    </div>
                  )
                  : (
                    <div>
                      {filter.options.map((option, i) => (
                        <DropdownItem key={i} onClick={() => handleSelectDate(option)}>
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

    if (isLoading) {
      return (
        <div className='admin_dashboard'>
          {isLoading && <LoadingIndicator />}
        </div>
      )
    }


    return (
      <div className='admin_dashboard'>
        <div className='dashboard-left'>
          <h1 className='text-3xl mb-3'>Hello {user.firstName} {user.lastName} </h1>
          <div className='maintenance_button'>
            <ToggleSwitch
              label={"Skincare Maintenance Mode"}
              checked={skincareMaintenanceStatus}
              onChange={(v) => {
                setMaintenanceStatus('skincare', v)
                handleMaintenance()
              }}
            />
            <Input
              type={"text"}
              className={"maintenance_input_text"}
              placeholder={!skincareMaintenanceStatus && "enter skincare maintenance text" || skincareMaintenanceStatus && "Disable skincare maintenance mode to enter text"}
              disabled={skincareMaintenanceStatus}
              value={skincareInputMaintenanceText}
              onInputChange={(name, value) => {
                setInputMaintenanceText('skincare', value)
              }}
            />

            <br></br>

            <ToggleSwitch
              label={"Beauty Maintenance Mode"}
              checked={beautyMaintenanceStatus}
              onChange={(v) => {
                setMaintenanceStatus('beauty', v)
                handleMaintenance()
              }}
            />
            <Input
              type={"text"}
              className={"maintenance_input_text"}
              placeholder={!beautyMaintenanceStatus && "enter beauty maintenance text" || beautyMaintenanceStatus && "Disable beauty maintenance mode to enter text"}
              disabled={beautyMaintenanceStatus}
              value={beautyInputMaintenanceText}
              onInputChange={(name, value) => {
                setInputMaintenanceText('beauty', value)
              }}
            />
            <br></br>

            <hr style={{ width: '70%' }}></hr>
            <ToggleSwitch
              label={"Website Information"}
              checked={websiteInfoStatus}
              onChange={(v) => handleSetWebsiteInfo(v, websiteInfoText)}
            />

            <Input
              type={"text"}
              className={"maintenance_input_text"}
              placeholder={!websiteInfoStatus && "enter website information" || websiteInfoStatus && "Using default website information"}
              disabled={websiteInfoStatus}
              value={websiteInfoText}
              onInputChange={(name, value) => {
                setInputWebsiteInfo(value)
              }} />
          </div>
          <div className='business-overview'>

            <div className='flexStyle'>

              <div className='overview-cards-container ds_item'>
                <div className='overview-date-range'>
                  <div>
                    <h2>Business Overview</h2>
                    <p style={{ fontSize: '11px' }}>Showing data from {sF.dateRange}</p>
                  </div>

                  <OverviewFilter />
                </div>
                <div className='overview-cards'>

                  <div className='card pr'>
                    <div>
                      <p>{all_currency[selectCurrency]}{recentOrders && (recentOrders[0]).toLocaleString()}</p>
                      <h4>Total Est. Sales </h4>
                    </div>
                    <span className='orders-icon' />
                  </div>

                  {/*<div className='card pr'>
                    <div>
                    <p>{all_currency[selectCurrency]}{recentOrders && (recentOrders[1]).toLocaleString()}</p>
                      <h4>Est. Fees</h4>
                    </div>
                    <span className='orders-icon' />
                  </div>*/}

                  <div className='card pr'>
                    <div>
                      <p>{recentOrders && recentOrders[1] + recentOrders[2]}</p>
                      <h4>Orders </h4>
                    </div>
                    <span className='orders-icon' />
                  </div>
                  <div className='card pr'>
                    <div>
                      <p>{recentOrders[1]}</p>
                      <h4>Paid Orders </h4>
                    </div>
                    <span className='orders-icon' />
                  </div>

                  <div className='card pr'>
                    <div>
                      <p>{recentOrders[2]}</p>
                      <h4>Unpaid Orders </h4>
                    </div>
                    <span className='orders-icon' />
                  </div>

                </div>


                <div style={{ marginTop: '10px' }} className='overview-cards'>


                  <div className='card pr'>
                    <div>
                      <p>{totalUsers[1]}</p>
                      <h4>Admin</h4>
                    </div>
                    <span className='admin-icon' />
                  </div>

                  <div className='card pr'>
                    <div>
                      <p>{totalUsers[2]}</p>
                      <h4>Merchant</h4>
                    </div>
                    <span className='merchant-icon' />
                  </div>

                  <div className='card pr'>
                    <div>
                      <p>{totalUsers[0]}</p>
                      <h4>New Customers</h4>
                    </div>
                    <span className='users-icon' />
                  </div>

                  <div className='card pr'>
                    <div>
                      <p>{totalReviews}</p>
                      <h4>Reviews</h4>
                    </div>
                    <span className='reviews-icon' />
                  </div>
                </div>

                <div style={{ marginTop: '10px' }} className='overview-cards'>


                  <div className='card pr'>
                    <div>
                      <p>{boughtProducts}</p>
                      <h4>Products Sold</h4>
                    </div>
                    <span className='product-icon' />
                  </div>

                  <div className='card pr'>
                    <div>
                      <p>{websiteVisits}</p>
                      <h4>Website Visits</h4>
                    </div>
                    <span className='orders-icon' />
                  </div>

                  <div className='card pr'>
                    <div>
                      <p>{campaigns.sent} Sent, {campaigns.sent + campaigns.notSent} Created</p>
                      <h4>Campaign Messages</h4>
                    </div>
                    <span className='reviews-icon' />
                  </div>
                </div>
              </div>

              {/*<div className='quick-actions ds_item'>
                <h2>Quick Actions</h2>
                <div><span className='orders-icon' /><Link to='dashboard/orders/customers'>View Orders</Link></div>
                <div><span className='product-icon' /><Link to='dashboard/product/add'>Add A New Product</Link></div>
                <div><span className='newsletter-icon' /><Link to='dashboard/campaigns'>Campaign Messages</Link></div>
                <div><span className='banner-icon' /><Link to='dashboard/banner'>Go To Banners</Link></div>
                <div><span className='reviews-icon' /><Link to='dashboard/review'>See Rieviews</Link></div>
              </div>*/}

              <div className='sales-analytics ds_item'>
                <hr />
                <div className='overview-date-range'>
                  <div>
                    <h2>Orders & Product Analytics</h2>
                    <p style={{ fontSize: '11px' }}>Showing data from {sF.dateRange}</p>
                  </div>

                  <OverviewFilter />
                </div>
                <ResponsiveContainer width='100%' height={250}>
                  <BarChart data={fetchAnalyticsData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='PAID ORDERS' fill='gold' />
                    <Bar dataKey='UNPAID ORDERS' fill='black' />
                    <Bar dataKey='product sold' fill='#e83e8c' />
                  </BarChart>
                </ResponsiveContainer>
                <hr />
              </div>

              <div className='recent_orders  ds_item'>
                <h2>Recent Orders</h2>
                <div className='ordersTable'>
                  <OrdersTable />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const sL = state.currency.select_currency.length;
  return {
    user: state.account.user,
    orders: state.adminDashboard.fetchOrders,
    all_currency: state.currency.all_currency,
    selectCurrency: sL > 0 ? state.currency.select_currency : state.currency.default_currency,

    recentOrders: state.adminDashboard.recentOrders,
    boughtProducts: state.adminDashboard.boughtProducts,
    totalUsers: state.adminDashboard.totalUsers,
    websiteVisits: state.adminDashboard.websiteVisits,

    totalReviews: state.adminDashboard.totalReviews,

    selectedOverview: state.adminDashboard.selected,

    fetchAnalyticsData: state.adminDashboard.analyticsData,

    campaigns: state.adminDashboard.campaigns,

    isLoading: state.adminDashboard.isLoading,

    skincareMaintenanceStatus: state.adminDashboard.maintenanceStatus.skincare,
    beautyMaintenanceStatus: state.adminDashboard.maintenanceStatus.beauty,

    skincareInputMaintenanceText: state.adminDashboard.inputMaintenanceText.skincare,
    beautyInputMaintenanceText: state.adminDashboard.inputMaintenanceText.beauty,

    websiteInfo: state.navigation.websiteInfo,
    websiteInfoText: state.adminDashboard.websiteInfoText,
    websiteInfoStatus: state.adminDashboard.websiteInfoStatus,
  };
};

export default connect(mapStateToProps, actions)(AdminDashboard);
