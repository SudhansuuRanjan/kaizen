import React, { useState } from 'react'
import './NavBar.scss'

const NavBar = () => {

    const [active, setActive] = useState(false);

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

    return (
        <>
            <div className='fixed z-20'>
                <input type="checkbox" id="main-navigation-toggle" class="btn btn--close" onClick={handleClick} title="Toggle main navigation" />
                <label for="main-navigation-toggle">
                    <span></span>
                </label>
            </div>

            <nav id="main-navigation" class={`nav-main bg-gray-900 transform transition-all h-[100%] w-[100%] delay-100 ease-in-out fixed top-0 z-10 flex justify-center items-center ${!active && "translate-x-[-100%]"}`}>
                <ul class="menu">
                    <li class="menu__item">
                        <a class="menu__link" href="#0">Home</a>
                    </li>
                    <li class="menu__item">
                        <a class="menu__link" href="#0">About</a>
                    </li>
                    <li class="menu__item">
                        <a class="menu__link" href="#0">Clients</a>
                        <ul class="submenu">
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Burger King</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Southwest Airlines</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Levi Strauss</a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu__item">
                        <a class="menu__link" href="#0">Services</a>
                        <ul class="submenu">
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Print Design</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Web Design</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="#0">Mobile App Development</a>
                            </li>
                        </ul>
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