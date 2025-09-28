/*
 *
 * Customer
 *
 */

import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Address from '../../../containers/Address';
import Product from '../../../containers/Product';
import Brand from '../../../containers/Brand';
import Order from '../../../containers/Order';
import Wishlist from '../../../containers/WishList';

const Merchant = props => {
  return (
    <div className='merchant'>
      <Row>
        <Col xs='12' md='5' xl='3'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='9'>
          <div className='panel-body'>
            <Routes>
              <Route exact path='' element={<Account />} />
              <Route path='/security' element={<AccountSecurity />} />
              <Route path='/address' element={<Address />} />
              <Route path='/product' element={<Product />} />
              <Route path='/brand' element={<Brand />} />
              <Route path='/orders' element={<Order />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Merchant;
