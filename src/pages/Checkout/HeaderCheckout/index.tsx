import { Logo } from "components/Logo"
import s from "./HeaderCheckout.module.scss"
import { Link } from "react-router-dom"
import { ROUTES } from "app/routes"

export const HeaderCheckout = () => {
    return (
        <div className={s.checkout__top}>
            <Link to={ROUTES.home} className={s.checkout__wrapper}>
                <Logo className={s.checkout__logo} withText={false}></Logo>
                <p className={s.checkout__text}>Rudi Import</p>
            </Link>
            <h1 className={`${s.checkout__title} ${s.title}`}>Оформлення замовлення</h1>
        </div>
    )
}