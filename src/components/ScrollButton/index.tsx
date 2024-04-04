import { useEffect, useState } from "react";
import s from "./ScrollButon.module.scss"

export const ScrollButton = () => {
    
    const [buttonActive, setButtonIsActive] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY)
            if (window.scrollY > 69) {
                setButtonIsActive(true);
            } else {
                setButtonIsActive(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onScrollButtonClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }

    return (
        <button onClick={onScrollButtonClick} className={`${s["scroll-btn"]} ${buttonActive ? s["scroll-btn__active"] : ''}`}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"></path></svg>
        </button>
    )
}