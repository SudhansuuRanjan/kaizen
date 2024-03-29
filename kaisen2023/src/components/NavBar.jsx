import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FiX } from "react-icons/fi";


const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const [focus, setFocus] = useState(0);

  return (
    <div className="bg-opacity-5 backdrop-blur-md drop-shadow-md z-50 font-mono flex flex-row fixed bg-gray-800 w-[100vw] items-center justify-center text-white border-b-[1px] border-gray-500">
      <div className="flex items-center justify-between w-[100%] md:w-[70rem] px-4 md:px-3 py-3">
        <div className="flex items-center">
          <Link to="/">
            <img src="/images/kaizen.png" alt="logo"  className="h-10" />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="md:flex hidden">
            <li
              className={
                focus === 1
                  ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                  : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
              }
              onClick={() => setFocus(1)}
            >
              <Link to="#about">About</Link>
            </li>
            <li
              className={
                focus === 2
                  ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                  : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
              }
              onClick={() => setFocus(2)}
            >
              <Link to="#technology">Gallery</Link>
            </li>

            <li
              className={
                focus === 5
                  ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                  : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
              }
              onClick={() => setFocus(5)}
            >
              <Link to="/events">Events</Link>
            </li>
            <li
              className={
                focus === 6
                  ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                  : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
              }
              onClick={() => setFocus(6)}
            >
              <Link to="#contact">Contact</Link>
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
        <div className="md:hidden fixed mt-[20rem] right-0 bg-white rounded-md w-[12rem] py-2 mr-5 shadow-md text-gray-800 dark:text-white dark:bg-gray-700 border-gray-200 dark:border-gray-500 border">
          <ul>
            <li>
              <Link to="/">
                <button
                  onClick={() => {
                    setMenu(false);
                    // setFocus(0);
                  }}
                  className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                >
                  Home
                </button>
              </Link>
            </li>
            <li>
              <Link to="#about">
                <button
                  onClick={() => {
                    setMenu(false);
                    setFocus(1);
                  }}
                  className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                >
                  About
                </button>
              </Link>
            </li>
            <li>
              <Link to="#technology">
                <button
                  onClick={() => {
                    setMenu(false);
                    setFocus(2);
                  }}
                  className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                >
                  Technology
                </button>
              </Link>
            </li>
            <li>
              <Link to="#services">
                <button
                  onClick={() => {
                    setMenu(false);
                    setFocus(3);
                  }}
                  className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                >
                  Services
                </button>
              </Link>
            </li>
            <li>
              <Link to="#contact">
                <button
                  onClick={() => {
                    setMenu(false);
                    setFocus(4);
                  }}
                  className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                >
                  Contact
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