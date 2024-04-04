import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import s from "./MainLayout.module.scss"
import { ScrollButton } from 'components/ScrollButton';

interface MainLayoutProps { }

export const MainLayout: FC<MainLayoutProps> = () => {

    return (
        <div className={s.main__wrapper}>
            <Header/>
            <div className={s.main}>
                <Outlet />
            </div>
            <ScrollButton />
            <Footer />
        </div>
    );
};
