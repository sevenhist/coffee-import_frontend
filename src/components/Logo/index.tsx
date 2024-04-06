import { FC } from "react";
import s from "./Logo.module.scss";
import logo from 'img/icons/logo.png'
import { Link } from "react-router-dom";
import { ROUTES } from "app/routes";

interface LogoProps {
    withText?: boolean,
    className?: string,
    adaptiveText?: boolean,
    onClick?: () => void
}

export const Logo: FC<LogoProps> = ({ withText = true, className, adaptiveText = true, onClick }) => {
    return (
        <Link onClick={onClick} to={ROUTES.home} className={`${className && className} ${s.logo}`}>
            <img className={s.logo__icon} src={logo} alt="Logo" />
            {withText ? <p className={`${adaptiveText ? s.logo__adaptive_text : s.logo__text}`}>Rudi Import</p> : ''}
        </Link>
    )
}