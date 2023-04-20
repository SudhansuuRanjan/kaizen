import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';

const Pass = () => {

    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const [Loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const getPass = async () => {
        setLoading(true);
        try {
            const passRef = collection(db, 'passes');
            const passSnap = await getDocs(query(passRef, where('passId', '==', id)));
            const pass = passSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
            setData(pass[0]);
        } catch (error) {
            toast.error('Something went wrong, please try again later');
        }
        setLoading(false);
    }

    useEffect(() => {
        getPass();
    }, [])


    return (
        <div className='bg-black pb-24'>
            <div className='cart-banner'>
                <h1 className='cart-head'>Your Basic Pass</h1>
            </div>

            {Loading ? <div className='text-center pt-10 font-medium text-yellow-500 text-xl'>Loading...</div> : <div className='lg:w-[37rem] md:w-[32rem] w-[90%] bg-white rounded-2xl text-gray-700 m-auto mt-5'>
                <div className='px-5 py-5'>
                    <h1 className='text-xl font-semibold'>KAISEN AIIMS, Patna</h1>
                    <h2 className='text-base font-medium'>Annual Fest</h2>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem] z-30'></div>
                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />
                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem] z-30'></div>
                </div>
                <div className='z-0'>
                    <img className='w-full h-fit mt-[-1rem]' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="event" />
                </div>
                <div className='z-0 flex flex-col items-center justify-center'>
                    <img className='w-[16rem] h-fit mt-[2rem]' src={data.passQr} alt="event" />
                    <p className='text-xl font-semibold'>{data.passId}</p>
                </div>
                <div className='flex flex-col p-6 gap-2'>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold text-lg text-black'>Name :</p>
                        <p className='font-medium'>{data.name}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold text-lg text-black'>Email :</p>
                        <p className='font-medium'>{data.email}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold text-lg text-black'>Phone :</p>
                        <p className='font-medium'>{data.phone}</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <p className='font-medium text-red-500 text-center'>*Do not share this link or QR code with anyone.</p>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem] z-30'>
                    </div>

                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />

                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem] z-30'>
                    </div>
                </div>

                <div>
                    <div className='flex justify-between items-center p-10'>
                        <p className='font-semibold text-lg text-black'>Total :</p>
                        <p className='font-bold text-xl text-yellow-500'>₹ 1000</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Pass