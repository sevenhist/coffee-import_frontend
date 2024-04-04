import { useAppDispatch, useAppSelector } from "app/hooks"
import { Pagination } from "components/ui/Pagination"
import { fetchOneCategory, fetchProduct, fetchProducts, selectOneCategory, selectOneProduct, selectProducts } from "features/user/shopSlice"
import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { usePagination } from "shared/hooks/usePagination"
import s from './Products.module.scss';
import { Container } from "components/ui/Container"
import { IProduct } from "models/IProduct"
import { Button } from "components/ui/Button"
import { addProductToCart, selectCartProducts } from "features/user/cartSlice"
import { Product } from "./Product"
import { ROUTES } from "app/routes"
import { CartModal } from "components/CartModal"
import { useLockedBody } from "hooks/useScrollLock"
import { ProductCard } from "components/ProductCard"
import { setPageLoader } from "features/user/userSlice"


export const Products = () => {
    const { categoryId } = useParams()
    const dispatch = useAppDispatch()
    const products = useAppSelector(selectProducts)
    const category = useAppSelector(selectOneCategory)
    useEffect(() => {
        dispatch(fetchProducts(categoryId as string))
        dispatch(fetchOneCategory(categoryId as string))
    }, [])
    const [visibleCartMenu, setVisibleCartMenu] = useState(false);
    const [locked, setLocked] = useLockedBody(false, 'root')

    const itemsPerPage = 32
    const result = usePagination({ array: products, itemsPerPage })

    const filteredProducts = result.slicedArray
    return (
        <div className={s.products}>
            <Container>
                <h2 className={s.products__title}>{category?.title}</h2>
                <ProductCard array={filteredProducts} />
                {
                    products.length > itemsPerPage && <Pagination handlePageClick={result.handlePageClick} pageCount={result.pageCount} />
                }
            </Container>
        </div>
    )
}