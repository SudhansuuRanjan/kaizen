import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from './../../firebase.config'
import { toast } from 'react-toastify'
import { collection, getCountFromServer } from 'firebase/firestore';

const UsersDashboard = () => {

    const [totalUsers, setTotalUsers] = useState(0);
    const [usersLoading, setUsersLoading] = useState(false);
    const [totalPasses, setTotalPasses] = useState(0);
    const [passesLoading, setPassesLoading] = useState(false);

    const getTotalNoOfUsers = async () => {
        setUsersLoading(true);
        try {
            const userRef = collection(db, 'users');
            const snapshot = await getCountFromServer(userRef);
            setTotalUsers(snapshot.data().count);
            // console.log(snapshot.data().count);
        } catch (error) {
            toast.error(error.message);
        }
        setUsersLoading(false);
    }

    const getTotalPasses = async () => {
        setPassesLoading(true);
        try {
            const passRef = collection(db, 'passes');
            const snapshot = await getCountFromServer(passRef);
            setTotalPasses(snapshot.data().count);
            // console.log(snapshot.data().count);
        } catch (error) {
            toast.error(error.message);
        }
        setPassesLoading(false);
    }

    useEffect(() => {
        getTotalNoOfUsers();
        getTotalPasses();
    }, [])

    return (
        <main className='bg-black min-h-screen'>
            <div className='event-banner'>
                <h1 className='event-head'>Dashboard</h1>
            </div>

            <div className='flex items-center justify-center mb-20 mt-5 lg:gap-10 md:gap-10 gap-5'>
                <div className='border lg:p-5 md:p-5 p-4 rounded-3xl hover:scale-105 transition-all delay-75 bg-gray-900 bg-opacity-75 ease-in-out'>
                    <h1 className='text-2xl text-center text-[#ebe6d0] font-semibold'>Total Users</h1>
                    <h1 className='text-2xl text-center text-yellow-500 font-medium'>{usersLoading ? "..." : totalUsers}</h1>
                </div>
                <div className='border lg:p-5 md:p-5 p-4 rounded-3xl hover:scale-105 transition-all delay-75 bg-gray-900 bg-opacity-75 ease-in-out'>
                    <h1 className='text-2xl text-center text-[#ebe6d0] font-semibold'>Total Passes</h1>
                    <h1 className='text-2xl text-center text-yellow-500 font-medium'>{usersLoading ? "..." : totalPasses}</h1>
                </div>
            </div>

            <div className='flex items-center flex-wrap lg:gap-16 md:gap-10 gap-8 justify-center lg:px-10 md:px-10 px-5 pb-32'>
                <Link to="/users" className='border-dashed delay-75 ease-in transition-all   border-2 shadow-md border-[#ebe6d0] border-2xl h-20  lg:w-[28rem] md:w-[28rem] w-[100%] flex items-center text-xl font-medium rounded-2xl text-center justify-center hover:bg-[#ebe6d0] text-[#ebe6d0] hover:border-black hover:text-black'>
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