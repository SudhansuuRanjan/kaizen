import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import CartIcon from "./CartIcon";


const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const [focus, setFocus] = useState(-1);

    return (
        <div className="backdrop-blur-md text-lg font-medium drop-shadow-md z-50 flex flex-row fixed  bg-gray-800 bg-opacity-40 dark:backdrop-blur-md dark:drop-shadow-md  w-[100vw] items-center justify-center text-gray-800 dark:text-white border-b-[1px] border-[#161616]">
            <div className="flex items-center justify-between w-[100%] md:w-[70rem] px-4 md:px-3 py-4">
                <div className="flex items-center">
                    <Link to="/">
                        <p
                            className="font-sans text-2xl font-extrabold ml-2 md:ml-5 lg:ml-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 cursor-pointer"
                            onClick={() => {
                                setMenu(false);
                            }}
                        >
                            Kaizen'23
                        </p>
                    </Link>
                </div>
                <div className="flex items-center">
                    <ul className="md:flex hidden items-center">
                        <li
                            className={
                                focus === 0
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/events">Events</Link>
                        </li>
                        <li
                            className={
                                focus === 0
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/users">Users</Link>
                        </li>
                        <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/create-pass">Create Pass</Link>
                        </li>
                        <li
                            className={
                                focus === 2
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/new-event">
                                <CartIcon />
                            </Link>
                        </li>


                    </ul>
                    {/* <button
                        type="button"
                        onClick={() => {
                            if (theme === "dark") {
                                setTheme("light");
                            } else {
                                setTheme("dark");
                            }
                        }}
                        className="text-white dark:text-gray-800 bg-[#00126c] hover:bg-[#000f5c] focus:ring-[2.5px] focus:outline-none focus:ring-violet-300 dark:focus:ring-yellow-400 font-medium rounded-lg text-lg p-2.5 text-center inline-flex items-center mr-2 dark:bg-yellow-400 dark:hover:1CD0EA dark:focus:bg-yellow-400 ml-4"
                    >
                        <MdDarkMode /> <MdLightMode />
                        <span className="sr-only">Icon description</span>
                    </button> */}

                    <button
                        type="button"
                        onClick={() => {
                            if (menu == false) {
                                setMenu(true);
                            } else {
                                setMenu(false);
                            }
                        }}
                        className="animate-pulse md:hidden text-gray-900 bg-yellow-50 hover:bg-yellow-50 border border-gray-200 focus:ring-[2.5px] focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center items-center dark:focus:ring-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2"
                    >
                        {!menu ? <HiMenuAlt3 /> : <FiX />}
                    </button>
                </div>
            </div>
            {menu && (
                <div className="md:hidden fixed mt-[12rem] right-0 bg-white rounded-md w-[12rem] py-2 mr-5 shadow-md text-gray-800 dark:text-white dark:bg-gray-700 border-gray-200 dark:border-gray-500 border">
                    <ul>
                        <li>
                            <Link to="/events">
                                <button
                                    onClick={() => {
                                        setMenu(false);
                                        // setFocus(0);
                                    }}
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                                >
                                    Events
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                                >
                                    Profile
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                                >
                                    Users
                                </button>
                            </Link>
                        </li>

                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;