import React from 'react'
import { Link } from 'react-router-dom'
import { Parallax, ParallaxBanner } from 'react-scroll-parallax'

const Home = () => {
  document.title = 'Kaisen 2023'
  return (
    // <div className="pt-20">
    //   <h1 className="font-bold lg:text-6xl md:text-5xl text-4xl text-center my-5 flex flex-col items-center justify-center gap-5 m-auto  max-w-[80%]">
    //     <div className="flex">
    //       <img src="/images/kaizen1.png" alt="logo" className='h-[20rem]' />
    //     </div>
    //     <div className="text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 to-red-600  flex">
    //       Loading...
    //     </div>
    //   </h1>

    //   <div className="pt-10 flex items-center justify-center m-auto ">
    //     <Link to='/signin'>
    //       <button className="text-white  bg-gradient-to-r  from-pink-500 via-red-500 to-purple-500 px-[4rem] font-semibold py-[0.7rem] rounded-3xl  hover:from-purple-700 hover:to-pink-500 dark:hover:bg-[#0F1221]  m-auto">Get Started</button>
    //     </Link>
    //   </div>
    // </div>
    <div>
      <ParallaxBanner
      layers={[
        { image: 'layer-1.png', speed: -20 },
        {
          speed: -15,
          children: (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <h1 className="text-8xl text-white font-semibold">KAIZEN 2023</h1> */}
              <img src="/images/TEXT-KAIZEN-01.png" alt="logo" className='lg:h-[20rem] h-[12rem]' />
            </div>
          ),
        },
        { image: '/layer-2.png', speed: -10 },
        { image: '/layer-3.png', speed: -2 },
      ]}
      className="lg:aspect-[2/1] md:aspect-[4/3] aspect-[2/4]"
    />
    <div className='h-24 w-[100%] bg-gradient-to-b from-[#062959] to-[#0b0c14]'>
    </div>
    </div>


  )
}

export default Home