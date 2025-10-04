/**
 *
 * CartSummary
 *
 */

import React, { useState } from 'react';

import { Container, Row, Col } from 'reactstrap';

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import Shipping from '../../../containers/Shipping';

import Checkbox from '../../Common/Checkbox';
import { Link } from 'react-router-dom';


const CartSummary = props => {
  const {
    cartTotal, serviceCharge,
    cartAmount, all_currency,
    selectCurrency, shippingInfos,
    isShippingOpen, toggleShipping,
    sS, termsSelected, termsRemoved,
    shippingFormErrors, toggleCart
  } = props;

  const toogleShipping = () => toggleShipping();
  const shippingKeys = Object.keys(shippingInfos)
  const shippingInfoKey = shippingInfos[sS] ? shippingInfos[sS][0] : shippingInfos[sS]
  const shippingInfoValue = shippingInfos[sS] ? shippingInfos[sS][1] : shippingInfos[sS]

  return (
    <div className='cart-summary'>
      <Container>
        <Row className='mb-2 summary-item cart_shipping_summary'>
            <p style={{ padding: '0px 0px 0px 15px' }} className='summary-label'>Shipping</p>

        <Dropdown isOpen={isShippingOpen} toggle={toogleShipping} className='shipping-link'>
          <DropdownToggle nav caret>
            {shippingInfoKey || 'Select Dispatch Type'}
          </DropdownToggle>
            <Shipping
              shippingKeys={shippingKeys}
            />
            { shippingFormErrors.selectedShipping && <p className='terms-text-div'>{shippingFormErrors.selectedShipping}</p> }
        </Dropdown>
        </Row>
        <Col style={{ display: 'flex', justifyContent: 'center',
                      padding: '0px', margin: '7px 0px 0px 0px' }}>
          {shippingInfoValue && <p style={{ color: '#fff', background: 'black',
                      padding: '2px 15px', borderRadius: '20px',
                      fontSize: '12px' }} >{ shippingInfoValue || '' }</p>
          }
        </Col>
        <Row className='mb-2 summary-item'>
          <Col xs='9'>
            <p className='summary-label'>Amount</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value summary_amount'>{all_currency[selectCurrency]}{`${cartAmount.toLocaleString()}`}</p>
          </Col>
        
        </Row>
        {/*<Row className='mb-2 summary-item'>
          <Col xs='9'>
            <p className='summary-label'>Service Charge</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value'>{all_currency[selectCurrency]}{`${serviceCharge.toLocaleString()}`}</p>
          </Col>
        
        </Row>*/}

        <Row className='mb-2 summary-item'>
          <Col xs='9'>
            <p className='summary-label'>Total</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value summary_amount'>{all_currency[selectCurrency]}{`${cartTotal.toLocaleString()}`}</p>
          </Col>
        
        </Row>
        

        <Col className='mt-3 terms-condition'>
            <div className='terms-text'>
              <span>
              <Checkbox
                id={`terms_and_conditions_select`}
                name={'terms_&_select'}
                label={'I'}
                checked={false}
                error={shippingFormErrors['termsSelected']}
                onChange={(name, value) => { value ?
                  termsSelected()
                  :
                  termsRemoved()
                }}
                />
              </span>agree to the <Link to='/terms' onClick={toggleCart}>terms and conditions.</Link></div>
              { shippingFormErrors.termsSelected && <p className='terms-text-div'>{shippingFormErrors.termsSelected}</p> }
        </Col>
      </Container>
    </div>
  );
};

export default CartSummary;
