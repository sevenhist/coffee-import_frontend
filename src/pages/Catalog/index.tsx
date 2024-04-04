import { Container } from 'components/ui/Container';
import s from './Catalog.module.scss';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchCategories, selectCategories } from 'features/user/shopSlice';
import { Link } from 'react-router-dom';
import { ROUTES } from 'app/routes';
import ReactPaginate from 'react-paginate';
import { Pagination, PaginationSelectedItem } from 'components/ui/Pagination';
import { usePagination } from 'shared/hooks/usePagination';
import { CatalogCard } from 'components/CatalogCard';
import { PageLoader } from 'components/Loader';
import { setPageLoader } from 'features/user/userSlice';


interface Catalog { }

export const Catalog: FC<Catalog> = () => { 
    const dispatch = useAppDispatch();
    
    const categories = useAppSelector(selectCategories)
    useEffect(() => {
        // Datenabruf starten
        dispatch(fetchCategories())
    }, []);
    
    const result = usePagination({array: categories, itemsPerPage: 32})
    const filteredCategories = result.slicedArray
    return (
        <div className={s.categories}>
            <Container>
                <div className={`${s.productList__title} ${s.title}`}>
                    Кавове обладнання
                </div>
                <CatalogCard array={filteredCategories} classname={s.category_list}/>
                <Pagination handlePageClick={result.handlePageClick} pageCount={result.pageCount} />
            </Container>
        </div>
    )
}

interface PaginatedItems {
    itemsPerPage: number
}

