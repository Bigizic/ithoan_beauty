/**
 *
 * Currencies
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

import AddToCurrency from '../../components/Store/AddToCurrency';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Currency extends React.PureComponent {

  render() {
    const {
      all_currency,
      currentCurrency,
      updateSelectCurrency,
      isLoading,
      authentication,
      user,
    } = this.props;

    const listAllCurrencyKeys = Object.keys(all_currency);

    const currentCurrencyIndex = listAllCurrencyKeys.indexOf(currentCurrency[0]);
    listAllCurrencyKeys.splice(currentCurrencyIndex, 1);

    return (
      <div className='mini-currency-list'>
        <div className='mini-currency-block'>
          {isLoading && <LoadingIndicator />}
          {listAllCurrencyKeys.map((currency, index) => (
            <div key={index} className='currency-item'>
              <AddToCurrency
                item={currency}
                updateSelectCurrency={updateSelectCurrency}
                authentication={authentication}
                user={user}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    all_currency: state.currency.all_currency,
    default_currency: state.currency.default_currency,
    select_currency: state.currency.select_currency,
    isLoading: state.currency.isLoading,
    authentication: state.authentication,
    user: state.account.user,
  }
};

export default connect(mapStateToProps, actions)(Currency);