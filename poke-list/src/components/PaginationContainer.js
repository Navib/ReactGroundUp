import React from 'react';
import { Col } from 'react-bootstrap/lib/';
import ReactPaginate from 'react-paginate';

const PaginationContainer = ({pageCount, btnSize, activePage, onPageChange, bsStyle}) => {

  return (
    <Col sm={12}>
      {pageCount > 1 ?
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={5}
          activePage={activePage}
          onPageChange={onPageChange}
          forcePage={activePage - 1}
          bsStyle={bsStyle}
        />
        : null
      }
    </Col>
  )
}

export default PaginationContainer;
