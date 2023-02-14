import  React,{ Component } from "react";
import footer from "./Footer.module.css";
class Footer extends Component {
    render() {
        return (
            <><div className={footer["main-footer"]}></div>
                <footer className={footer.footer}>
                    <div className={footer.waves}>
                        <div className={footer.wave} id={footer.wave3}></div>
                        <div className={footer.wave} id={footer.wave2}></div>
                        <div className={footer.wave} id={footer.wave3}></div>
                        <div className={footer.wave} id={footer.wave4}></div>
                    </div>
                    <ul className={footer["social-icon"]}>
                        <li className={footer["social-icon__item"]}>
                            <a className={footer["social-icon__link"]} href="./#">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                        </li>
                        <li className={footer["social-icon__item"]}>
                            <a className={footer["social-icon__link"]} href="./#">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                        </li>
                        <li className={footer["social-icon__item"]}>
                            <a className={footer["social-icon__link"]} href="./#">
                                <ion-icon name="logo-linkedin"></ion-icon>
                            </a>
                        </li>
                        <li className={footer["social-icon__item"]}>
                            <a className={footer["social-icon__link"]} href="./#">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </li>
                    </ul>
                    <ul className="menu">
                        <li className={footer.menu__item}><a className={footer.menu__link} href="./#">Home</a></li>
                        <li className={footer.menu__item}><a className={footer.menu__link} href="./#">About</a></li>
                        <li className={footer.menu__item}><a className={footer.menu__link} href="./#">Services</a></li>
                        <li className={footer.menu__item}><a className={footer.menu__link} href="./#">Team</a></li>
                        <li className={footer.menu__item}><a className={footer.menu__link} href="./#">Contact</a></li>

                    </ul>
                    <p>&copy;2022 Baymax | All Rights Reserved</p>
                </footer></>
        );
    }
}

export default Footer;
