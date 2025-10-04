/**
 *
 * Currency
 *
 */

import React from 'react';

import Button from '../../Common/Button';
import { Col } from 'reactstrap';


const AddToCurrency = props => {
  const {
    item,
    updateSelectCurrency,
    authentication,
    user,
  } = props;

  function hardRefreshOnButtonClick(buttonClassName) {
    let button = document.querySelector(`.${buttonClassName}`);
  
    if (button) {
        location.reload();
        // upon reloading lets clear the cart as the customer has switched to a
        // different currency store
        localStorage.removeItem('cart_items')
        localStorage.removeItem('cart_total')
    }
  }

  return (
        <Col>
        <span className={`${item}-icon-img`}></span>
        <Button
          className={`currency-checkbox`}
          text={item.toUpperCase()}
          onClick={e => {
            updateSelectCurrency(item, authentication, user);
            hardRefreshOnButtonClick(`currency-checkbox`);
          }}
        >
        </Button>
        </Col>
  );
};

export default AddToCurrency;
