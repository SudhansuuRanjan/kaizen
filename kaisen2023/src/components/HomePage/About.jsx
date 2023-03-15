import React from 'react'

const About = () => {
  return (
    <div className='relative my-32'>
        <div className='flex lg:flex-row md:flex-row flex-col justify-between items-center pt-20 absolute w-[100%] top-0 z-0 md:gap-0 lg:gap-0 gap-20'>
            <img src="wheel.png" alt="wheel" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-50 animate-spin'/>
            <img src="compass.png" alt="cpmpass" data-aos="fade-left" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-50'/>
        </div>
        <div className='bg-red-800 bg-opacity-20 backdrop-blur-sm rounded-[2rem] lg:w-[70%] md:w-[80%] w-[90%] m-auto z-[1999999] lg:p-10 md:p-10 p-5 lg:py-20 md:py-20 py-10'>
            <h3 className='text-center font-bold text-4xl pb-7'>ABOUT US</h3>
            <p className='lg:text-2xl md:text-2xl text-xl leading-9 text-center'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis officia, velit nesciunt necessitatibus esse enim corrupti exercitationem magnam perferendis, non inventore in assumenda odio deserunt corporis sed illo. Tenetur recusandae perspiciatis commodi velit magnam praesentium pariatur iste est quas incidunt et, iusto consequatur debitis! Ullam consectetur atque exercitationem ut. Quidem.
            </p>
        </div>
    </div>
  )
}

export default About