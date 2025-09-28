/*
 *
 * Cart
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import CarouselSlider from '../../components/Common/CarouselSlider';
import Checkout from '../../components/Store/Checkout';
import { BagIcon, CloseIcon } from '../../components/Common/Icon';
import Button from '../../components/Common/Button';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';
import { Link } from 'react-router-dom';
import Checkbox from '../../components/Common/Checkbox';
import { ShoppingCart } from 'lucide-react';


class Cart extends React.PureComponent {
  componentDidMount() {
    // for cart shipping address
    this.props.setShippingAddress();
  }

  render() {
    const {
      isCartOpen,
      cartItems,
      cartTotal,
      cartAmount,
      serviceCharge,
      toggleCart,
      handleShopping,
      handleCheckout,
      handleRemoveFromCart,
      placeOrder,
      authenticated,

      all_currency,
      selectCurrency,
      firstName,
      lastName,
      address,
      selectAddress,
      removeSelectedAddress,
      phoneNumber,

      shippingInfos,
      isShippingOpen,
      toggleShipping,
      selectedShipping,
      termsRemoved,
      termsSelected,
      shippingFormErrors,

      newPlaceOrder,
      orderIsLoading,
    } = this.props;

    const addressLength = address.length;
    let newAddress = address.sort((a, b) => (b.isDefault === true) - (a.isDefault === true));
    newAddress = [newAddress[0]];

    

    return (
      <div className='cart'>
        <div className='cart-header'>
          {isCartOpen && (
            <Button
              borderless
              extraIconClassName='close_icon_container'
              variant='empty'
              ariaLabel='close the cart'
              icon={<CloseIcon />}
              onClick={toggleCart}
            />
          )}
        </div>
        {cartItems.length > 0 ? (
          <div className='cart-body'>
            <div className='cart_header_h3'>
              {authenticated ? 
              (
                <b style={{fontSize: '19px', marginBottom: '25px' }}>To be shipped to</b>
              )
              :
              (
                ''
              )
              }

              { addressLength > 0 ? (
                <CarouselSlider
                  swipeable={ true }
                  showDots={ true }
                  infinite={ false }
                  autoPlay={ false }
                  draggable={true}
                  responsive={responsiveOneItemCarousel}
                >
                  {newAddress.map((item, index) => (
                    <div key={index} className='cart_address'>
                      <div className='cart_address_and_selected_address'>
                      <b style={{ fontSize: '16px' }}>{firstName} {lastName}</b>
                      {
                        item.isDefault ?
                        <Checkbox
                          id={`${index}-radioButton`}
                          label={'Select'}
                          name={item._id}
                          checked={false}
                          onChange={(name, value) => { value ?
                            selectAddress(name)
                            :
                            removeSelectedAddress()
                          }}
                        />
                        :
                        index === 0 ?
                        <Checkbox
                          id={`${index}-radioButton`}
                          label={'Select'}
                          name={item._id}
                          checked={false}
                          onChange={(name, value) => { value ?
                            selectAddress(name)
                            :
                            removeSelectedAddress()
                          }}
                        />
                        :
                        <Checkbox
                          id={`${index}-radioButton`}
                          label={'Select'}
                          name={item._id}
                          checked={false}
                          onChange={(name, value) => { value ?
                            selectAddress(name)
                            :
                            removeSelectedAddress()
                          }}
                        />
                      }
                      </div>
                      <Link
                        to={`/dashboard/address/edit/${item._id}`}
                        className='d-block'
                        onClick={toggleCart}
                      >
                        <p>{item.address} {item.city}
                          <br></br>
                          {item.state} {item.country}
                          <br></br>
                          {phoneNumber}
                        </p>
                      </Link>
                    </div>
                  ))}
                </CarouselSlider>
              ) : (authenticated ?
                (
                <p><b>{firstName} {lastName}</b> <br></br> You have not added an address</p>
                ) : (
                  ''
                )
              )}
            </div>
            <CartList
              toggleCart={toggleCart}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
              all_currency={all_currency}
              selectCurrency={selectCurrency}
            />
          </div>
        ) : (
          <div className='empty-cart'>
            <ShoppingCart size={50}/>
            <p>Your shopping cart is empty</p>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className='cart-checkout'>
            <CartSummary
            cartTotal={cartTotal && cartTotal || 0}
            cartAmount={cartAmount && cartAmount || 0}
            serviceCharge={serviceCharge}
            all_currency={all_currency}
            selectCurrency={selectCurrency}
            shippingInfos={shippingInfos}
            isShippingOpen={isShippingOpen}
            toggleShipping={toggleShipping}
            sS={selectedShipping}
            termsSelected={termsSelected}
            termsRemoved={termsRemoved}
            shippingFormErrors={shippingFormErrors}
            toggleCart={toggleCart}
            />
            <Checkout
              handleShopping={handleShopping}
              handleCheckout={handleCheckout}
              newPlaceOrder={newPlaceOrder}
              authenticated={authenticated}
              orderIsLoading={orderIsLoading}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const sL = state.currency.select_currency.length;
  const {firstName, lastName} = state.account.user

  const sortedAddress = state.address.shippingAddress.sort((a, b) => b.isDefault - a.isDefault);
  const defaultAddress = [sortedAddress.length > 0 ? sortedAddress[0]._id : null];

  return {
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    serviceCharge: state.cart.serviceCharge,
    cartAmount: state.cart.cartAmount,
    authenticated: state.authentication.authenticated,
    user: state.account.user,

    all_currency: state.currency.all_currency,
    selectCurrency: sL > 0 ? state.currency.select_currency : state.currency.default_currency,
    firstName: firstName,
    lastName: lastName,
    address: state.address.shippingAddress,

    selectedAddress: state.cart.selectedAddress.length > 0 ? state.cart.selectedAddress : defaultAddress,
    phoneNumber: state.account.user.phoneNumber,

    shippingInfos: state.shipping.shippingInfos,
    isShippingOpen: state.shipping.isShippingOpen,
    selectedShipping: state.shipping.selectedShipping,
    shippingFormErrors: state.shipping.formErrors,
    orderIsLoading: state.payment.orderIsLoading,
  };
};

export default connect(mapStateToProps, actions)(Cart);
