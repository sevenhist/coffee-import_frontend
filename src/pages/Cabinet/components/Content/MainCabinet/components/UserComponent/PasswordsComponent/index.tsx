import { useForm } from "react-hook-form"
import s from "./PasswordsComponent.module.scss"
import { Field, FieldBox } from "components/ui/Input"
import { FC, SetStateAction } from "react"
import { useAppDispatch } from "app/hooks"
import { fetchSetProfilePasswords } from "features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "app/routes"

export type PasswordsCabinet = {
    Password: string,
    New_Password: string,
    Confirm_Password: string
}

export type PasswordsProps = {
    setActivePasswordButton: React.Dispatch<SetStateAction<any>>
}

export const PasswordsComponent:FC<PasswordsProps> = ({setActivePasswordButton}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PasswordsCabinet>({
        mode: 'all'
    })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onPasswordChange = (data: PasswordsCabinet) => {
        console.log(JSON.stringify(data), "DAS SIND DIE DATEN");
        const password = data.Password;
        const new_password = data.New_Password;
        dispatch(fetchSetProfilePasswords({ password, new_password }))
            .then(() => { navigate(`${ROUTES.PRIVATE.cabinet}/${ROUTES.PRIVATE.personalInformation}`) })
    };
    const passwords: Array<Field> = [
        {
            register: register,
            name: 'Password',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Мінімум 8 символів',
            errors: errors,
            title: 'Пароль',
            type: 'password'
        },
        {
            register: register,
            name: 'New_Password',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Мінімум 8 символів',
            errors: errors,
            title: 'Новий Пароль',
            type: 'password'
        },
        {
            register: register,
            name: 'Confirm_Password',
            required: "Поле обов'язкове до заповнення!",
            patternValue: /[0-9a-zA-Z!@#$%^&*]{8,}/g,
            message: 'Невірно вказаний пароль!',
            errors: errors,
            title: 'Підтвердити пароль',
            type: 'password',
            validation: "New_Password",
            watch: watch,
        }
    ];

    return (
        <div>
            <h1 className={s.settings__title}>Безпека</h1>
            <form onSubmit={handleSubmit(onPasswordChange)} className={s.settings__inputs}>
                {passwords.map((field) => (
                    <FieldBox
                        className={s.settings__input}
                        title={field.title}
                        register={register}
                        name={field.name}
                        required={field.required}
                        patternValue={field.patternValue}
                        message={field.message}
                        errors={errors}
                        type={field.type}
                        watch={field.watch}
                        validation={field.validation}
                    />
                ))
                }
                <div className={s.settings__butons}>
                    <div className={s.settings__change}>
                        <button type="button" onClick={() => setActivePasswordButton(false)}>Персональна інформація</button>
                    </div>
                    <div className={s.settings__submit}>
                        <button className={s.settings__save} type="submit">Зберегти</button>
                    </div>
                </div>
            </form>
        </div>
    )
}