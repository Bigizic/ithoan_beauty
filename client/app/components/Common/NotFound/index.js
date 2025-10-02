/**
 *
 * NotFound
 *
 */

import React from 'react';

const NotFound = props => {
  const { message, className = '', children } = props;
  return (
    <div className={`not-found ${className}`}>
      {message ? message : children}
    </div>
  );
};

export default NotFound;
