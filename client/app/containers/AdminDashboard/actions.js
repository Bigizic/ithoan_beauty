/*
 *
 * Admin Dashboard actions
 *
 */

import axios from 'axios';
import { ROLES, API_URL } from '../../constants';
import { formatDate } from '../../utils/date';
import { success } from 'react-notification-system-redux';

import {
  FETCH_RECENT_ORDERS,
  FETCH_BOUGHT_PRODUCTS,
  TOTAL_USERS,
  WEBSITE_VISITS,
  FETCH_ORDERS,
  FETCH_REVIEWS,
  TOTAL_CAMPAIGNS,

  SET_SELECTED_OVERVIEW,
  SET_ANALYTICS_DATA,

  IS_LOADING_DASHBOARD,
  SET_MAINTENANCE_STATUS,

  SET_INPUT_MAINTENANCE_TEXT,
  SET_INPUT_WEBSITE_TEXT,
  SET_WEBSITE_INFO_STATUS,
} from './constants';

import handleError from '../../utils/error';
import moment from 'moment';

const analyticsHelper = (selectedOverview, orders, producBought) => {
  const fetchedDate = fetchDate(selectedOverview.dateRange);
  const dateRange = selectedOverview.dateRange;
  let paidOrders; let unPaidOrders = [];
  let PRODUCT; let ORDERS = [];

  // ~~~ LITTLE PRODUCT FUNCTION ~~~~
  const littleProductFunction = (products, dates) => {
    const boughtCount = products.filter(cart => {
      const date = moment(cart.created);
      return date.isBetween(dates[0], dates[1], null, '[]');
    });
    let count = 0;
    if (boughtCount.length > 0) {
      for (const items of boughtCount) {
        count += items.products.length;
      }
    }
    return count;
  };

  // ~~~~ CASE WHERE ALL TIME WAS PASSED ~~~~
  if (!fetchedDate) {
    // all time
    const allTimeOrders = (orders, orderStatus) => {
      const res = [];
      const newOrders = orders.filter(order => {
        return order.status === orderStatus;
      });
      res.push({ start: 'All Time', count: newOrders.length });
      return res;
    };

    const allTimeProduct = (products) => {
      let count = 0;

      if (products.length > 0) {
        products.map((item) => {
          count += item.products.length;
        });
      }
      return [{ start: 'All Time', count }];
    };

    const p = allTimeOrders(orders, 'true');
    const u = allTimeOrders(orders, 'false');
    const product = allTimeProduct(producBought);

    paidOrders = p.length > 0 ? p : 0;
    unPaidOrders = u.length > 0 ? u : 0;

    const ORDERS = {
      paidOrders,
      unPaidOrders
    };
    const PRODUCT = {
      product
    };

    return {
      ORDERS, PRODUCT
    };
  }
  // ~~~~ END ALL TIME CASE ~~~~

  // ~~~~ CASE WHERE DATE RANGE IS PASSED ~~~~
  const newOrders = orders.filter(order => {
    const orderDate = moment(order.created);
    return orderDate.isBetween(fetchedDate[0], fetchedDate[1], null, '[]');
  });
  if (dateRange.startDate && dateRange.endDate) {
    const filterOrdersByDay = (orders, orderStatus, startDate, endDate) => {
      const currentDate = moment(startDate).startOf('day');
      const end = moment(endDate).endOf('day');
      const results = [];

      while (currentDate.isSameOrBefore(end)) {
        const temp = orders.filter(order => {
          const orderDate = moment(order.created).startOf('day');
          return order.status === orderStatus && orderDate.isSame(currentDate, 'day');
        });

        results.push({ start: currentDate.format('DD MMM'), count: temp.length });
        currentDate.add(1, 'day');
      }
      return results;
    };

    const filterProductsByDay = (products, startDate, endDate) => {
      const currentDate = moment(startDate).startOf('day');
      const end = moment(endDate).endOf('day');
      const results = [];

      while (currentDate.isSameOrBefore(end)) {
        const temp = products.filter(product => {
          const productDate = moment(product.created).startOf('day');
          return productDate.isSame(currentDate, 'day');
        });
        const count = littleProductFunction(temp, fetchedDate);
        results.push({ start: currentDate.format('DD MMM'), count });
        currentDate.add(1, 'day');
      }
      return results;
    };
    const paidOrders = filterOrdersByDay(newOrders, 'true', dateRange.startDate, dateRange.endDate);
    const unPaidOrders = filterOrdersByDay(newOrders, 'false', dateRange.startDate, dateRange.endDate);

    const product = filterProductsByDay(producBought, dateRange.startDate, dateRange.endDate);

    const ORDERS = {
      paidOrders,
      unPaidOrders
    };
    const PRODUCT = {
      product
    };

    return {
      ORDERS, PRODUCT
    };
  }
  // ~~~~ END CASE DATE RANGE ~~~~

  const okDate = getTimeRange(selectedOverview.dateRange);

  // ~~~~ CASE WHERE DAY WAS PASSED ~~~~
  if (dateRange === 'Today' || dateRange === 'Yesterday') {
    /**
   * function to fetch orders for day case
   * @param {*} orders
   * @param {*} date
   * @param {*} orderStatus
   * @returns
   */
    const dayOrders = (orders, date, orderStatus) => {
      const groupedOrders = date.map(({ start: hourStart, end: hourEnd }) => {
        const ordersInHour = orders.filter(order => {
          const orderHour = moment(order.created).format('HH:mm');
          return order.status === orderStatus && orderHour >= hourStart && orderHour <= hourEnd;
        });
        return { start: hourStart, count: ordersInHour.length };
      });
      return groupedOrders;
    };

    /**
     * function to fetch bought products for day case
     * @param {*} products
     * @param {*} date
     */
    const dayProduct = (products, date) => {
      const groupedProducts = date.map(({ start: hourStart, end: hourEnd }) => {
        const productsInHour = products.filter(product => {
          const productHour = moment(product.created).format('HH:mm');
          return productHour >= hourStart && productHour <= hourEnd;
        });
        const count = littleProductFunction(productsInHour, fetchedDate);
        return { start: hourStart, count };
      });
      return groupedProducts;
    };

    const p = dayOrders(newOrders, okDate, 'true');
    const u = dayOrders(newOrders, okDate, 'false');
    paidOrders = p.length > 0 ? p : 0;
    unPaidOrders = u.length > 0 ? u : 0;

    const product = dayProduct(producBought, okDate);

    ORDERS = {
      paidOrders,
      unPaidOrders
    };
    PRODUCT = {
      product
    };
    // ~~~ END CASE DAY ~~~~

    // ~~~~ CASE WHERE WEEK WAS PASSED ~~~~
  } else if (dateRange === 'This Week') {
    /**
   *  function to fetch orders for week case
   * @param {*} orders
   * @param {*} date
   * @param {*} orderStatus
   * @param {*} week
   */
    const weekOrders = (orders, date, orderStatus) => {
      const groupedOrders = date.map(({ start: dayStart }) => {
        const ordersInDay = orders.filter(order => {
          const orderDay = moment(order.created).format('MMM DD');
          return order.status === orderStatus && orderDay === dayStart;
        });
        return { start: dayStart, count: ordersInDay.length };
      });
      return groupedOrders;
    };

    /**
     *
     * @param {*} products
     * @param {*} date
     */
    const weekProduct = (products, date) => {
      const groupedProducts = date.map(({ start: dayStart }) => {
        const productsInDay = products.filter(product => {
          const productDay = moment(product.created).format('MMM DD');
          return productDay === dayStart;
        });
        const count = littleProductFunction(productsInDay, fetchedDate);
        return { start: dayStart, count };
      });
      return groupedProducts;
    };

    const p = weekOrders(newOrders, okDate, 'true');
    const u = weekOrders(newOrders, okDate, 'false');
    paidOrders = p.length > 0 ? p : 0;
    unPaidOrders = u.length > 0 ? u : 0;

    const product = weekProduct(producBought, okDate);

    ORDERS = {
      paidOrders,
      unPaidOrders
    };
    PRODUCT = {
      product
    };
    // ~~~~ END WEEK CASE ~~~~

    // ~~~~ CASE WHERE MONTH WAS PASSED ~~~~
  } else if (dateRange === 'This Month' || dateRange === 'Last Month') {
    /**
   * function to fetch orders for month case
   * @param {*} orders
   * @param {*} date
   */
    const monthOrders = (orders, date, orderStatus, month) => {
      const Orders = date.map(({ start: dayStart }) => {
        const ordersInDay = orders.filter(order => {
          const orderDate = moment(order.created).format('DD');
          const orderMonth = moment(order.created).format('MMMM');
          if (month === orderMonth) {
            const rangeDay = moment(dayStart).format('DD');
            return order.status === orderStatus && orderDate === rangeDay;
          }
        });
        return { start: dayStart, count: ordersInDay.length };
      });
      return Orders;
    };

    /**
     *
     * @param {*} Products
     * @param {*} date
     * @param {*} month
     */
    const monthProducts = (products, date, month) => {
      const Products = date.map(({ start: dayStart }) => {
        const productsInDay = products.filter(product => {
          const productDate = moment(product.created).format('DD');
          const productMonth = moment(product.created).format('MMMM');
          if (month === productMonth) {
            const rangeDay = moment(dayStart).format('DD');
            return productDate === rangeDay;
          }
        });
        const count = littleProductFunction(productsInDay, fetchedDate);
        return { start: dayStart, count };
      });
      return Products;
    };

    if (dateRange === 'This Month') {
      const mm = moment().format('MMMM');
      const p = monthOrders(orders, okDate, 'true', mm);
      const u = monthOrders(orders, okDate, 'false', mm);
      paidOrders = p.length > 0 ? p : 0;
      unPaidOrders = u.length > 0 ? u : 0;
      const product = monthProducts(producBought, okDate, mm);
      ORDERS = {
        paidOrders,
        unPaidOrders
      };
      PRODUCT = {
        product
      };
    } else {
      const mm = moment().subtract(1, 'months').format('MMMM');
      const p = monthOrders(orders, okDate, 'true', mm);
      const u = monthOrders(orders, okDate, 'false', mm);
      paidOrders = p.length > 0 ? p : 0;
      unPaidOrders = u.length > 0 ? u : 0;
      const product = monthProducts(producBought, okDate, mm);
      ORDERS = {
        paidOrders,
        unPaidOrders
      };
      PRODUCT = {
        product
      };
    }
    // ~~~~ END CASE MONTH ~~~~

    // ~~~ CASE YEAR WAS PASSED ~~~~
  } else if (dateRange === 'This Year' || dateRange === 'Last Year') {
    /**
   * function to fetch orders for year case
   * @param {*} orders
   * @param {*} date
   * @param {*} orderStatus
   */
    const yearOrders = (orders, date, orderStatus, year) => {
      const groupedOrders = date.map(({ start: monthStart }) => {
        const ordersInMonth = orders.filter(order => {
          const orderMonth = moment(order.created).format('MMMM');
          const orderYear = moment(order.created).format('YYYY');
          if (String(orderYear) === String(year)) {
            return order.status === orderStatus && orderMonth === monthStart;
          }
        });
        return { start: monthStart, count: ordersInMonth.length };
      });
      return groupedOrders;
    };

    /**
     *
     * @param {*} products
     * @param {*} date
     * @param {*} year
     */
    const yearProduct = (products, date, year) => {
      const groupedProducts = date.map(({ start: monthStart }) => {
        const productsInMonth = products.filter(product => {
          const productMonth = moment(product.created).format('MMMM');
          const productYear = moment(product.created).format('YYYY');
          if (String(productYear) === String(year)) {
            return productMonth === monthStart;
          }
        });
        const count = littleProductFunction(productsInMonth, fetchedDate);
        return { start: monthStart, count };
      });
      return groupedProducts;
    };
    if (dateRange === 'This Year') {
      const p = yearOrders(orders, okDate, 'true', moment().year());
      const u = yearOrders(orders, okDate, 'false', moment().year());
      const product = yearProduct(producBought, okDate, moment().year());
      paidOrders = p.length > 0 ? p : 0;
      unPaidOrders = u.length > 0 ? u : 0;
      ORDERS = {
        paidOrders,
        unPaidOrders
      };
      PRODUCT = {
        product
      };
    } else {
      const p = yearOrders(orders, okDate, 'true', moment().year() - 1);
      const u = yearOrders(orders, okDate, 'false', moment().year() - 1);
      const product = yearProduct(producBought, okDate, moment().year() - 1);
      paidOrders = p.length > 0 ? p : 0;
      unPaidOrders = u.length > 0 ? u : 0;
      ORDERS = {
        paidOrders,
        unPaidOrders
      };
      PRODUCT = {
        product
      };
    }
  }
  // ~~~~ END CASE YEAR ~~~~

  return {
    ORDERS, PRODUCT
  };
};

