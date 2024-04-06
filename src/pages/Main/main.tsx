import s from './Main.module.scss';
import 'swiper/css';
import swipeimg from '../../img/coffeemaschine.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Button, LinkButton, RedButton, RedLinkButton } from 'components/ui/Button';
import { Container } from 'components/ui/Container';
import { ROUTES } from 'app/routes';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchAllProducts, fetchCategories, fetchProducts, selectCategories, selectProducts } from 'features/user/shopSlice';
import { Link } from 'react-router-dom';
import { Title } from 'components/ui/Title';
import secondCoffeMachine from "../../img/secondcoffeeimage.jpeg";
import thirdCoffeMachine from "../../img/thirdCoffeeMachine.webp";
import { IProduct } from 'models/IProduct';
import { addProductToCart } from 'features/user/cartSlice';
import { useLockedBody } from 'hooks/useScrollLock';
import { CartModal } from 'components/CartModal';
import { Product } from 'pages/Products/Product';
import { Products } from 'pages/Products';
import { ProductCard } from 'components/ProductCard';
import { CatalogCard } from 'components/CatalogCard';
import coffeemachinewithcoffies from "../../img/coffeemachinewithcoffees.jpeg"


export const Main = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchAllProducts())
    }, [])
    const categories = useAppSelector(selectCategories);
    const products = useAppSelector(selectProducts)

    const filteredCategories = categories.slice(0, 7);
    const filteredProducts = products.slice(0, 8);
    const slides = [
        {
            image: coffeemachinewithcoffies,
            title: 'Кофемашина',
            action: 'Акція -35%',
            sale: 'Встигни купити дешевше',
            buttonText: 'Дізнатись детальніше'
        },
        {
            image: secondCoffeMachine,
            title: 'Кофемашина',
            action: 'Акція -55%',
            sale: 'Встигни купити дешевше',
            buttonText: 'Дізнатись детальніше'
        },
        {
            image: thirdCoffeMachine,
            title: 'Кофемашина',
            action: 'Акція -75%',
            sale: 'Встигни купити дешевше',
            buttonText: 'Дізнатись детальніше'
        }
    ]

    const cards = [
        {
            id: 1,
            image: "https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg",
            title: "В мене є питання"
        },
        {
            id: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6fCRhm1-g2ggWVzkn0xI-s8fAz850teipg&usqp=CAU",
            title: "Як користуватися?"
        },
        {
            id: 3,
            image: "https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg",
            title: "В мене є питання"
        },
        {
            id: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6fCRhm1-g2ggWVzkn0xI-s8fAz850teipg&usqp=CAU",
            title: "Як користуватися?"
        },
        {
            id: 5,
            image: "https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg",
            title: "В мене є питання"
        },
        {
            id: 6,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6fCRhm1-g2ggWVzkn0xI-s8fAz850teipg&usqp=CAU",
            title: "Як користуватися?"
        },
        {
            id: 7,
            image: "https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg",
            title: "В мене є питання"
        },
    ]

    return (
        <div className={s.main}>
            <Container>
                <div className={s.main__wrapper}>
                    <div className={s.mySwiper}>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            autoplay={{ delay: 3000 }}
                            centeredSlides={true}
                            speed={1000}
                            loop={true}
                            className={s.swiper}
                        >
                            {slides.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className={s.slide}>
                                        <img className={s.slide__img} src={item.image} />
                                        <div className={s.slide__block}>
                                            <h3 className={s.slide__title}>{item.title}</h3>
                                            <h2 className={s.slide__action}>{item.action}</h2>
                                            <h3 className={s.slide__sale}>{item.sale}</h3>
                                            <RedButton className={s.slide__button}>{item.buttonText}</RedButton>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className={s.catalog__button__container}>
                        <LinkButton to={ROUTES.catalog} variables="fitContent" className={s.button__catalog}>
                            <svg className={s.menu__catalog__icon} viewBox="0 0 24 24" fill="currentColor" id="icon-catalog"><g clipRule="evenodd" fillRule="evenodd"><path d="m17 2.75735-4.2427 4.24264 4.2427 4.24261 4.2426-4.24261zm-5.6569 2.82843c-.7811.78104-.7811 2.04738 0 2.82842l4.2426 4.2427c.7811.781 2.0475.781 2.8285 0l4.2426-4.2427c.781-.78104.781-2.04738 0-2.82842l-4.2426-4.24264c-.781-.781048-2.0474-.781048-2.8285 0z"></path><path d="m7 4h-4c-.55228 0-1 .44772-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.55228-.44772-1-1-1zm-4-2c-1.65685 0-3 1.34315-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.65685-1.34315-3-3-3z"></path><path d="m7 16h-4c-.55228 0-1 .4477-1 1v4c0 .5523.44772 1 1 1h4c.55228 0 1-.4477 1-1v-4c0-.5523-.44772-1-1-1zm-4-2c-1.65685 0-3 1.3431-3 3v4c0 1.6569 1.34315 3 3 3h4c1.65685 0 3-1.3431 3-3v-4c0-1.6569-1.34315-3-3-3z"></path><path d="m19 16h-4c-.5523 0-1 .4477-1 1v4c0 .5523.4477 1 1 1h4c.5523 0 1-.4477 1-1v-4c0-.5523-.4477-1-1-1zm-4-2c-1.6569 0-3 1.3431-3 3v4c0 1.6569 1.3431 3 3 3h4c1.6569 0 3-1.3431 3-3v-4c0-1.6569-1.3431-3-3-3z"></path></g></svg>
                            <span>Каталог товарів</span>
                        </LinkButton>
                    </div>
                    <div className={s.small__actions}>
                        <div className={`${s.small__action} ${s.action}`}>
                            <h2 className={s.action__title}>SIEMENS TE651319RW</h2>
                            <p className={s.action__sale}>-50%</p>
                            <p className={s.action__text}>Встигни купити дешевше!</p>
                            <div className={s.action__image}>
                                <img src='https://www.visitdubai.com/-/media/images/leisure/campaigns/dubai-presents/itineraries/nature/nature-header-2.jpg?&cw=256&ch=256' />
                                <div className={s.action__prices}>
                                    <div className={s.action__prices__old}>33999</div>
                                    <div className={s.action__prices__new}>16999</div>
                                </div>
                            </div>
                            <RedLinkButton href='#'>Купити</RedLinkButton>
                        </div>
                        <div className={`${s.small_action} ${s.action}`}>
                            <h2 className={s.action__title}>PHILIPS EP0820/00</h2>
                            <p className={s.action__sale}>-25%</p>
                            <p className={s.action__text}>Встигни купити дешевше!</p>
                            <div className={s.action__image}>
                                <img src='https://content1.rozetka.com.ua/goods/images/big/297049203.jpg' />
                                <div className={s.action__prices}>
                                    <div className={s.action__prices__old}>10000</div>
                                    <div className={s.action__prices__new}>7500</div>
                                </div>
                            </div>
                            <RedLinkButton href='#'>Купити</RedLinkButton>
                        </div>
                    </div>
                </div>
                <div className={s.items__main}>
                    <Title>Популярні категорії</Title>
                    <CatalogCard array={filteredCategories} />
                </div>
                <div className={`${s.main__items} ${s.items__main}`}>
                    <Title>Онлайн-консультант</Title>
                    <ul className={s.items__main__list}>
                        {
                            cards.map((card, index) => {
                                return (
                                    <li className={s.items__main__item} key={index}>
                                        <Link to={ROUTES.home} className={s.items__main__link}>
                                            <div className={s.items__main__link__img}>
                                                <img src={card.image} />
                                            </div>
                                            <p className={s.items__main__link__text}>
                                                {card.title}
                                            </p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={s.main__cards}>
                    <Title>Хіти продажів</Title>
                    <ProductCard array={filteredProducts} />
                    <LinkButton onClick={() => window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })} className={s.show__more__button} to={ROUTES.catalog}>Переглянути все</LinkButton>
                </div>
                <div className={`${s.main__help} ${s['help-main']}`}>
                    <Title>Допомога</Title>
                    <ul className={s['help-main__list']}>
                        <li className={s['help-main__item']}>
                            <Link className={s['help-main__link']} to={ROUTES.home}>Питання та відповіді</Link>
                        </li>
                        <li className={s['help-main__item']}>
                            <Link className={s['help-main__link']} to={ROUTES.home}>Поради</Link>
                        </li>
                        <li className={s['help-main__item']}>
                            <Link className={s['help-main__link']} to={ROUTES.home}>Відеоінструкція</Link>
                        </li>
                    </ul>
                </div>
                <div className={`${s.main__info} ${s['info-main']}`}>
                    <div className={s['info-main__box']}>
                        <h4 className={s['info-main__title']}>Купити кофемашину в Україні</h4>
                        <div className={s['info-main__info']}>
                            <p>Ми - лідери продажів на ринку. Вже багато років компанія залишається на лідерських позиціях, завдяки новим технологіям, широкому асортименту продукції та постійно вводячи щось нове у своє виробництво, щоб покупець мав із чого вибрати та задовольнити свої потреби. Продукція представлена ​​на всіх континентах світу.</p>
                            <ul className={s['info-main__list']}>
                                <li className={s['info-main__item']}>якість</li>
                                <li className={s['info-main__item']}>доступність</li>
                                <li className={s['info-main__item']}>надійність</li>
                            </ul>
                            <p>Продукція виготовлена ​​лише з якісних матеріалів.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};