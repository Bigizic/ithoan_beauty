/**
 *
 * CartList
 *
 */

import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Button from '../../Common/Button';

const CartList = (props) => {
  const { cartItems, handleRemoveFromCart, all_currency, selectCurrency } = props;
  const navigate = useNavigate()

  const handleProductClick = () => {
    props.toggleCart();
  };
  // const tempPrice = await convertCurrency(selectCurrency, cart.cartItems.totalPrice)
  // cartItems.totalPrice = parseFloat(tempPrice.toFixed(2));

  return (
    <div className='cart-list'>
      {cartItems.map((item, index) => (
        <div key={index} className='item-box' style={{ marginTop: '2em' }}>
          <div className='item-details'>
            <Container>
              <Row className='mb-2 align-items-center'>
                <Col xs='10' className='pr-0'>
                  <div className='d-flex align-items-center'>
                    <img
                      className='item-image mr-2'
                      src={`${
                        item.imageUrl
                          ? item.imageUrl
                          : '/images/placeholder-image.png'
                      }`}
                    />

                    <a
                      className='item-link one-line-ellipsis cursor-pointer'
                      onClick={() => {
                        navigate(`/product/${item.slug}`)
                        handleProductClick()
                      }}
                    >
                      <h2 className='item-name one-line-ellipsis'>
                        {item.name}
                      </h2>
                    </a>
                  </div>
                </Col>
                <Col xs='2' className='text-right'>
                  <Button
                    borderless
                    variant='empty'
                    ariaLabel={`remove ${item.name} from cart`}
                    icon={<i className='icon-trash' aria-hidden='true' />}
                    onClick={() => handleRemoveFromCart(item)}
                  />
                </Col>
              </Row>
              <Row className='mb-2 align-items-center'>
                <Col xs='9' style={{ marginTop: '2em' }}>
                  <p className='item-label'>price</p>
                </Col>
                <Col style={{ marginTop: '2em' }} xs='3' className='text-right'>
                  <p className='cart_item_price value price'>{all_currency[selectCurrency]}{`${item?.totalPrice.toLocaleString()}`}</p>
                </Col>
              </Row>
              <Row className='mb-2 align-items-center' style={{ marginBottom: '2em' }}>
                <Col xs='9'>
                  <p className='item-label'>quantity</p>
                </Col>
                <Col xs='3' className='text-right'>
                  <p className='value quantity'>{` ${item.quantity}`}</p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
