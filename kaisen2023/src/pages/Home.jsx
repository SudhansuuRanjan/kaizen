import React from 'react'
import { Link } from 'react-router-dom'
import { Parallax, ParallaxBanner } from 'react-scroll-parallax'

const Home = () => {
  document.title = 'Kaisen 2023'
  return (
    <div className="pt-20">
      <h1 className="font-bold lg:text-6xl md:text-5xl text-4xl text-center my-5 flex flex-col items-center justify-center gap-5 m-auto  max-w-[80%]">
        <div className="flex">
          <img src="/images/kaizen1.png" alt="logo" className='h-[20rem]'/>
        </div>
        <div className="text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 to-red-600  flex">
          Loading...
        </div>
      </h1>

      <div className="pt-10 flex items-center justify-center m-auto ">
        <Link to='/signin'>
          <button className="text-white  bg-gradient-to-r  from-pink-500 via-red-500 to-purple-500 px-[4rem] font-semibold py-[0.7rem] rounded-3xl  hover:from-purple-700 hover:to-pink-500 dark:hover:bg-[#0F1221]  m-auto">Get Started</button>
        </Link>
      </div>
    </div>
    // <>
    //   <div className="bg-[url('https://archive.hackmit.org/2018/assets/backgrounds/bg.svg')] bg-cover bg-repeat  min-h-screen">

    //     <div>

    //     </div>

    //     <div className='relative pt-40 h-[100vh]'>
    //       <Parallax speed={2} className="bg-[url('https://archive.hackmit.org/2018/assets/backgrounds/perspective1.svg')] bg-repeat-x min-w-[110px] h-[70vh] w-[100%] bg-center bg-bottom absolute top-30 z-0 bg-cover" />

    //       <Parallax speed={15} className="bg-[url('https://archive.hackmit.org/2018/assets/backgrounds/perspective2.svg')] bg-repeat-x min-w-[110px] h-[70vh] w-[100%] bg-center bg-bottom absolute top-30 bg-cover" />


    //       <Parallax speed={35} className="bg-[url('https://archive.hackmit.org/2018/assets/backgrounds/perspective3.svg')] bg-repeat-x min-w-[110px] h-[70vh] w-[100%] bg-center bg-bottom absolute bg-cover top-40" />

    //       <Parallax speed={35} className="bg-[url('https://archive.hackmit.org/2018/assets/backgrounds/perspective4.svg')] bg-repeat-x min-w-[110px] lg:h-[200vh] h-[150vh] w-[100%] bg-center bg-bottom absolute bg-cover">
    //         <div className='bg-[#180724] mt-[15rem] h-full'>
    //         </div>
    //       </Parallax>

    //       <Parallax speed={10} className="bg-[url('https://archive.hackmit.org/2018/assets/backgrounds/litbuildings.svg')] min-w-[110px] md:h-[150vh] h-[100vh] lg:h-[200vh] w-[100%] bg-center bg-bottom absolute top-40 bg-no-repeat bg-cover z-20" />
    //     </div>

    //     <Parallax speed={10} className="bg-[url('https://archive.hackmit.org/2018/assets/backgrounds/floor_3.svg')] h-[20vh] md:h-[25vh] lg:h-[50vh] w-[100%] bg-center bg-bottom relative  bg-no-repeat z-10 top-40 lg:mt-[20rem] md:mt-[5rem] mt-[-10rem]" />
    //   </div>
    // </>
  )
}

export default Home