/**
 *
 * Button
 *
 */

import React from 'react';

import Tooltip from '../Tooltip';
import Popover from '../Popover';

const variants = {
  primary: 'custom-btn-primary',
  secondary: 'custom-btn-secondary',
  danger: 'custom-btn-danger',
  link: 'custom-btn-link',
  dark: 'custom-btn-dark',
  none: 'custom-btn-none',
  empty: ''
};

const Button = props => {
  const {
    id,
    size = 'md',
    variant = 'secondary',
    tabIndex,
    ariaLabel,
    ariaExpanded,
    type = 'button',
    disabled,
    className = '',
    text,
    role,
    icon,
    iconDirection = 'left',
    iconClassName = '',
    borderless = false,
    round = 5,
    onClick,
    tooltip = false,
    tooltipContent,
    popover = false,
    popoverContent,
    popoverTitle,
    left,

    extraIconClassName
  } = props;

  const v = variant ? variants[variant] : '';

  const btnVariant = v;

  const btn =
    icon && text ? 'with-icon' : icon && !text ? 'icon-only' : 'text-only';

  const classNames = `input-btn${`${className && ` ${className}`}`}${
    btnVariant && ` ${btnVariant}`
  }${` ${size}`} ${btn} ${
    iconDirection === 'left' ? 'icon-left' : 'icon-right'
  } ${borderless ? 'border-0' : ''}`;

  const iconClassNames = `btn-icon ${extraIconClassName && extraIconClassName} ${`${iconClassName && ` ${iconClassName}`}`}`;

  const tooltipId = tooltip ? `tooltip-${id}` : id;
  const popoverId = popover ? `popover-${id}` : id;
  const btnId = tooltip ? tooltipId : popoverId;

  return (
    <button
      id={btnId}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      role={role}
      disabled={disabled}
      className={classNames}
      type={type}
      onClick={onClick}
      style={{
        borderRadius: round,
        left: left
      }}
    >
      {tooltip && <Tooltip target={tooltipId}>{tooltipContent}</Tooltip>}
      {popover && (
        <Popover target={popoverId} popoverTitle={popoverTitle}>
          {popoverContent}
        </Popover>
      )}
      {iconDirection === 'left' ? (
        <>
          {icon && <div className={iconClassNames}>{icon}</div>}
          {text && <span className='btn-text'>{text}</span>}
        </>
      ) : (
        <>
          {text && <span className='btn-text'>{text}</span>}
          {icon && <div className={iconClassNames}>{icon}</div>}
        </>
      )}
    </button>
  );
};

export default Button;
