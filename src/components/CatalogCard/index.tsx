import { FC } from "react"
import s from "./CatalogCard.module.scss"
import { ICategory } from "models/ICategory"
import { Link } from "react-router-dom"
import { ROUTES } from "app/routes"

interface CatalogCardProps {
    array: ICategory[],
    classname?: string
}

export const CatalogCard: FC<CatalogCardProps> = ({ array, classname }) => {
    return (
        <ul className={`${classname ? classname : ''} ${s.category_list}`}>
            {array.map(category => {
                return (
                    <li key={category.id} className={s.items__main__item}>
                        <Link onClick={() => window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })} to={`${ROUTES.catalog}/${category.id}`} className={s.items__main__link}>
                            <div className={s.items__main__link__img}>
                                <img src={category.imgUrl} alt={category.title} />
                            </div>
                            <p className={s.items__main__link__text}>{category.title}</p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}