const parseData = (input) => {
  const paidOrders = input.ORDERS.paidOrders;
  const unPaidOrders = input.ORDERS.unPaidOrders;
  const products = input.PRODUCT.product;

  const result = paidOrders.map((paid, index) => {
    const unpaid = unPaidOrders[index];
    const product = products[index];

    return {
      name: paid.start,
      'PAID ORDERS': paid.count,
      'UNPAID ORDERS': unpaid.count,
      'product sold': product.count
    };
  });

  return result;
};

export const setAnalyticsData = () => {
  return async (dispatch, getState) => {
    try {
      const selectedOverview = getState().adminDashboard.selected;

      if (selectedOverview) {
        const orders = await axios.get(`${API_URL}/order/all_orders`);
        //const producBought = await axios.get(`${API_URL}/product_count`);
        const allCart = await axios.get(`${API_URL}/cart/get_all_cart`);

        if (orders && allCart) {
          const data = analyticsHelper(selectedOverview, orders.data.orders, allCart.data.carts);
          const parsedData = parseData(data);
          dispatch({
            type: SET_ANALYTICS_DATA,
            payload: parsedData
          });
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const fetchRecentOrders = () => {
  return async (dispatch, getState) => {
    try {
      const all_currency = getState().currency.all_currency;
      const sL = getState().currency.select_currency.length;
      const currs = sL > 0 ? getState().currency.select_currency[0] : getState().currency.default_currency[0];
      const response = await axios.get(`${API_URL}/order`);
      if (response.status === 200) {
        const newOrders = [];

        response.data.orders.map((order) => {
          let discountCount = 0;
          for (const items of order.products) {
            if (items && items.product && items.product.discountPrice > 0) { discountCount += 1; }
          }
          const subTotal = order.products.reduce((sum, product) => {
            const discountedPrice = product.totalPrice - (product.totalPrice * (product.discountPrice / 100));
            return sum + discountedPrice;
          }, 0);
          const t = order.total && subTotal.toLocaleString();
          const curr = order.currency || currs;
          const temp = {
            meta: order._id.substring(6) + ' ' + order.user,
            created: formatDate(order.created),
            total: order.total ? (all_currency[curr] + t) : 'Not available',
            discount: discountCount > 0 ? 'Given' : 'Not Given',
            status: order.products[0].status,
            paymentStatus: order.status === 'true' ? 'Paid ' : 'Not Paid',
            paymentType: order.paymentType ? order.paymentType : 'None',
            currency: curr
          };
          newOrders.push(temp);
        });
        dispatch({
          type: FETCH_ORDERS,
          payload: newOrders
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const setSelectedOverview = (value) => {
  return (dispatch, getState) => {
    localStorage.setItem('SELECTED_OVERVIEW', JSON.stringify(value));
    dispatch({
      type: SET_SELECTED_OVERVIEW,
      payload: value
    });
  };
};

export const getSelectedOverview = () => {
  return (dispatch, getState) => {
    const res = localStorage.getItem('SELECTED_OVERVIEW');
    if (res) {
      dispatch({
        type: SET_SELECTED_OVERVIEW,
        payload: JSON.parse(res)
      });
    }
  };
};

/**
 *
 * @param {*} dateType
 * @returns
 */
const getTimeRange = (dateType) => {
  const [startDate, endDate] = fetchDate(dateType);

  if (!startDate || !endDate) return null;

  let result = [];

  if (dateType === 'Today' || dateType === 'Yesterday') {
    for (let i = 0; i < 24; i++) {
      const hourStart = moment(startDate).hour(i);
      const hourEnd = moment(startDate).hour(i).minute(59).second(59);
      result.push({ start: hourStart.format('HH:mm'), end: hourEnd.format('HH:mm') });
    }
  } else if (dateType === 'This Week') {
    for (let i = 0; i < 7; i++) {
      const dayStart = moment(startDate).add(i, 'days').startOf('day');
      const dayEnd = moment(startDate).add(i, 'days').endOf('day');
      result.push({ start: dayStart.format('MMM DD'), end: dayEnd.format('MMM DD') });
    }
  } else if (dateType === 'This Month' || dateType === 'Last Month') {
    const days = [];
    const currentDay = moment(startDate).startOf('day');

    while (currentDay.isBefore(endDate)) {
      days.push({ start: currentDay.format('MMM DD') });
      currentDay.add(1, 'day');
    }
    result = days;
  } else if (dateType === 'This Year' || dateType === 'Last Year') {
    for (let i = 0; i < 12; i++) {
      const monthStart = moment(startDate).month(i).startOf('month');
      const monthEnd = moment(startDate).month(i).endOf('month');
      result.push({ start: monthStart.format('MMMM'), end: monthEnd.format('MMMM') });
    }
  }

  return result;
};

/**
* - returns a date range
* @param {*} parsedOrder  - orders already parsed
* @param {*} dates - date from option
* @returns
*/
const fetchDate = (dates) => {
  let startDate; let endDate = null;

  if (dates === 'All Time') {
    return null;
  }

  if (dates.startDate && dates.endDate) { // first parsing for date with startDate and endDate
    startDate = moment(dates.startDate);
    endDate = moment(dates.endDate);
  }

  if (dates === 'Today') { // second parsing for Today date
    startDate = moment().startOf('day');
    endDate = moment().endOf('day');
  }

  if (dates === 'Yesterday') { // third parsing for Yesterday date
    startDate = moment().subtract(1, 'days').startOf('day');
    endDate = moment().subtract(1, 'days').endOf('day');
  }

  if (dates === 'This Week') {
    startDate = moment().startOf('week');
    endDate = moment().endOf('week');
  }

  if (dates === 'This Month') {
    startDate = moment().startOf('month');
    endDate = moment().endOf('month');
  }
  if (dates === 'Last Month') {
    startDate = moment().subtract(1, 'month').startOf('month');
    endDate = moment().subtract(1, 'month').endOf('month');
  }
  if (dates === 'This Year') {
    startDate = moment().startOf('year');
    endDate = moment().endOf('year');
  }
  if (dates === 'Last Year') {
    startDate = moment().subtract(1, 'year').startOf('year');
    endDate = moment().subtract(1, 'year').endOf('year');
  }
  return [startDate, endDate];
};

/**
 *
 * @param {*} dates
 * @param {*} boughtProducts
 * @returns
 */
const boughtProductsCountHelper = (dates, carts) => {
  if (!dates) {
    let count = 0;
    if (carts.length > 0) {
      carts.map((item) => {
        count += item.products.length;
      });
    }
    return count;
  }
  const boughtCount = carts.filter(cart => {
    const date = moment(cart.created);
    return date.isBetween(dates[0], dates[1], null, '[]');
  });
  let count = 0
  if (boughtCount.length > 0) {
    for (const items of boughtCount) {
      count += items.products.length;
    }
  }
  return count;
};

/**
 *
 * @param {*} dates
 * @param {*} orders
 */
const orderCountHelper = (dates, orders) => {
  let estSales = 0;
  if (!dates) {
    const paidOrdersCount = orders.filter(count => {
      return count.status === 'true';
    });
    const unPaidOrdersCount = orders.filter(count => {
      return count.status === 'false';
    });

    paidOrdersCount.filter(count => {
      estSales += count.total
    })
    return [estSales, paidOrdersCount.length, unPaidOrdersCount.length];
  }

  const paidOrdersCount = orders.filter(count => {
    const date = moment(count.created);
    return count.status === 'true' && date.isBetween(dates[0], dates[1], null, '[]');
  });

  paidOrdersCount.filter(count => {
    estSales += count.total
  })

  const unPaidOrdersCount = orders.filter(count => {
    const date = moment(count.created);
    return count.status === 'false' && date.isBetween(dates[0], dates[1], null, '[]');
  });

  return [estSales, paidOrdersCount.length, unPaidOrdersCount.length];
};

/**
 *
 * @param {*} dates
 * @param {*} users
 */
const usersCountHelper = (dates, users) => {
  if (!dates) {
    let adminCount = 0;
    let normalUserCount = 0;
    let merchantCount = 0;
    users.map(x => {
      if (x.role === ROLES.Admin) {
        adminCount += 1;
      }
      if (x.role === ROLES.Member) {
        normalUserCount += 1;
      }
      if (x.role === ROLES.Merchant) {
        merchantCount += 1;
      }
    });
    return [normalUserCount, adminCount, merchantCount];
  }
  const newUsersCount = users.filter(count => {
    const date = moment(count.created);
    return date.isBetween(dates[0], dates[1], null, '[]');
  });
  let adminCount = 0;
  let normalUserCount = 0;
  let merchantCount = 0;
  newUsersCount.map(x => {
    if (x.role === ROLES.Admin) {
      adminCount += 1;
    }
    if (x.role === ROLES.Member) {
      normalUserCount += 1;
    }
    if (x.role === ROLES.Merchant) {
      merchantCount += 1;
    }
  });
  return [normalUserCount, adminCount, merchantCount];
};

/**
 *
 * @param {*} dates
 * @param {*} reviews
 */
const reviewsCountHelper = (dates, reviews) => {
  if (!dates) {
    return reviews.length;
  }
  const newReviewsCount = reviews.filter(count => {
    const date = moment(count.created);
    return date.isBetween(dates[0], dates[1], null, '[]');
  });
  return newReviewsCount.length;
};


/**
 * 
 * @param {*} dates 
 * @param {*} campaigns 
 */
const campaignCountHelper = (dates, campaigns) => {
  if (!dates) {
    const sentCampaigns = campaigns.filter(camp => {
      return camp.sent === true
    })
    return {
      sent: sentCampaigns.length,
      notSent: (campaigns.length - sentCampaigns.length)
    }
  }

  const newCampaignCount = campaigns.filter(count => {
    const date = moment(count.created);
    return date.isBetween(dates[0], dates[1], null, '[]');
  })
  const sentCampaigns = newCampaignCount.filter(camp => {
    return camp.sent === true
  })
  return {
    sent: sentCampaigns.length,
    notSent: (newCampaignCount.length - sentCampaigns.length)
  }
}


/**
 * 
 * @param {*} dates 
 * @param {*} visits 
 * @returns 
 */
const websiteVisitHelper = (dates, visits) => {
  if (!dates) {
    return visits.length
  }

  const visitsMap = visits.filter(count => {
    const date = moment(count.created);
    return date.isBetween(dates[0], dates[1], null, '[]')
  })
  return visitsMap.length
}

/**
 *
 * @param {*} dateRange
 */
const fetchAdminOverviewHelper = async (dateRange) => {
  // no date range -- default action
  const allOrdersCount = await axios.get(`${API_URL}/order/all_orders`);
  const allUsers = await axios.get(`${API_URL}/user/all_users`);
  const allReviews = await axios.get(`${API_URL}/review/all_reviews`);
  // const allBoughtProducts = await axios.get(`${API_URL}/product_count`);
  const allCart = await axios.get(`${API_URL}/cart/get_all_cart`);
  const allCampaign = await axios.get(`${API_URL}/newsletter/`);
  const allWebSiteVisits = await axios.get(`${API_URL}/visit`);
  /*
            FETCH_RECENT_ORDERS,
            FETCH_BOUGHT_PRODUCTS,
            TOTAL_USERS,
  */

  if (allOrdersCount && allUsers && allCart && allReviews) {
    // default settings: show overview for this month
    const dates = fetchDate(dateRange);

    const newOrdersCount = orderCountHelper(dates, allOrdersCount.data.orders);
    const newBoughtCount = boughtProductsCountHelper(dates, allCart.data.carts);
    const newUsersCount = usersCountHelper(dates, allUsers.data.users);
    const newReviewsCount = reviewsCountHelper(dates, allReviews.data.reviews);
    const newCampaignCount = campaignCountHelper(dates, allCampaign.data.campaigns);
    const newWebsiteVisit = websiteVisitHelper(dates, allWebSiteVisits.data.visits);

    return {
      newOrdersCount,
      newBoughtCount,
      newUsersCount,
      newReviewsCount,
      newCampaignCount,
      newWebsiteVisit,
    };
  }
};

/**
 *
 * @param {*} dateRange
 * @returns
 */
export const fetchAdminOverview = (dateRanger) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().account.user;
      if (user.role === ROLES.Admin) {
        // continue
        const dateRange = dateRanger || getState().adminDashboard.selected;
        if (dateRange) {
          dispatch(setAdminDashboardIsLoading(true));
          const {
            newOrdersCount,
            newBoughtCount,
            newUsersCount,
            newReviewsCount,
            newCampaignCount,
            newWebsiteVisit,
          } = await fetchAdminOverviewHelper(dateRange.dateRange);

          dispatch({
            type: WEBSITE_VISITS,
            payload: newWebsiteVisit,
          });

          dispatch({
            type: TOTAL_CAMPAIGNS,
            payload: newCampaignCount,
          });

          dispatch({
            type: FETCH_RECENT_ORDERS,
            payload: newOrdersCount
          });

          dispatch({
            type: FETCH_BOUGHT_PRODUCTS,
            payload: newBoughtCount
          });

          dispatch({
            type: TOTAL_USERS,
            payload: newUsersCount
          });

          dispatch({
            type: FETCH_REVIEWS,
            payload: newReviewsCount
          });

          dispatch(setAdminDashboardIsLoading(false))
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};


export const setAdminDashboardIsLoading = (stats) => {
  return (dispatch, getState) => {
    dispatch({
      type: IS_LOADING_DASHBOARD,
      payload: stats
    })
  }
}


export const setMaintenanceStatus = (type, status) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_MAINTENANCE_STATUS,
      payload: typeof (status) === 'object' ? { ...status } : { [type]: status },
    })
  }
}


export const setInputMaintenanceText = (type, v) => {
  return (dispatch) => {
    dispatch({
      type: SET_INPUT_MAINTENANCE_TEXT,
      payload: typeof (v) === 'object' ? { ...v } : { [type]: v }
    })
  }
}

export const setInputWebsiteInfo = (v) => {
  return (dispatch) => {
    dispatch({
      type: SET_INPUT_WEBSITE_TEXT,
      payload: v
    })
  }
}

export const setWebsiteInfoStatus = (v) => {
  return (dispatch) => {
    dispatch({
      type: SET_WEBSITE_INFO_STATUS,
      payload: v
    })
  }
}


// updates maintenance action
export const handleMaintenance = () => {
  return async (dispatch, getState) => {
    dispatch(setAdminDashboardIsLoading(true))
    try {
      //const text = value ? txt : ''
      const text = getState().adminDashboard.inputMaintenanceText
      const settings = getState().adminDashboard.maintenanceStatus
      const response = await axios.put(`${API_URL}/setting`, {
        settings,
        text
      });
      if (response.status === 200) {
        const successfulOptions = {
          title: `${response.data.message}`,
          position: 'tr',
          autoDismiss: 1
        };
        dispatch(success(successfulOptions));
      }
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch(setAdminDashboardIsLoading(false))
    }
  }
}

// update website info text
export const handleSetWebsiteInfo = (value, txt) => {
  return async (dispatch, getState) => {
    try {
      const text = value ? txt : "";
      dispatch(setAdminDashboardIsLoading(true))
      const response = await axios.put(`${API_URL}/setting`, { website_info: text, website_info_set: value, set: true });
      if (response.status === 200) {
        const successfulOptions = {
          title: `${response.data.message}`,
          position: 'tr',
          autoDismiss: 1
        };
        dispatch(success(successfulOptions));
        dispatch(setWebsiteInfoStatus(value));
        return dispatch(setInputWebsiteInfo(text));
      }
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch(setAdminDashboardIsLoading(false));
    }
  }
}

export const getMaintenanceStatus = () => {
  return async (dispatch, getState) => {
    dispatch(setAdminDashboardIsLoading(true))
    try {
      const response = await axios.get(`${API_URL}/setting`)
      if (response.status === 201 && response.data.setting.length === 0) {
        // empty setting, create setting
        const createSetting = await axios.post(`${API_URL}/setting`, { settings: false });
        if (createSetting.status === 200) {
          // default is false
          return dispatch(setMaintenanceStatus('', createSetting.data.setting[0].isMaintenanceMode))
        }
      } else if (response.status === 200 && response.data.setting.length > 0) {
        // we have a setting
        dispatch(setWebsiteInfoStatus(response.data.setting[0].websiteInfoStatus));
        dispatch(setInputWebsiteInfo(response.data.setting[0].websiteInfo));
        dispatch(setMaintenanceStatus('', response.data.setting[0].isMaintenanceMode));
        return dispatch(setInputMaintenanceText('', response.data.setting[0].maintenanceText));
      }
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch(setAdminDashboardIsLoading(false))
    }
  }
}
