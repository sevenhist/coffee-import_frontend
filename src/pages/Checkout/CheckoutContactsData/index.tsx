import { useForm } from "react-hook-form";
import s from "./CheckoutContactsData.module.scss"
import { Field, FieldArray, FieldBox } from "components/ui/Input";
import { FC } from "react";
import { CheckoutInputs } from "..";
import { Select } from "components/Select";


export interface CheckoutContactsDataProps {
    fields: Array<Field>
    activeCityItem: { id: number, city: string} | null
    setActiveCityItem: React.Dispatch<React.SetStateAction<{ id: number, city: string} | null>>
    citiesAustria: {id: number, city: string}[] 
}
export const CheckoutContactsData: FC<CheckoutContactsDataProps> = ({ fields, activeCityItem, setActiveCityItem, citiesAustria }) => {

    return (
        <form className={s.form}>
            <h2 className={s.form__checkout__title}>Контактні дані</h2>
            <div className={s.form__checkout__fields}>
                {fields.map((field) => (
                    <div className={s.field} key={field.name}>
                        <FieldBox
                            title={field.title}
                            register={field.register}
                            name={field.name}
                            required={field.required}
                            patternValue={field.patternValue}
                            message={field.message}
                            errors={field.errors}
                            type={field.type}
                            watch={field.watch}
                            validation={field.validation}
                            value={field.value}
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}
            </div>
            <Select
                value={activeCityItem}
                setValue={setActiveCityItem}
                values={citiesAustria}
                valueKey="city"
                placeholder="Виберіть своє місто"
                errorText="Місто вказане не вірно"
            />
        </form>
    )
}