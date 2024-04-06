import { FC, useEffect, useState } from 'react';
import s from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useLocation, useSearchParams } from 'react-router-dom';

export interface PaginationSelectedItem {
    selected: number
}

interface Pagination {
    handlePageClick: (selectedItem: PaginationSelectedItem) => void,
    pageCount?: number;
}

export const Pagination: FC<Pagination> = ({ handlePageClick, pageCount = 8 }) => {

    const onPageChange = (selectedItem: { selected: number }) => {
        handlePageClick(selectedItem);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }

    return (
        <ReactPaginate
            className={s.pagination}
            pageLinkClassName={s.pagination__button}
            activeLinkClassName={s.pagination__active_button}
            previousLinkClassName={s.pagination__previous__button}
            nextLinkClassName={s.pagination__next__button}
            breakLabel="..."
            nextLabel=">"
            onPageChange={onPageChange}
            pageRangeDisplayed={3} // кількість в діапазоні між останньою і першою  
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={1} // скільки виводиться в началі і в цінці 
        />
    )
}