import React, { useState } from 'react'
import "./NavBar.css"
import { HiBars2, HiXMark } from 'react-icons/hi2'

const NavBar = () => {

    const [active, setActive] = useState(false);

    const handleClick = () => {
        if (active == false) {
            document.body.style.overflow = 'hidden'
            setActive(true);
        } else {
            document.body.style.overflow = 'unset'
            setActive(false);
        }
    }

    return (
        <>
            <div className='z-[100] fixed top-5 right-5 flex w-fit h'>
                <button
                    className={`text-lg text-gray-600 transform font-bold transition-all delay-100 ease-in-out ${active && 'rotate-180'}`}
                    onClick={handleClick}>
                    {
                        active ? <HiXMark size={42} /> : <HiBars2 size={42} />
                    }
                </button>
            </div>

            <div className={`h-[100%] w-[100%] fixed bg-gray-900 z-10 transform transition-all delay-100 ease-in-out ${!active && 'translate-y-[-100%]'}`}>
                <h1>efjvikwvlwifw43f</h1>
            </div>
        </>
    )
}

export default NavBar