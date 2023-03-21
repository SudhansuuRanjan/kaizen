import React from 'react'

const ChiefPatron = () => {
    return (
        <div className='relative bg-no-repeat min-h-fit bg-center bg-cover py-32 bg-[url("https://ragam.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Felephant.675d7836.jpeg&w=1080&q=75")]'>
            <div className='flex lg:flex-row md:flex-row flex-col justify-between items-center pt-20 absolute w-[100%] top-0 z-0 md:gap-0 lg:gap-0 gap-20'>
                <img src="wheel.png" alt="wheel" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-75 animate-spin' />
                <img src="compass.png" alt="cpmpass" data-aos="fade-left" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-75' />
            </div>
            <div className='bg-black bg-opacity-50 backdrop-blur-sm rounded-[2.5rem] lg:w-[78%] md:w-[90%] w-[90%] m-auto z-[1999999] lg:p-16 md:p-10 p-8 lg:py-20 md:py-20 py-10 border border-gray-500 flex lg:flex-row md:flex-row flex-col items-center gap-10'>
                <div className='flex items-center flex-col justify-center min-w-[11rem] w-[15rem] gap-4 text-center'>
                    <h3 className='font-semibold text-2xl text-red-500'>CHIEF PATRON</h3>
                    <div className='h-42 w-42 rounded-full overflow-hidden flex items-center justify-center'>
                        <img src="director-gk-pal.jpg" alt="director" className='h-42 w-42 hover:scale-105 transition-all delay-100 ease-out' />
                    </div>
                    <div className='text-lg'>
                        <p className='font-medium text-sm'>Prof (Dr) Gopal Krushna Pal</p>
                        <p className='text-blue-300'>Executive Director</p>
                    </div>
                </div>
                <p className='lg:text-xl text-lg leading-7  lg:leading-8 text-justify'>
                    I firmly believe that learning cannot be limited to the confines of a classroom. Students truly learn through practical hands-on experiences. Fests like Kaizen provide with the perfect platform to learn, gain knowledge and grow. Through participation in sports, cultural, art, and literary events, students get the chance to develop their overall personality. I want my students to become all-rounders, so it is imperative for them to maintain a delicate balance between academics and extracurricular activities. The enthusiasm and festive spirit created by these events act as a catalyst in overcoming exam pressure and the mental burden of students.

                    This year AIIMS Patna is set to celebrate its annual fest Kaizen 23. It is the biggest event of its kind and I am delighted to announce that we are reviving it after a 4-year hiatus. Kaizen is the annual event of AIIMS Patna which provides students with the opportunity to showcase their talents. Kaizen focuses on promoting trust, teamwork, and sportsmanship among students. It embraces diversity and brings us closer together.

                    I congratulate and wish all the students the very best for Kaizen 2023. Let the various events and activities bring glory to us and enrich our lives with value that can sustain over a long period of time.

                    Best wishes,
                    Prof (Dr) Gopal Krushna Pal
                </p>
            </div>
        </div>
    )
}

export default ChiefPatron