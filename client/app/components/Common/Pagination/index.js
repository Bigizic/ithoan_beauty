/**
 *
 * Pagination
 *
 */

import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = props => {
  const { totalPages, onPagination, currentPage } = props;
  const handlePageClick = event => {
    onPagination('pagination', event.selected + 1);
  };

  return (
    <div className='pagination-box'>
      <ReactPaginate
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages} // The total number of pages.
        previousLabel='<'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
        showFirstButton showLastButton
      />
    </div>
  );
};

export default Pagination;
