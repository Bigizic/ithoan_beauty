/**
 *
 *  Range Slider
 *
 */

import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import { currency } from '../currency/currency';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, all_currency, selectCurrency, ...restProps } = props;
  const currencySymbol = all_currency[selectCurrency]
  return (
    <SliderTooltip
      prefixCls='rc-slider-tooltip'
      overlay={`${currencySymbol}${value}`}
      visible={dragging}
      placement='top'
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 50,
      rangeValue: this.props.defaultValue
    };
  }

  onSliderChange = v => {
    this.setState({
      sliderValue: v
    });
  };

  onRangeChange = v => {
    this.setState({
      rangeValue: v
    });
  };

  onAfterSliderChange = value => {
    this.props.onChange(value);
  };

  onAfterRangeChange = value => {
    this.props.onChange(value);
  };

  render() {
    const {
      type = 'range',
      marks, step,
      defaultValue,
      min, max,
      allowCross = true,
      all_currency,
      selectCurrency
    } = this.props;
    const { sliderValue, rangeValue } = this.state;

    return (
      <>
        {type === 'slider' ? (
          <Slider
            className='slider'
            dots
            reverse
            allowCross={allowCross}
            step={step}
            defaultValue={defaultValue}
            marks={marks}
            value={sliderValue}
            onChange={this.onSliderChange}
            onAfterChange={this.onAfterSliderChange}
          />
        ) : (
          <Range
            className='slider'
            pushable={min > 1000 ? 500 : 1}
            allowCross={allowCross}
            min={min}
            max={max}
            step={step}
            defaultValue={defaultValue}
            marks={marks}
            handle={(props) =>
              handle({ ...props, all_currency, selectCurrency })
            }            
            tipFormatter={value => `${all_currency[selectCurrency]}${value}`}
            value={rangeValue}
            onChange={this.onRangeChange}
            onAfterChange={this.onAfterRangeChange}
          />
        )}
      </>
    );
  }
}

export default RangeSlider;
