/**
 *
 * Navigation
 * 
 */

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, NavLink as ActiveLink } from 'react-router-dom';
import { withRouter } from '@/withRouter';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import actions from '../../actions';
import Button from '../../components/Common/Button';
import CartIcon from '../../components/Common/CartIcon';
import { BarsIcon } from '../../components/Common/Icon';
import MiniBrand from '../../components/Store//MiniBrand';
import Currency from '../Currency';
import Menu from '../NavigationMenu';
import Cart from '../Cart';
import { currencyFunction } from '../../components/Common/currency/currency_function';
import Header from '@/components/Layout/Header';
import HomeMarquee from '@/components/HomePageSections/Marquee';

const MyComponent = (props) => {
  const [res, setRes] = useState(null);
  const { all_currency, selectCurrency, productPrice } = props;

  useEffect(() => {
    let isMounted = true;
    currencyFunction(all_currency, selectCurrency, productPrice)
      .then((result) => {
        if (isMounted) setRes(result);
      })
      .catch((error) => {
        console.error('Error in currencyFunction:', error);
      });

    return () => {
      isMounted = false;  // cleanup function
    };
  }, [all_currency, selectCurrency, productPrice]);

  return (
    res
  );
};

const Navigation = React.forwardRef((props, ref) => {
  class NavigationInner extends React.PureComponent {
    componentDidMount() {
      this.props.fetchOurCollections();
      this.props.fetchStoreBrands();
      this.props.fetchStoreCategories();
      this.props.fetchHomeBanner();
    }
    componentDidUpdate() {
      if (this.props.websiteInfoStatus) {
      } else {
        this.props.handleWebsiteInfo();
      }
    }
    componentWillUnmount() {
    }

    toggleBrand() {
      this.props.fetchStoreBrands();
      this.props.toggleBrand();
    }

    toggleMenu() {
      this.props.fetchStoreCategories();
      this.props.toggleMenu();
    }

    toggleCurrency() {
      this.props.fetchCurrentCurrency();
      this.props.toggleCurrency();
    }

    getSuggestionValue(suggestion) {
      return suggestion.name;
    }

    renderSuggestion = (suggestion, { query, isHighlighted }) => {
      const { all_currency, select_currency } = this.props;
      const BoldName = (suggestion, query) => {
        const matches = AutosuggestHighlightMatch(suggestion.name, query);
        const parts = AutosuggestHighlightParse(suggestion.name, matches);

        return (
          <div>
            {parts.map((part, index) => {
              const className = part.highlight
                ? 'react-autosuggest__suggestion-match'
                : null;
              return (<span className={className} key={index}> {part.text} </span>);
            })}
          </div>
        );
      };

      return (
        <Link to={`/product/${suggestion.slug}`}>
          <div className="d-flex">
            <img className="item-image" src={`${suggestion.imageUrl ? suggestion.imageUrl : '/images/placeholder-image.png'}`} />
            <div>
              <Container style={{ marginLeft: '10px' }}>
                <Row> <Col> <span className="name">{BoldName(suggestion, query)}</span> </Col> </Row>
                <Row>
                  <Col>
                    <MyComponent
                      all_currency={all_currency}
                      selectCurrency={select_currency}
                      productPrice={suggestion.price}
                    >
                    </MyComponent>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Link>
      );
    };

    render() {
      const {
        history,
        authenticated,
        user,
        cartItems,
        brands,
        categories,
        signOut,
        isMenuOpen,
        isCartOpen,
        isBrandOpen,
        toggleCart,
        toggleMenu,
        searchValue,
        suggestions,
        onSearch,
        onSuggestionsFetchRequested,
        onSuggestionsClearRequested,
        all_currency,
        select_currency,
        select_currency_length,
        default_currency,
        isCurrencyOpen,
        currencyLoading,
        websiteInfo,
        websiteInfoStatus,
        isLoading,
        homePageLoading,
        handleWebsiteInfo,
        showSearch,
        setShowSearch,
        categoriesProducts,
      } = this.props;


      const inputProps = {
        id: "inputPropsSearchProduct",
        placeholder: 'Search Products',
        value: searchValue,
        onChange: (_, { newValue }) => {
          onSearch(newValue);
        },
      };

      return (
        <header className="header fixed-mobile-header" ref={ref}>
          {websiteInfoStatus &&
            <div className='fixed top-0 w-full left-0' style={{ zIndex: '100000000' }}>
              <HomeMarquee
                text={<span className='mx-3'>{websiteInfo}</span>}
                type='new'
                className='bg-black text-white py-1'
                //gradient={true}
                //gradientWidth={"100px"}
                autoFill={true}
              />
            </div>

          }
          {/*websiteInfoStatus &&
            <Row className='website-info'>
              <div className='marquee-container'>
                <div className="marquee-text">{websiteInfo}</div>
              </div>
            </Row>
          */}

          <Header
            toggleBrand={this.toggleBrand}
            {...this.props}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            history={history}
          />

          {/* hidden cart drawer */}
          <div
            className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
            aria-hidden={`${isCartOpen ? false : true}`}
          >
            <div className='mini-cart'>
              <Cart />
            </div>
            <div
              className={
                isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
              }
              onClick={toggleCart}
            />
          </div>
        </header>
      );
    }
  }

  const mapStateToProps = (state) => {
    const localStorageSelectedCurrency = localStorage.getItem('select_currency');
    const selectCurrency = localStorageSelectedCurrency
      ? [localStorageSelectedCurrency]
      : state.currency.default_currency;
    return {
      isMenuOpen: state.navigation.isMenuOpen,
      isCartOpen: state.navigation.isCartOpen,
      isBrandOpen: state.navigation.isBrandOpen,
      showSearch: state.navigation.showSearch,
      cartItems: state.cart.cartItems,
      brands: state.brand.storeBrands,
      categories: state.category.storeCategories,
      categoriesProducts: state.category.categoriesProducts,
      authenticated: state.authentication.authenticated,
      user: state.account.user,
      searchValue: state.navigation.searchValue,
      suggestions: state.navigation.searchSuggestions,

      all_currency: state.currency.all_currency,
      select_currency:
        state.currency.select_currency.length > 0
          ? state.currency.select_currency
          : selectCurrency,
      default_currency: state.currency.default_currency,
      isCurrencyOpen: state.currency.isCurrencyOpen,
      select_currency_length: state.currency.select_currency
        ? state.currency.select_currency.length
        : 1,
      currencyLoading: state.currency.isLoading,

      websiteInfo: state.navigation.websiteInfo,
      websiteInfoStatus: state.navigation.websiteInfoStatus,
      isLoading: state.product.isLoading,
      homePageLoading: state.homepage.homePageIsLoading,
    };
  };

  const ConnectedNavigation = connect(
    mapStateToProps,
    actions
  )(withRouter(NavigationInner));

  return <ConnectedNavigation {...props} />;
});

export default Navigation;