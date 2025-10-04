/**
 *
 * Tooltip
 *
 */

import React from 'react';

import { UncontrolledTooltip } from 'reactstrap';

const Tooltip = props => {
  const { target, placement = 'top', children } = props;

  return (
    <UncontrolledTooltip placement={placement} target={target}>
      {children}
    </UncontrolledTooltip>
  );
};

export default Tooltip;
