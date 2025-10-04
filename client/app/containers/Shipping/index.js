/**
 * shipping index
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

import{ DropdownItem, DropdownMenu } from 'reactstrap';


class Shipping extends React.PureComponent {
  render () {
    const {
        shippingInfos,
        shippingKeys,

        selectShipping
    } = this.props;

    return (
          <DropdownMenu>
            {shippingKeys && shippingKeys.map((k, index) => (
              <DropdownItem
                key={index}
                onClick={() => selectShipping(k)}
              >
                {shippingInfos[k][0]}
              </DropdownItem>
            ))}
          </DropdownMenu>
      );
    }
}

const mapStateToProps = state => {
  return {
    shippingInfos: state.shipping.shippingInfos,
  };
};

export default connect(mapStateToProps, actions)(Shipping);
