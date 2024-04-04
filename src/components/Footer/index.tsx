import { Container } from "components/ui/Container"
import s from "./Footer.module.scss"
import { Logo } from "components/Logo"

export const Footer = () => {

    return (
        <footer className={s["footer-distributed"]}>
            <Container>
                <div className={s["footer-wrapper"]}>
                    <div className={s["footer-left"]}>
                        <Logo className={s["footer-logo"]}></Logo>
                        <p className={s["footer-company-about"]}>
                            <span>Про компанію</span>
                            Компанія займається продажом великого асортименту товарів, які роблять ваше повсякденне життя набагато легше!
                        </p>
                        <p className={s["footer-company-name"]}>
                            © 2024 Інтернет магазин coffe-import. Розробник проекту: Дмитро Рудненко 
                        </p>
                    </div>
                    <div className={s["footer-center"]}>
                        <div className={s["footer-links"]}>
                            <a href="#" className={s["link-1"]}>Акції</a>
                            <a href="#">Дропшипінг</a>
                            <a href="#">Доставка | Оплата</a>
                            <a href="#">Гарантія | Повернення</a>
                            <a href="#">Графік роботи | Контакти</a>
                        </div>
                    </div>
                    <div className={s["footer-right"]}>
                        <div className={s["footer__box-cont"]}>
                            <div className={s["footer__box"]}>
                                <div className={s["fa-map-marker"]}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path></svg>
                                </div>
                                <a href="https://maps.app.goo.gl/gMP9WJmgtQnhTSnX8" target="_blank">Graz, Austria</a>
                            </div>
                            <div className={s["footer__box"]}>
                                <div className={s["fa-map-marker"]}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path></svg>
                                </div>
                                <a className={s.footer__num} href="tel: +4367764465503">+43 677 64465503</a>
                            </div>
                            <div className={s["footer__box"]}>
                                <div className={s["fa-map-marker"]}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M23,20 L23,6 L12,15 L1,6 L1,20 L23,20 Z M12,12 L22,4 L2,4 L12,12 Z"></path></svg>
                                </div>
                                <p>
                                    <a className={s["footer-mail"]} href="mailto:sevenhist@gmail.com">sevenhist@gmail.com</a>
                                </p>
                            </div>
                        </div>
                        <div className={s["footer-icons"]}>
                            <a href="https://www.instagram.com/svhist" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path></svg></a>
                            <a href="https://www.facebook.com/profile.php?id=100032456259516" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path></svg></a>
                            <a href="https://t.me/sv7hist" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path></svg></a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}