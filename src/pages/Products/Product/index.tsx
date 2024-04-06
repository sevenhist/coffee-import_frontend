import { FC, ReactNode, useEffect, useState } from 'react'
import s from './Product.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchProduct, selectOneProduct, selectProducts } from 'features/user/shopSlice';
import { NotFoundPage } from 'pages/NotFoundPage';
import { Container } from 'components/ui/Container';
import { Button } from 'components/ui/Button';
import { Characters } from './Characters';
import { ROUTES } from 'app/routes';
import { NavigationProduct } from './NavigationProduct';
import { CartModal } from 'components/CartModal';
import { IProduct } from 'models/IProduct';
import { addProductToCart } from 'features/user/cartSlice';
import { useLockedBody } from 'usehooks-ts';


export const Product: FC = () => {
    const { id } = useParams()
    const dipsatch = useAppDispatch()
    const [visibleCartMenu, setVisibleCartMenu] = useState(false);
    const [locked, setLocked] = useLockedBody(false, 'root')
    const product = useAppSelector(selectOneProduct)

    const zoomPicture = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLElement

        const x = e.clientX - target.offsetLeft;
        const y = e.clientY - target.offsetTop;
        target.style.transformOrigin = `${x}px ${y}px`;
        target.style.transform = 'scale(1.4)';

    }
    const getNormalPicture = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLElement
        target.style.transformOrigin = `left`;
        target.style.transform = 'scale(1)';
    }
    const addProductInCart = (product: IProduct) => {
        dipsatch(addProductToCart(product))
    }
    useEffect(() => {
        dipsatch(fetchProduct(id as string))
    }, [id]) // позволяет указывать функцию, которая будет запущена после того, как React обновит DOM(сайт)
    if (!product) {
        return (
            <NotFoundPage />
        )
    }
    return (
        <div className={s.product}>
            <Container>
                <div className={s.product__wrapper}>
                    <div className={s.product__all}>
                        <div className={s.product__content}>
                            <div className={s.product__img}>
                                <div className={s.product__magnify}>
                                    <img onMouseLeave={(e) => getNormalPicture(e)} onMouseMove={(e) => zoomPicture(e)} className={s.product__image} src={product.imgUrl} alt={product.title} />
                                </div>
                            </div>
                            <div className={s.product__info}>
                                <h1 className={`${s.product__title} ${s.title} ${s.title_secondary}`}>{product.title}</h1>
                                <div className={`${s.product__rating} ${s.rating_product}`}>
                                    <div className={s.rating_product__block}>
                                        <div className={`${s.rating_product__stars} ${s.rating}`}>
                                            <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                            <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                            <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                            <span className={`${s.rating__star} ${s.rating__star_active}`}></span>
                                            <span className={`${s.rating__star}`}></span>
                                        </div>
                                        <a href='#' className={s.rating_product__response}>
                                            Залишити відгук
                                        </a>
                                    </div>
                                    <p className={s.rating_product__code}>
                                        Код виробника: 
                                        <span> {product.vendorCode}</span>
                                    </p>
                                </div>
                                <div className={`${s.product__buy} ${s.product__wrap}`}>
                                    <div className={`${s.product__sell} ${s.sell_product}`}>
                                        <div className={s.sell_product__info}>
                                            Замовлення зроблене до 11-ї години відправимо того ж дня!
                                        </div>
                                        <div className={s.sell_product__status}>
                                            Готовий до відправки
                                        </div>
                                    </div>
                                    <ul className={s.product__prices}>
                                        <li className={`${s.product__price} ${s.product__price_old}`}>
                                            {parseFloat(product.price) * 0.9} ₴
                                        </li>
                                        <li className={`${s.product__price} ${s.product__price_current}`}>
                                            {product.price} ₴
                                        </li>
                                    </ul>
                                    <Button onClick={() => {addProductInCart(product)}} className={s.product__btn}>Купити</Button>
                                </div>
                                <div className={`${s.product__wrap} ${s.delivery_product}`}>
                                    <div className={s.delivery_product__title}>
                                        <span>Доставка</span>
                                        <a href='#' className={s.delivery_product__details}>
                                            Подробиці про доставку
                                        </a>
                                    </div>
                                    <ul className={s.delivery_product__methods}> 
                                        <li className={s.delivery_product__method}>
                                            <i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" fill="currentColor"><path d="M287.16 248c5.184-11.256 8.232-23.664 8.68-36.744 20.704-21.864 32.16-50.28 32.16-80.512V96c0-20.256-15.144-37.056-34.704-39.648C276.512 21.96 241.632 0 203.072 0h-13.464c-26.016 0-51.664 8.8-72.208 24.776C88.544 47.216 72 81.056 72 117.608v13.136c0 30.232 11.456 58.648 32.168 80.512 1.04 30.68 16.488 57.712 39.832 74.56v19.768L81.44 319.48C33.488 330.144 0 371.88 0 421.008V496h496V248H287.16zM104 152v33.304c-10.376-16.144-16-34.912-16-54.56v-13.136c0-31.584 14.296-60.824 39.224-80.208A102.15 102.15 0 0 1 189.608 16h13.464a84.31 84.31 0 0 1 77.576 51.152l2.08 4.848H288c13.232 0 24 10.768 24 24v34.744c0 19.648-5.624 38.416-16 54.56V120h-17.536l-2.76 1.104C224.456 141.6 170.48 152 115.264 152H104zM80 448v32H16v-58.992c0-41.56 28.336-76.888 68.904-85.896L104 330.864V448H80zm192 32H96v-16h24V327.304l24-5.336V464h112V321.968l16 3.56V480zm-72-104c15.664 0 29.824-6.48 40-16.888V448h-80v-88.888C170.176 369.52 184.336 376 200 376zm-40-56v-24.84c12.192 5.616 25.712 8.84 40 8.84s27.808-3.224 40-8.84V320c0 22.056-17.944 40-40 40s-40-17.944-40-40zm112-10.864l-16-3.552v-19.768c5.872-4.232 11.232-9.104 16-14.528v37.848zM280 208c0 44.112-35.888 80-80 80s-80-35.888-80-80v-40.024c55.016-.568 108.816-11.12 160-31.368V208zm88 56h32v64h-32v-64zm112 216H288V264h64v80h64v-80h64v216zm-32-32h16v16h-16zm-64 0h48v16h-48zm0-32h80v16h-80z"></path></svg></i>
                                            <p>Самовивіз із Нової Пошти</p>
                                            <span>по тарифам перевізника</span>
                                        </li>
                                        <li className={s.delivery_product__method}>
                                            <i><svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 0 495 496" fill="currentColor"><path d="M8.5 432.023a7.99 7.99 0 0 1-8-8c0-39.71 32.305-72.016 72.016-72.016 4.426 0 8 3.578 8 8a7.99 7.99 0 0 1-8 8c-30.887 0-56.016 25.13-56.016 56.016a7.99 7.99 0 0 1-8 8zm0 0"></path><path d="M128.5 368.016l-55.984-.008a8 8 0 0 1-8-8c0-4.422 3.586-8 8-8l55.984.008a8 8 0 1 1 0 16zm144 0l-32-.008c-4.426 0-8-3.582-8-8s3.586-8 8-8l32 .008a8 8 0 1 1 0 16zM8.508 488a8 8 0 0 1-8-8L.5 424.023a8 8 0 0 1 8-8c4.414 0 8 3.578 8 8L16.508 480a8 8 0 0 1-8 8zm0 0"></path><path d="M16.508 496a16.02 16.02 0 0 1-16-16c0-4.426 3.578-8 8-8a7.99 7.99 0 0 1 8 8v.016c4.426 0 8 3.57 8 7.992a7.99 7.99 0 0 1-8 7.992zm0 0"></path><path d="M328.5 496H16.508c-4.422 0-8-3.574-8-8s3.578-8 8-8H328.5a8 8 0 1 1 0 16zm-200-127.984a7.99 7.99 0 0 1-8-8v-45.848a8 8 0 1 1 16 0v45.848a7.99 7.99 0 0 1-8 8zm0 0"></path><path d="M240.5 368.008a7.99 7.99 0 0 1-8-8v-45.84a7.99 7.99 0 1 1 16 0v45.84a7.99 7.99 0 0 1-8 8zm0 0"></path><path d="M184.5 336.008c-70.574 0-128-57.422-128-128 0-4.422 3.574-8 8-8s8 3.578 8 8c0 61.762 50.238 112 112 112s112-50.238 112-112c0-4.422 3.574-8 8-8s8 3.578 8 8c0 70.578-57.426 128-128 128zM304.5 144a7.99 7.99 0 0 1-8-8c0-61.762-50.238-112-112-112s-112 50.238-112 112a8 8 0 1 1-16 0c0-70.574 57.426-128 128-128s128 57.426 128 128a7.99 7.99 0 0 1-8 8zm0 0"></path><path d="M64.5 216.008a7.99 7.99 0 0 1-8-8V168a8 8 0 1 1 16 0v40.008a7.99 7.99 0 0 1-8 8zm240 0a7.99 7.99 0 0 1-8-8V168a8 8 0 1 1 16 0v40.008a7.99 7.99 0 0 1-8 8zm0 0"></path><path d="M320.5 176h-272a7.99 7.99 0 1 1 0-16h272a7.99 7.99 0 1 1 0 16zm0 0"></path><path d="M320.5 176c-2.176 0-4.352-.88-5.93-2.625C314.363 173.16 285.34 144 184.5 144S54.645 173.16 54.355 173.457c-3.03 3.168-8.07 3.344-11.27.367-3.203-2.984-3.457-7.945-.516-11.19 1.28-1.418 32.64-34.625 141.93-34.625s140.648 33.207 141.93 34.625a8.01 8.01 0 0 1-.555 11.305c-1.535 1.375-3.453 2.063-5.375 2.063zm0 0"></path><path d="M304.5 165.273c-4.426 0-8-3.578-8-8V136a8 8 0 1 1 16 0v21.273c0 4.422-3.574 8-8 8zm-240 0c-4.426 0-8-3.578-8-8V136a8 8 0 1 1 16 0v21.273c0 4.422-3.574 8-8 8zM184.5 112c-17.648 0-32-14.352-32-32s14.352-32 32-32 32 14.352 32 32-14.352 32-32 32zm0-48a16.02 16.02 0 0 0-16 16 16.02 16.02 0 0 0 16 16 16.02 16.02 0 0 0 16-16 16.02 16.02 0 0 0-16-16zm0-40a7.99 7.99 0 0 1-8-8V8a8 8 0 1 1 16 0v8a7.99 7.99 0 0 1-8 8zm-24.008 359.992a7.97 7.97 0 0 1-3.559-.84l-32-15.977c-3.953-1.97-5.562-6.777-3.586-10.727 1.977-3.97 6.8-5.54 10.727-3.586l32 15.977c3.953 1.97 5.563 6.777 3.586 10.727-1.398 2.8-4.23 4.426-7.168 4.426zm0 0"></path><path d="M160.5 383.992c-3.352 0-6.48-2.13-7.594-5.48a8.01 8.01 0 0 1 5.074-10.12l24-7.977c4.2-1.367 8.72.883 10.12 5.074a8.01 8.01 0 0 1-5.074 10.12l-24 7.977c-.84.27-1.695.406-2.527.406zm48.008 0c-2.937 0-5.77-1.617-7.168-4.434-1.977-3.95-.367-8.758 3.586-10.727l32-15.977c3.95-1.96 8.766-.367 10.727 3.586 1.977 3.95.367 8.758-3.586 10.727l-32 15.977a7.9 7.9 0 0 1-3.559.848zm0 0"></path><path d="M208.5 383.992a8.23 8.23 0 0 1-2.52-.406l-24-7.977c-4.2-1.402-6.465-5.922-5.074-10.12 1.402-4.184 5.938-6.44 10.12-5.074l24 7.977c4.2 1.402 6.465 5.922 5.074 10.12a8.03 8.03 0 0 1-7.602 5.48zm-23.762 32c-4.422 0-8.04-3.578-8.04-8s3.535-8 7.953-8h.086c4.418 0 8 3.574 8 8a8 8 0 0 1-8 8zM456.5 496h-184a7.99 7.99 0 0 1-8-8V360.016c0-4.422 3.574-8 8-8h184c4.426 0 8 3.578 8 8V488a7.99 7.99 0 0 1-8 8zm-176-16h168V368.016h-168zm0 0"></path><path d="M272.492 366.664a7.91 7.91 0 0 1-4.922-1.703c-3.477-2.723-4.094-7.754-1.367-11.227l24-30.672a7.98 7.98 0 0 1 11.227-1.367c3.477 2.72 4.094 7.754 1.367 11.227l-24 30.672c-1.57 2.016-3.93 3.07-6.305 3.07zm184.016 1.352a7.98 7.98 0 0 1-6.406-3.2l-24-32.023c-2.656-3.527-1.937-8.547 1.598-11.2 3.535-2.664 8.555-1.937 11.2 1.598l24 32.023c2.656 3.53 1.938 8.547-1.598 11.2-1.434 1.082-3.12 1.602-4.785 1.602zm0 0"></path><path d="M432.5 335.992h-136c-4.426 0-8-3.578-8-8a7.99 7.99 0 0 1 8-8h136a7.99 7.99 0 0 1 8 8c0 4.422-3.574 8-8 8zm0 0"></path><path d="M344.508 367.496a7.97 7.97 0 0 1-1.977-.25c-4.277-1.086-6.87-5.437-5.785-9.72l8-31.488c1.1-4.297 5.473-6.9 9.723-5.78 4.277 1.086 6.87 5.438 5.785 9.72l-8 31.488c-.922 3.625-4.18 6.03-7.746 6.03zm39.984.52a8 8 0 0 1-7.754-6.062l-8-32.023c-1.078-4.28 1.53-8.625 5.824-9.7 4.28-1.086 8.625 1.53 9.7 5.824l8 32.023c1.078 4.28-1.53 8.625-5.824 9.7a8.13 8.13 0 0 1-1.945.238zm0 0"></path><path d="M344.5 407.992c-4.426 0-8-3.578-8-8v-40.504a8 8 0 1 1 16 0v40.504c0 4.422-3.574 8-8 8zm40 0c-4.426 0-8-3.578-8-8v-39.977c0-4.422 3.574-8 8-8s8 3.578 8 8v39.977c0 4.422-3.574 8-8 8zm0 0"></path><path d="M384.5 407.992h-40c-4.426 0-8-3.578-8-8a7.99 7.99 0 0 1 8-8h40a7.99 7.99 0 0 1 8 8c0 4.422-3.574 8-8 8zm0 0"></path></svg></i>
                                            <p>Кур’єром на вашу адресу</p>
                                            <span>по тарифам перевізника</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className={`${s.product__wrap} ${s.details_product}`}>
                                    <ul className={s.details_product__list}>
                                        <li className={s.details_product__item}>
                                            <i><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 12h2v4h-2z"></path><path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM5 5h13v2H5a1.001 1.001 0 0 1 0-2zm15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15v10z"></path></svg></i>
                                            <p>
                                                <span className={s.details_product__title}>Оплата.</span>
                                                Оплата під час отримання товару, Оплата карткою у відділенні, Приватбанк, Google Pay, Apple Pay, Visa, Mastercard
                                            </p>
                                        </li>
                                        <li className={s.details_product__item}>
                                            <i><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z"></path><path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z"></path></svg></i>
                                            <p>
                                                <span className={s.details_product__title}>Гарантія.</span>
                                                Законом про захист прав споживачів не передбачено повернення цього товару належної якості.
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={s.product__more}>
                            <div className={s.product__block}>
                                <h2 className={s.product__subtitle}>Описання товару</h2>
                                <div className={s.product__description}>
                                    {product.description}
                                </div>
                            </div>
                            <Characters />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}