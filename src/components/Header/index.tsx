import { Link } from "react-router-dom";
import s from "./Header.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { UserAvatar } from "components/UserAvatar";
import { selectAuth } from "features/user/userSlice";
import { ROUTES } from "app/routes";
import { Logo } from "components/Logo";
import { LinkButton } from "components/ui/Button";
import { CartModal } from "components/CartModal";
import { MobileMenu } from "components/MobileMenu";
import { useLockedBody } from "hooks/useScrollLock";
import { selectCartProducts, selectTotalCount } from "features/user/cartSlice";
import { useTheme } from "components/Theme";
import cart from "../../img/cart.svg"
import AuthService from "api/services/AuthService";


interface HeaderProps {

}
export const Header: FC<HeaderProps> = () => {
  const [visibleHeader, setVisibleHeader] = useState(true);
  const [visibleCartMenu, setVisibleCartMenu] = useState(false);
  const [headerActive, setIsHeaderActive] = useState(false);
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);

  const [locked, setLocked] = useLockedBody(false, 'root')
  const totalCount = useAppSelector(selectTotalCount)

  const changeVisibleHeader = () => {
    setVisibleHeader(false);
  }
  const isAuth = useAppSelector(selectAuth)

  const menuOpen = () => {
    if (isActiveMobileMenu) {
      setIsActiveMobileMenu(false);
      setLocked(!locked)
    } else {
      setIsActiveMobileMenu(true);
      setLocked(true)
    }
  }
  const openCartMenu = () => {
    setVisibleCartMenu(true)
    setLocked(true)
  }
  const closeCartMenu = () => {
    setVisibleCartMenu(false)
    setLocked(!locked)
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 69) {
        setIsHeaderActive(true);
        document.documentElement.dataset.class = "header-active";
      } else if (window.scrollY === 0) {
        setIsHeaderActive(false);
        document.documentElement.dataset.class = "";
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // preloader
  
  //preloader

  return (
    <>
      <header className={`${headerActive ? s.header__fixed : ""} ${visibleHeader ? s.header : s.header_not_visible}`}>
        <div className={`${s.menu}`}>
          <button onClick={menuOpen} type="button" className={`${s['icon-menu']} ${isActiveMobileMenu ? s['menu-open'] : ''}`}><span></span></button>
          <Logo className={s.icon__logo} adaptiveText={true} />
          <LinkButton to={ROUTES.catalog} variables="fitContent" className={s.buttonCatalog} withPicture={true}>
            <span>Каталог</span>
          </LinkButton>
          <div className={s.menu__search}>
            <button className={s.menu__search__icon}>
              <img src="https://plesh9.github.io/coffe-import/static/media/search.46f83f6bbf60bc904bb85857bf65b5ea.svg" />
            </button>
            <input type="text" className={`${s.menu__search__input} ${s.search}`} placeholder="Пошук" />
            <button className={s.menu__search__button}><span>Знайти</span></button>
          </div>
          <div className={s.menu__right}>
            <div className={s.basket}>
              <button onClick={openCartMenu} className={s.menu__right__button}>
                <img src={cart} alt="Image" />
                {
                totalCount !== 0 ?
                  <div className={s.basket__value}>
                    <span>{totalCount}</span>
                  </div>
                  : ''
              }
              </button>
            </div>
            {isAuth ? (
              <Link to={ROUTES.PRIVATE.cabinet} className={s.menu__right__profile}>
                <UserAvatar />
              </Link>
            ) : (
              <Link onClick={changeVisibleHeader} to={ROUTES.AUTH.login} className={s.menu__right__profile}>
                <svg className={s.menu__right__profile__logo} fill="#000000" width="800px" height="800px" viewBox="0 0 128 128" id="Layer_1" version="1.1"><g><path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z"></path><path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z"></path></g></svg>
              </Link>
            )}
          </div>
        </div>
      </header>
      <MobileMenu onCloseMobileMenu={menuOpen} changeVisibleHeader={changeVisibleHeader} isActiveMobileMenu={isActiveMobileMenu} />
      <CartModal closeCartMenu={closeCartMenu} visibleCartMenu={visibleCartMenu} />
    </>
  );
}
