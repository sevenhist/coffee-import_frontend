import { Container } from "components/ui/Container"
import s from "./Checkout.module.scss"
import { Logo } from "components/Logo"
import { useForm } from "react-hook-form"
import { Inputs } from "pages/Login/components/LoginForm/LoginForm"
import { Field, FieldBox } from "components/ui/Input"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { SelectMenu } from "components/ui/SelectMenu"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { changeCountOnInput, deleteCartProduct, discrementCount, incrementCount, resetProductsToEmpty, selectCartProducts, selectCartTotalPriceOfProducts } from "features/user/cartSlice"
import { CartModal } from "components/CartModal"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "app/routes"
import { Button, LinkButton } from "components/ui/Button"
import { CartCheckout } from "./CartCheckout"
import { HeaderCheckout } from "./HeaderCheckout"
import { CheckoutContactsData } from "./CheckoutContactsData"
import { CheckoutDelivery } from "./CheckoutDelivery"
import { CheckoutPay } from "./CheckoutPay"
import { citiesAustria, postAmts, postOffices } from "data/data"
import { fetchSendCartToEmail } from "features/user/userSlice"

export type CheckoutInputs = {
    last_name: string,
    name: string,
    phone_number: string,
    email: string,
    street: string,
    house: string,
    apartment: string
}

