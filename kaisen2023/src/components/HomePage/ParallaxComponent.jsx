import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { CustomBtn1, CustomBtn2 } from '../CustomBtns';

const ParallaxComponent = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div className='bg-gradient-to-b from-pink-500 to-orange-300 z-0'>
      <ParallaxBanner
        layers={[
          { image: width > 768 ? '/layer-1.png' : '/layer1-1.png', speed: -20 },
          {
            speed: -20,
            children: (
              <div className="absolute inset-0 flex flex-col justify-center items-center lg:mt-[-10rem] md:mt-[-10rem] mt-[-15rem]">
                <h1 className="text-2xl md:text-3xl lg:text-3xl text-white lg:tracking-widest tracking-tight font-semibold">AIIMS PATNA PRESENTS</h1>
                <img src="kzn-big.png" alt="logo" className='lg:w-[29rem] md:w-[25rem] w-[18rem] h-auto lg:mt-[-4rem] md:mt-[-3rem] mt-[-2rem]' />
                <h1 className="text-6xl font-extrabold lg:mt-[-4rem] md:mt-[-3rem]
                mt-[-2rem] tracking-widest text-red-100">'2023'</h1>
                <h1 className="my-2 text-lg md:text-xl lg:text-xl  lg:tracking-widest tracking-tight font-semibold text-blue-900">10<sup>th</sup> - 14<sup>th</sup> May</h1>
              </div>
            ),
          },
          { image: width > 768 ? '/layer-2.png' : '/layer1-2.png', speed: -10 },
          { image: width > 768 ? '/layer-3.png' : '/layer1-3.png', speed: 7 },
          {
            speed: -30,
            children: (
              <div className="absolute inset-0 flex flex-col justify-center items-center mt-[16rem]">
                <div className='flex flex-col items-center gap-4'>
                  <CustomBtn1 />
                  <CustomBtn2 />
                </div>
              </div>
            ),
          },
        ]}
        className="lg:aspect-[2/1] md:aspect-[4/3] aspect-[2/4]"
      />
      <div className='h-24 w-[100%] bg-gradient-to-b from-[#062959] to-[#0b0c14]'>
      </div>
    </div>
  )
}

export default ParallaxComponent;