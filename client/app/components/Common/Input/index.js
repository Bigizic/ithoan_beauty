/**
 *
 * Input
 *
 */

import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Input = props => {
  const {
    autoComplete,
    type,
    value,
    error,
    step,
    decimals,
    min,
    max,
    disabled,
    placeholder,
    rows,
    label,
    name,
    onInputChange,
    inlineElement,
    className
  } = props;

  const handleIncrement = () => {
    if (value < max) {
      onInputChange(name, value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onInputChange(name, value - 1);
    }
  };

  const newOnChange = e => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue >= min && newValue <= max) {
      onInputChange(name, newValue);
    }
  };

  const _onChange = e => {
    if (e.target.name === 'image') {
      onInputChange(e.target.name, e.target.files[0]);
    } else {
      onInputChange(e.target.name, e.target.value);
    }
  };

  if (type === 'textarea') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <textarea
          type={'textarea'}
          onChange={e => {
            _onChange(e);
          }}
          rows={rows}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'textarea-text'}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else if (type === 'increment') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={styles} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: '5px'}}>
        {label && <label>{label}</label>}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          style={{ padding: '5px 10px', marginRight: '5px', }}
        >
          -
        </button>
        <input
          type="number"
          min={min || 0}
          max={max || null}
          disabled={disabled}
          name={name}
          value={value}
          onChange={(e) => {
            newOnChange(e)
          }}
          style={{ textAlign: 'center', width: '60px' }}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          style={{ padding: '5px 10px', marginLeft: '5px', }}
        >
          +
        </button>
        </div>
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else if (type === 'number') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    const handleOnInput = e => {
      if (!decimals) {
        e.target.value = e.target.value.replace(/[^0-9]*/g, '');
      }
    };
    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <input
          autoComplete={autoComplete}
          step='step'
          min={min || 0}
          max={max || null}
          pattern='[0-9]'
          onInput={handleOnInput}
          type={type}
          onChange={e => {
            _onChange(e);
          }}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'input-number'}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else if (type === 'stars') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <ReactStars
          name={name}
          starCount={5}
          size={30}
          color={'#adb5bd'}
          activeColor={'#ffb302'}
          a11y={true}
          isHalf={false}
          emptyIcon={<i className='fa fa-star' />}
          halfIcon={<i className='fa fa-star-half-alt' />}
          filledIcon={<i className='fa fa-star' />}
          value={value}
          onChange={value => {
            onInputChange(name, value);
          }}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else {
    const styles = `input-box${inlineElement ? ` inline-btn-box` : ''} ${
      error ? 'invalid' : ''
    }`;

    return (
      <div className={styles}>
        {label && <label>{label}</label>}
        <div className='input-text-block'>
          <input
            className={className && `${className} input-text` || 'input-text'}
            autoComplete={autoComplete}
            type={type}
            onChange={e => {
              _onChange(e);
            }}
            disabled={disabled}
            name={name}
            value={value}
            placeholder={placeholder}
          />
          {inlineElement}
        </div>
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  }
};

Input.defaultProps = {
  step: 1,
  decimals: true,
  rows: '4',
  inlineElement: null,
  autoComplete: 'on'
};

export default Input;