export const Checkout: FC = () => {
    const {
        register,
        handleSubmit,
        reset: formReset,
        watch,
        formState: { errors, isValid },
    } = useForm<CheckoutInputs>({
        mode: 'onChange'
    })
    const totalPrice = useAppSelector(selectCartTotalPriceOfProducts)
    const cartArray = useAppSelector(selectCartProducts)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const fields: Array<Field> = [
        {
            register: register,
            name: 'last_name',
            required: "Поле обов'язкове до заповнення!",
            placeholder: "Введіть своє прізвище",
            errors: errors,
            title: "Прізвище",
            type: 'text',
            watch: watch
        },
        {
            register: register,
            name: 'name',
            required: "Поле обов'язкове до заповнення!",
            placeholder: "Введіть своє iм'я",
            errors: errors,
            title: "Ім'я",
            type: 'text',
            watch: watch
        },
        {
            register: register,
            name: 'phone_number',
            required: "Поле обов'язкове до заповнення!",
            placeholder: "Введіть свій номер телефону",
            value: "+43",
            patternValue: /^\+43[0-9]{11}$/,
            message: 'Будь ласка напишіть правильно ваш номер телефону',
            errors: errors,
            title: "Мобільний телефон",
            type: 'tel',
            watch: watch
        },
        {
            register: register,
            name: 'email',
            required: "Поле обов'язкове до заповнення!",
            placeholder: "Введіть свою електронну пошту",
            patternValue: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: 'Будь ласка введіть дійсну адресу електронної пошти!',
            errors: errors,
            title: 'Емейл',
            type: 'text',
            watch: watch
        }
    ];
    const fieldsStreet: Array<Field> = [
        {
            register: register,
            name: 'street',
            required: "",
            placeholder: "Вулиця",
            errors: errors,
            type: 'text',
            reset: () => formReset({ street: '' })
        },
        {
            register: register,
            name: 'house',
            required: "",
            placeholder: "Будинок",
            errors: errors,
            type: 'text',
            reset: () => formReset({ house: '' })
        },
        {
            register: register,
            name: 'apartment',
            required: "",
            placeholder: "Квартира",
            errors: errors,
            type: 'text',
            reset: () => formReset({ apartment: '' })
        },
    ];
    /////////////////////////////////////////////////////////////////////////////////////////////////
    const [activeCityItem, setActiveCityItem] = useState<{
        id: number,
        city: string
    } | null>(null);
    const [activePostOfficeItem, setActivePostOfficeItem] = useState<{
        id: number,
        postOffice: string,
        cityId: number
    } | null>(null);
    const [activePostamtItem, setActivePostamtItem] = useState<{
        id: number,
        postamt: string,
        cityId: number
    } | null>(null);
    useEffect(() => {
        if (activeCityItem?.id !== activePostOfficeItem?.cityId) {
            setActivePostOfficeItem(null)
            setActivePostamtItem(null)
        }
    }, [activeCityItem])
    const secondRadioInputObj = {
        normalyPay: "Оплата при отриманні.",
        privateBankPay: "Оплата за реквізитами Приват Банку"
    }
    const [secondActiveRadioInput, setSecondActiveRadioInput] = useState(secondRadioInputObj.normalyPay)
    const [activeSubmitButton, setActiveSubmitButton] = useState(false)
    const courier = watch()
    useEffect(() => {
        if (isValid && (activePostamtItem || activePostOfficeItem || (courier.house && courier.apartment && courier.street))) {
            setActiveSubmitButton(true)
        } else {
            setActiveSubmitButton(false)
        }
    }, [activePostOfficeItem, activePostamtItem, courier.house, courier.street, courier.apartment, isValid])
    // functions for date and time 
    function getCurrentDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        return `${day}.${month}.${year}`;
    }
    function getCurrentTime() {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    const onSubmit = ({ last_name, name, phone_number, email, street, house, apartment }: CheckoutInputs) => { // розпаковую дату data
        const currentDate = getCurrentDate();
        const currentTime = getCurrentTime();
        const courier = street + " " + house + " " + apartment
        const filteredCartArray = cartArray.map(item => ({
            id: item.id,
            title: item.title,
            count: item.count,
            price: item.price,
            img: item.imgUrl
        }));
        const delivery = {
            postOffice: activePostOfficeItem?.postOffice,
            postamt: activePostamtItem?.postamt,
            courier: courier
        }
        const meineDaten: any[] = [{
            last_name: last_name,
            first_name: name,
            phone_number: phone_number,
            email: email,
            city: activeCityItem?.city,
            delivery: delivery,
            cart: filteredCartArray,
            activePay: secondActiveRadioInput,
            totalPrice: totalPrice,
            date: currentDate,
            time: currentTime
        }]
        dispatch(fetchSendCartToEmail(meineDaten))
        dispatch(resetProductsToEmpty(true))
        console.log(meineDaten, "DAS IST MEINEN OBJ")
    };
    return (
        <div className={s.checkout__wrapper} onClick={() => setDeleteItemId(null)}>
            {
                totalPrice !== 0 ?
                    <div className={s.checkout}>
                        <Container>
                            <HeaderCheckout />
                            <div className={s.checkout__col}>
                                <form onSubmit={handleSubmit(onSubmit)} className={`${s.checkout__form} ${s.form__checkout}`}>
                                    <CheckoutContactsData activeCityItem={activeCityItem} setActiveCityItem={setActiveCityItem} citiesAustria={citiesAustria} fields={fields} />
                                    <CheckoutDelivery activePostamtItem={activePostamtItem} activePostOfficeItem={activePostOfficeItem} setActivePostamtItem={setActivePostamtItem} setActivePostOfficeItem={setActivePostOfficeItem} activeCityItem={activeCityItem} fieldsStreet={fieldsStreet} postOffices={postOffices} postAmts={postAmts} />
                                    <CheckoutPay secondRadioInputObj={secondRadioInputObj} secondActiveRadioInput={secondActiveRadioInput} setSecondActiveRadioInput={setSecondActiveRadioInput} />
                                    <div className={s.form__checkout__footer}>
                                        <Button className={`${!activeSubmitButton ? s.form__checkout__footer__hide__button : ''} ${s.form__checkout__footer__button}`} type="submit">{"Підтвердити замовлення"}</Button>
                                    </div>
                                </form>
                                <CartCheckout deleteItemId={deleteItemId} setDeleteItemId={setDeleteItemId} />
                            </div>
                        </Container>
                    </div>
                    :
                    <div className={s.no__items}>
                        <p>Кошик порожній</p>
                        <LinkButton to={ROUTES.home} className={s.no__items__button}>На головну</LinkButton>
                    </div>
            }
        </div>
    )
}