import React from 'react'
import { SiGithubsponsors } from 'react-icons/si'
import { FiSmile } from 'react-icons/fi'
import { AiOutlineStar } from 'react-icons/ai'
import { GiSandsOfTime } from 'react-icons/gi'
import CountUp from 'react-countup';

const Highlights = () => {
    return (
        <div className='bg-[url("https://ragam.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fghoomar.6656243d.jpeg&w=1080&q=75")] bg-no-repeat bg-cover flex items-center justify-center flex-col py-10'>
            <div className='text-center pt-10 pb-10'>
                <h3 className='text-red-600 text-4xl font-bold'>KAISEN</h3>
                <p className='text-4xl font-bold'>PREVIOUS STATS</p>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-5 items-center justify-between lg:h-[20rem] md:h-[20rem] h-fit m-auto lg:w-[55rem] md:w-[90%] w-[80%]'>
                <div className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <SiGithubsponsors size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-180" />
                    <h3 className='text-4xl font-bold'><CountUp end={100} enableScrollSpy={true} />+</h3>
                    <p className='text-xl'>Years</p>
                </div>
                <div className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <FiSmile size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-180" />
                    <h3 className='text-4xl font-bold'><CountUp end={200} enableScrollSpy={true} />+</h3>
                    <p className='text-xl'>Years</p>
                </div>
                <div className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <AiOutlineStar size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-180" />
                    <h3 className='text-4xl font-bold'><CountUp end={1000} enableScrollSpy={true} />+</h3>
                    <p className='text-xl'>Years</p>
                </div>
                <div className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <GiSandsOfTime size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-180" />
                    <h3 className='text-4xl font-bold'><CountUp end={21} enableScrollSpy={true} />+</h3>
                    <p className='text-xl'>Years</p>
                </div>
            </div>
        </div>
    )
}

export default Highlights