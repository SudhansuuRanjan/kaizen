import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
const Footer = () => {
  const date = new Date;
  const year = date.getFullYear();
  return (
    <div className="mt-[5rem] bg-gray-100 dark:bg-[#000000] text-sm">

      <div className="mb-10 w-[90%] grid gap-2 md:gap-4 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-[auto] items-start justify-items-center">

        <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-1 md:order-1 lg:order-1'>

          <Link href="/">
            <img src="/images/kaizen-logo1.jpg" alt="logo" className='h-20' />
          </Link>

          <p className='max-w-[17rem] py-3 text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          <div className='flex gap-3 py-2 '>
            <a href="https://facebook.com" className='transition ease-in delay-50 text-blue-500 hover:text-blue-600 hover:scale-[110%]'>
              <FaFacebook size={30} />
            </a>
            <a href="https://web.whatsapp.com" className='transition ease-in delay-50 text-green-400 hover:text-green-500 hover:scale-[110%]'>
              <IoLogoWhatsapp size={30} />
            </a>
            <a href="https://instagram.com" className='transition ease-in delay-50 text-pink-500 hover:text-pink-600 hover:scale-[110%]'>
              <FaInstagram size={30} />
            </a>

          </div>
        </div>

        <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-2 md:order-2 lg:order-2'>
          <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-red-700 mr-3'>|</h1><h1 className='text-lg font-semibold'>Legals</h1></div>
          <ul className='mt-4 flex flex-col gap-3 text-base'>
            <li className='hover:text-red-600'><Link to="/legals/privacy-policy">Privacy   Policy</Link></li>
            <li className='hover:text-red-600'><Link to="/legals/terms-of-service">Terms</Link></li>
            <li className=' hover:text-red-600'><Link to="/legals/code-of-conduct">Code of Conduct</Link></li>
            <li className=' hover:text-red-600'><Link to="/legals/refund-policy">Refund Policy</Link></li>
          </ul>
        </div>

        <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-3 md:order-3 lg:order-3 text-base'>
          <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-red-700 mr-3'>|</h1><h1 className='text-lg font-semibold'>Contact Us</h1></div>
          <p className='max-w-[16rem] pt-4 text'>AIIMS Patna, Phulwarisharif, Patna, Bihar-801507, India</p>
          <p className='pt-2'>Ph : <a href="tel:+911256131543" className='text-red-700 ml-2 font-semibold'>+91 12561 31543</a></p>
          <p className='pt-2'>Mail : <a href="mailto:nasg@nitp.ac.in" className='text-red-700 ml-2 font-semibold'>trustme@nitp.ac.in</a></p>
        </div>

      </div>

      <div className="w-[90%] m-[auto] bg-gray-800 h-[2px]"></div>
      <div className="m-[auto] pb-8 pt-5 text-gray-800 dark:text-gray-400 dark:font-light flex flex-col md:flex-row lg:flex-row justify-between items-center w-[90%] text-base">
        <p>
          ?? {year} Kaizen. All Rights Reserved.
        </p>
        <p>
          Designed & Developed by <a className="text-base font-medium text-red-500" href="#">Sudhanshu Ranjan</a>.
        </p>
      </div>
    </div>
  )
}

export default Footer