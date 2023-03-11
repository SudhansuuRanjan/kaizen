import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer2 = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="text-sm bg-opacity-30 mt-10 bg-black">
            <div className="w-[90%] m-[auto] h-[2px]"></div>
            <div className="m-[auto] pb-5 pt-5 text-gray-800 dark:text-gray-400 dark:font-light flex flex-col md:flex-row lg:flex-row justify-between items-center w-[90%] text-base">
                <p>© {year} Kaizen. All Rights Reserved.</p>
                <p>
                    Designed & Developed by{" "}
                    <a className="text-base font-medium text-pink-600" href="https://github.com/Harshkumar62367/TrustMarket">
                        Sudhanshu Ranjan
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default Footer2;