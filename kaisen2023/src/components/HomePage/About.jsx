import React from 'react'

const About = () => {
    return (
        <div className='relative bg-no-repeat min-h-fit bg-center bg-cover py-32 bg-[url("https://ragam.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Felephant.675d7836.jpeg&w=1080&q=75")]'>
            <div className='flex lg:flex-row md:flex-row flex-col justify-between items-center pt-20 absolute w-[100%] top-0 z-0 md:gap-0 lg:gap-0 gap-20'>
                <img src="wheel.png" alt="wheel" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-75 animate-spin' />
                <img src="compass.png" alt="cpmpass" data-aos="fade-left" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-75' />
            </div>
            <div className='bg-black bg-opacity-50 backdrop-blur-sm rounded-[2rem] lg:w-[70%] md:w-[80%] w-[90%] m-auto z-[1999999] lg:p-10 md:p-10 p-7 lg:py-20 md:py-20 py-10 border border-gray-500'>
                <h3 className='text-center font-bold lg:text-4xl text-3xl pb-7'>ABOUT KAIZEN</h3>
                <p className='lg:text-2xl md:text-2xl text-lg leading-8 text-center'>
                    Kaizen, is AIIMS Patna's annual socio-cultural fest. Through our various editions we have given students from across India a platform through which they can showcase their talents' in literary, sports, cultural and arts. This year with great resolve we'll be organizing one of the biggest concerts featuring a top national Bollywood singer and will also be hosting one of the nation's top stand up comedians'. Not just that, over the course of 5 days attendees will also be able to revel in our EDM night and much-awaited band night. Kaizen, a Japanese word, means "change for the better". Our motto, exemplified by our resolve to do everything bigger and better will finally materialize itself as one of India's largest and most celebrated Med-fests'.
                </p>
            </div>
        </div>
    )
}

export default About