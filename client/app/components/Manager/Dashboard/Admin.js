/*
 *
 * Admin
 *
 */

import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import AdminDashboard from '../../../containers/AdminDashboard';
import Address from '../../../containers/Address';
import Order from '../../../containers/Order';
import Users from '../../../containers/Users';
import Category from '../../../containers/Category';
import Product from '../../../containers/Product';
import Brand from '../../../containers/Brand';
import Merchant from '../../../containers/Merchant';
import Review from '../../../containers/Review';
import Wishlist from '../../../containers/WishList';
import Banner from '../../../containers/Banner';
import Campaign from '../../../containers/Campaign';
import Services from '@/containers/Services';
import Service from '@/containers/Service';

const Admin = props => {
  return (
    <div className='admin'>
      <Row>
        <Col className='leftNav' xs='12' md='3' xl='2'>
          <AccountMenu {...props} />
        </Col>
        <Col className='rightMain p-0' xs='12' md='7' xl='10'>
          <div className='panel-body'>
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path='details' element={<Account />} />
              <Route path='security' element={<AccountSecurity />} />
              <Route path='address' element={<Address />} />
              <Route path='product/*' element={<Product />} />
              <Route path='services/*' element={<Services />} />
              <Route path='service/*' element={<Service />} />
              <Route path='category/*' element={<Category />} />
              <Route path='brand/*' element={<Brand />} />
              <Route path='users' element={<Users />} />
              <Route path='merchant/*' element={<Merchant />} />
              <Route path='orders/*' element={<Order />} />
              <Route path='review/*' element={<Review />} />
              <Route path='banner/*' element={<Banner />} />
              <Route path='campaigns/*' element={<Campaign />} />
              <Route path='wishlist/*' element={<Wishlist />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
