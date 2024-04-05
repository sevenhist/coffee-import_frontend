import { FC, useState } from "react"
import s from "./Productmodule.module.scss"
import { IProduct } from "models/IProduct"
import { Link } from "react-router-dom"
import { ROUTES } from "app/routes"
import { Button } from "components/ui/Button"
import { useAppDispatch } from "app/hooks"
import { addProductToCart } from "features/user/cartSlice"
import { useLockedBody } from "hooks/useScrollLock"
import { CartModal } from "components/CartModal"

interface ProductCardProps {
    array: IProduct[]
}

export const ProductCard: FC<ProductCardProps> = ({ array }) => {
    const dispatch = useAppDispatch()
    const [visibleCartMenu, setVisibleCartMenu] = useState(false);
    const [locked, setLocked] = useLockedBody(false, 'root')

    const addProductInCart = (product: IProduct) => {
        dispatch(addProductToCart(product))
        setVisibleCartMenu(!visibleCartMenu)
        setLocked(!locked)
    }
    const closeCartMenu = () => {
        setVisibleCartMenu(false)
        setLocked(false);
    }

    return (
        <ul className={s.products__list}>
            {
                array.map((product: IProduct) => {
                    return (
                        <div className={s.productInfoContainer} key={product.id}>
                            <Link to={`${ROUTES.product}/${product.id}`} className={s.products__list__item}>
                                <div className={s.products__list__actions}>
                                    <div className={`${s.products__list__action} ${s.products__list__action__sale}`}>
                                        Акція -50%
                                    </div>
                                    <div className={`${s.products__list__action} ${s.products__list__action__top}`}>
                                        Топ продажу
                                    </div>
                                </div>
                                <a className={s.products__list__img} href={product.id}>
                                    <img className={s.products__list__image} src={product.imgUrl} alt={product.title} />
                                </a>
                                <a className={s.products__list__title}>
                                    <span>{product.title}</span>
                                </a>
                                <div className={s.products__list__info}>
                                    <a>{product.description}</a>
                                </div>
                                <div className={s.products__list__box}>
                                    <div className={`${s.products__list__rating} ${s.rating}`}>
                                        <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                        <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                        <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                        <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                        <span className={s.rating__star}></span>
                                    </div>
                                    <a href="#" className={s.products__list__response}>
                                        Написати відгук
                                    </a>
                                </div>
                                <div className={s.products__list__prices}>
                                    <div className={`${s.products__list__price} ${s.products__list__price__old}`}>
                                        {parseInt(product.price) * 2} ₴
                                    </div>
                                    <div className={`${s.products__list__price} ${s.products__list__price__new}`}>
                                        {product.price} ₴
                                    </div>
                                </div>
                            </Link>
                            <Button onClick={() => { addProductInCart(product) }} className={s.products__list__btn}>Купити</Button>
                        </div>
                    )
                })
            }
            <CartModal closeCartMenu={closeCartMenu} visibleCartMenu={visibleCartMenu} />
        </ul>
    )
}