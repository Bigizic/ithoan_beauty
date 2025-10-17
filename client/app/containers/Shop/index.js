/**
 *
 * Shop
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import { sortOptions } from '../../utils/store';

import ProductsShop from '../ProductsShop';
import BrandsShop from '../BrandsShop';
import CategoryShop from '../CategoryShop';

import Page404 from '../../components/Common/Page404';
import ProductFilter from '../../components/Store/ProductFilter';
import Pagination from '../../components/Common/Pagination';
import SelectOption from '../../components/Common/SelectOption';
import ShopFiltersComp from '@/components/Common/ShopFilters';


class Shop extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add('shop-page');
    this.props.minMaxPriceCalculator();
    //this.props.resetAdvancedFilters();
  }

  componentWillUnmount() {
    document.body.classList.remove('shop-page');
    //this.props.resetAdvancedFilters();
  }

  render() {
    const {
      products, advancedFilters,
      filterProducts, min,
      max, all_currency, selectCurrency,
      searchItem
    } = this.props;
    const { totalPages, currentPage, count, limit, order } = advancedFilters;
    const displayPagination = totalPages > 1;
    const totalProducts = products.length;
    const left = limit * (currentPage - 1) + 1;
    const right = totalProducts + left - 1;

    const parseMinMax = (value) => {
      if (typeof value === 'number') return Math.round(value);
      if (typeof value === 'string') {
        const num = parseFloat(value.replace(/[^0-9.]/g, ''));
        return isNaN(num) ? 0 : Math.round(num);
      }
      return 0;
    };
    const minLabel = parseMinMax(min);
    const maxLabel = parseMinMax(max);

    return (
      <div className='shop'>
        <Routes>
          <Route path=''
            element={
              <ProductsShop
                minLabel={minLabel}
                maxLabel={maxLabel}
                totalProducts={totalProducts}
                left={left}
                right={right}
                count={count}
                order={order}
                sortOptions={sortOptions}
                {...this.props}
              />
            }
          />
          <Route path='category/:slug'
            element={
              <CategoryShop
                minLabel={minLabel}
                maxLabel={maxLabel}
                totalProducts={totalProducts}
                left={left}
                right={right}
                count={count}
                order={order}
                sortOptions={sortOptions}
                {...this.props}
              />
            }
          />
          {/*<Route path='/shop/brand/:slug' component={BrandsShop} />*/}
          <Route path='*' element={<Page404 />} />
        </Routes>
        <div>

          <div>
            {displayPagination && searchItem.length < 3 && (
              <div className='pagination_container d-flex justify-content-center text-center mt-4'>
                <Pagination
                  totalPages={totalPages}
                  onPagination={filterProducts}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const sL = state.currency.select_currency.length;
  return {
    advancedFilters: state.product.advancedFilters,
    products: state.product.storeProducts,

    min: state.product.minPriceValue,
    max: state.product.maxPriceValue,
    all_currency: state.currency.all_currency,
    selectCurrency: sL > 0 ? state.currency.select_currency : state.currency.default_currency,

    searchItem: state.shop.searchItem,
  };
};

export default connect(mapStateToProps, actions)(Shop);
