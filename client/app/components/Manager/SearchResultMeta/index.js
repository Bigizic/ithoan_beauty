/**
 *
 * SearchResultMeta
 *
 */

import React from 'react';

const SearchResultMeta = props => {
  const { count, label } = props;

  return (
    <p className='fw-normal text-xl mt-3'>
      {count} {label}
    </p>
  );
};

export default SearchResultMeta;
