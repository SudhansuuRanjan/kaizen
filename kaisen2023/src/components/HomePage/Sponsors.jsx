import React from 'react'

const Sponsors = () => {

    const sponsors = [1, 2, 3, 4, 5, 6];

    return (
        <div className="relative bg-no-repeat min-h-fit bg-center bg-cover w-[100%] py-10 bg-[url('https://ragam.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftheyyam%202.98e82130.png&w=1080&q=75')]">
            <h3 className='text-center font-bold text-5xl py-10' data-aos="fade-up">Our Sponsors</h3>

            <div data-aos="fade-up">
                <h5 className='text-center font-bold text-4xl text-orange-500 py-5'>Title Sponsor</h5>
                <div className='flex flex-wrap items-center justify-center gap-8 w-[80%] m-auto py-[3rem]'>
                    <div className='h-36 w-72 rounded-xl bg-gray-800 bg-opacity-70 backdrop-blur-sm'></div>
                </div>
            </div>

            <div >
                <h5 className='text-center font-bold text-3xl text-blue-500 py-5' data-aos="fade-up">Diamond Sponsors</h5>
                <div className='flex flex-wrap items-center justify-center lg:gap-8 md:gap-5 gap-3 lg:w-[80%] w-[100%] m-auto py-[3rem]'>
                    {
                        sponsors.map((sponsor, index) => (
                            <div key={index} data-aos="fade-up" className='h-28 w-52 rounded-xl bg-gray-800 bg-opacity-70 backdrop-blur-sm lg:scale-100 md:scale-[70%] scale-[50%]'></div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Sponsors