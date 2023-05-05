import React from 'react'
import { Link } from 'react-router-dom'

const UsersDashboard = () => {
    return (
        <main className='bg-black min-h-screen'>
            <div className='event-banner'>
                <h1 className='event-head'>Dashboard</h1>
            </div>

            <div className='flex items-center flex-wrap lg:gap-16 md:gap-10 gap-8 justify-center lg:px-10 md:px-10 px-5 pb-32'>
                <Link to="/users" className='border-dashed delay-75 ease-in transition-all   border-2 shadow-md border-[#ebe6d0] border-2xl h-20 lg:w-[28rem] md:w-[28rem] w-[100%] flex items-center text-xl font-medium rounded-2xl text-center justify-center hover:bg-[#ebe6d0] text-[#ebe6d0] hover:border-black hover:text-black'>
                    <h1>Get All Users</h1>
                </Link>

                <Link to="/users" className='border-dashed delay-75 ease-in transition-all   border-2 shadow-md border-[#ebe6d0] border-2xl h-20 lg:w-[28rem] md:w-[28rem] w-[100%] flex items-center text-xl font-medium rounded-2xl text-center justify-center hover:bg-[#ebe6d0] text-[#ebe6d0] hover:border-black hover:text-black'>
                    <h1>Get Users by ID</h1>
                </Link>

                <Link to="/get-user-by-eventid" className='border-dashed delay-75 ease-in transition-all   border-2 shadow-md border-[#ebe6d0] border-2xl h-20 lg:w-[28rem] md:w-[28rem] w-[100%] flex items-center text-xl font-medium rounded-2xl text-center justify-center hover:bg-[#ebe6d0] text-[#ebe6d0] hover:border-black hover:text-black'>
                    <h1>Get Users by Registered Events</h1>
                </Link>

                <Link to="/users" className='border-dashed delay-75 ease-in transition-all   border-2 shadow-md border-[#ebe6d0] border-2xl h-20 lg:w-[28rem] md:w-[28rem] w-[100%] flex items-center text-xl font-medium rounded-2xl text-center justify-center hover:bg-[#ebe6d0] text-[#ebe6d0] hover:border-black hover:text-black'>
                    <h1>Verify Users</h1>
                </Link>

                <Link to="/users" className='border-dashed delay-75 ease-in transition-all   border-2 shadow-md border-[#ebe6d0] border-2xl h-20 lg:w-[28rem] md:w-[28rem] w-[100%] flex items-center text-xl font-medium rounded-2xl text-center justify-center hover:bg-[#ebe6d0] text-[#ebe6d0] hover:border-black hover:text-black'>
                    <h1>Verify Pass</h1>
                </Link>
            </div>
        </main>
    )
}

export default UsersDashboard