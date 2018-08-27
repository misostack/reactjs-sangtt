import React, { Component} from 'react'
// import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { Pagination as Paginate, PaginationItem, PaginationLink } from 'reactstrap';

class Pagination extends Component {

  itemRender = () => {
    let { pageCount, currentPage } = this.props;

    if(pageCount < currentPage || currentPage < 1 ) currentPage = 1;

    let min = currentPage - 2;
    let max = currentPage + 2;
    let item = [];

    if (min < 1){
      min = 1;
      max = 5;
    }

    if (max > pageCount){
      max = pageCount;
      min = max - 4;
      if (min < 1) min = 1;
    }

    if (min > 1) item.unshift({ title: <i className="fa fa-ellipsis-h"></i> })


    if (currentPage > 1) {
      item.unshift({ title: <i className="fa fa-angle-left"></i>, page: currentPage == 1? 1 : currentPage -1 })
      item.unshift({ title: <i className="fa fa-angle-double-left "></i>, page: 1 })
    }
   
    for (let i = min; i <= max; i++){
      item.push({ title: i, page: i, current: i == currentPage ? true: false })
    }

    if (max < pageCount) item.push({ title: <i className="fa fa-ellipsis-h"></i> })

    if (currentPage < pageCount){
      item.push({ title: <i className="fa fa-angle-right"></i>, page: currentPage == pageCount ? pageCount : currentPage + 1 })
      item.push({ title: <i className="fa fa-angle-double-right "></i>, page: pageCount })
    }

    return item;
  }
  render() {
    let { onPageChange } = this.props;
    let item = this.itemRender();
    return (
      <div className="d-flex w-100 justify-content-center">
        <Paginate>
          {item.map((e, key) =>
            <PaginationItem key= {key} className={!!e.current ? 'active': ''}>
                {!!e.page ?
                  <PaginationLink onClick={() => onPageChange(e.page)}>
                    {e.title}
                  </PaginationLink>
                :
                  e.title
                }
              
            </PaginationItem>        
          )}
        </Paginate>
      </div>
    
    );
  }
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination;