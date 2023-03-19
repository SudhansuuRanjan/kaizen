import React, { useState } from 'react'
import './NavBar.scss'
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [active, setActive] = useState(false);
    const [colorChange, setColorchange] = useState(false);

    const handleClick = () => {
        // set overflow to hidden when the nav is open
        if (document.getElementById('main-navigation-toggle').checked) {
            document.body.style.overflow = 'hidden'
            setActive(true);
        } else {
            document.body.style.overflow = 'unset'
            setActive(false);
        }
    }

    const changeNavbarColor = () => {
        if (window.scrollY >= 400) {
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };
    window.addEventListener("scroll", changeNavbarColor);

    return (
        <>
            <div className={`fixed z-10 w-[100%] ${colorChange && "border-b bg-gray-700 transition-all delay-100 ease-in-out bg-opacity-20 backdrop-blur-md border-gray-700 shadow-md"}`}>
                <div className='p-4'>
                    <Link to="/">
                        <img src="/images/kaizen.png" alt="logo" className="h-12" />
                    </Link>
                </div>
            </div>

            <div className='z-[25] fixed'>
                <input type="checkbox" id="main-navigation-toggle" class="btn btn--close" onClick={handleClick} title="Toggle main navigation" />
                <label for="main-navigation-toggle">
                    <span></span>
                </label>
            </div>

            <nav id="main-navigation" class={`nav-main bg-gray-900 transform transition-all h-[100%] w-[100%] delay-100 ease-in-out fixed top-0 z-10 flex justify-center items-center ${!active && "translate-x-[-100%]"}`}>
                <ul class="menu">
                    <li class="menu__item">
                        <Link class="menu__link" to="/">Home</Link>
                    </li>
                    <li class="menu__item">
                        <Link class="menu__link" to="/events">Events</Link>
                    </li>
                    <li class="menu__item">
                        <Link class="menu__link" to="/pronite">Pronite</Link>
                        {/* <ul class="submenu">
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Burger King</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Southwest Airlines</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Levi Strauss</a>
                            </li>
                        </ul> */}
                    </li>
                    <li class="menu__item">
                        <a class="menu__link" href="#0">Services</a>
                        {/* <ul class="submenu">
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Print Design</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Web Design</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Mobile App Development</a>
                            </li>
                        </ul> */}
                    </li>
                    <li class="menu__item">
                        <a class="menu__link" href="#0">Contact</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar