import { useAppSelector } from "app/hooks"
import s from "./HistoryComponent.module.scss"
import { selectUser } from "features/user/userSlice"
import { ROUTES } from "app/routes"
import { Link } from "react-router-dom"

export const History = () => {
    //for i 
    const user = useAppSelector(selectUser)
    return (
        <div className={s["history-orders"]}>
            <h1 className={`${s.cabinet__title} ${s.title}`}>Історія замовлень</h1>
            {
                user?.history && user.history.length > 0 ?
                    <div>
                        {
                            user?.history.map((item, index) => {
                                return (
                                    <div key={index} className={s["history-orders__wrapper"]}>
                                        <div>
                                            <h2 className={s["history-orders__header"]}>Замовлення №{user.orderNumber[index]}</h2>
                                            <h2 className={s["history-orders__title"]}>Отримано:</h2>
                                            <ul className={s["history-orders__list"]}>
                                                <li>Дата: {item.dateInfo}</li>
                                                <li>Час: {item.timeInfo}</li>
                                            </ul>
                                            <h2 className={s["history-orders__title"]}>Контакти:</h2>
                                            <ul className={s["history-orders__list"]}>
                                                <li>Ім'я: {item.first_name}</li>
                                                <li>Прізвище: {item.last_name}</li>
                                                <li>Телефон: {item.phone_number}</li>
                                                <li>Електронна пошта: {item.email}</li>
                                            </ul>
                                            <h2 className={s["history-orders__title"]}>Дані для відправки:</h2>
                                            <ul className={s["history-orders__list"]}>
                                                <li>Місто: {item.city}</li>
                                                <li>Спосіб доставки: {item.delivery.postamt !== undefined ? "Самовивіз із поштомата Нової пошти" : item.delivery.postOffice !== undefined ? "Самовивіз із відділення Нової пошти." : item.delivery.courier !== undefined && !item.delivery.courier.includes("undefined") ? "Кур'єрська доставка Новою Поштою" : ""}</li>
                                                <li>Адреса: {item.delivery.postamt !== undefined ? item.delivery.postamt : item.delivery.postOffice !== undefined ? item.delivery.postOffice : item.delivery.courier?.includes("undefined") ? "" : item.delivery.courier}</li>
                                                <li>Спосіб оплати: {item.activePay}</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h2 className={s["history-orders__header"]}>Кошик</h2>
                                            <h2 className={s["history-orders__title"]}>Кошик:</h2>
                                            <div>
                                                {item.cart.map((cartItem) => {
                                                    return (
                                                        <ul className={s["history-orders__products"]}>
                                                            <li className={s["history-orders__box"]}>
                                                                <Link to={`${ROUTES.product}/${cartItem.id}`}>
                                                                    <img src={cartItem.img} />
                                                                </Link>
                                                                <p>{cartItem.title}</p>
                                                            </li>
                                                            <li>Ціна за одиницю: {cartItem.price}грн</li>
                                                            <li>Кількість: {cartItem.count}</li>
                                                        </ul>
                                                    )
                                                })}
                                            </div>
                                            <div className={s["history-orders__footer"]}>
                                                <p>Загальна ціна: {item.totalPrice}грн</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <p className={s.empty_history}>Замовлень поки немає</p>
            }
        </div>
    )
}