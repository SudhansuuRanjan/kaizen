import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const ParallaxComponent = () => {
  const { height, width } = useWindowDimensions();

  // if window size is less than 768px then return null
  if (width < 768) {
    console.log('width is less than 768px')
  } else {
    console.log('width is greater than 768px')
  }



  return (
    <>
      <ParallaxBanner
        layers={[
          { image: width > 768 ? '/layer-1.png' : '/layer1-1.png', speed: -20 },
          {
            speed: -20,
            children: (
              <div className="absolute inset-0 flex flex-col justify-center items-center lg:mt-[-10rem] md:mt-[-10rem] mt-[-17rem]">
                <h1 className="text-3xl md:text-4xl lg:text-4xl text-white lg:tracking-widest tracking-tight font-semibold">AIIMS, PATNA PRESENTS</h1>
                <img src="/images/TEXT-KAIZEN-01.png" alt="logo" className='lg:w-[30rem] md:w-[25rem] w-[20rem] h-auto lg:mt-[-4rem] md:mt-[-2rem] mt-[-2rem]' />
                <h1 className="text-6xl text-white font-semibold lg:mt-[-4rem] md:mt-[-3rem]
                mt-[-2rem] tracking-widest ">'2023'</h1>
              </div>
            ),
          },
          { image: width > 768 ? '/layer-2.png' : '/layer1-2.png', speed: -10 },
          { image: width > 768 ? '/layer-3.png' : '/layer1-3.png', speed: 7 },
        ]}
        className="lg:aspect-[2/1] md:aspect-[4/3] aspect-[2/3.5]"
      />
      <div className='h-24 w-[100%] bg-gradient-to-b from-[#062959] to-[#0b0c14]'>
      </div>
    </>
  )
}

export default ParallaxComponent