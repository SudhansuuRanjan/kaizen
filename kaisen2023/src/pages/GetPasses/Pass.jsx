import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import QRCode from "react-qr-code";

const Pass = () => {
    document.title = 'KAIZEN 2023 | BRPass';
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const [Loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    const getPass = async () => {
        setLoading(true);
        try {
            const passRef = collection(db, 'passes');
            // console.log(id);
            const passSnap = await getDocs(query(passRef, where('id', '==', id)));
            const pass = passSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
            // console.log(pass);
            setData(pass[0]);
            if (pass.length === 0) {
                setError(true);
                toast.error('Invalid PassID!');
            }
        } catch (error) {
            setError(true);
            toast.error('Something went wrong, please try again later.');
        }
        setLoading(false);
    }

    useEffect(() => {
        getPass();
    }, [])

    if (error) return (
        <div className='bg-black pb-24'>
            <div className='cart-banner'>
                <h1 className='cart-head'>Your Basic Pass</h1>
            </div>
            <div className='text-center pt-10 font-medium text-yellow-500 text-xl'>Something went wrong, please try again later</div>
        </div>
    );


    return (
        <div className='bg-black pb-24 min-h-screen'>
            <div className='cart-banner'>
                <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Your BR Card</h1>
            </div>

            {Loading ? <div className='text-center pt-10 font-medium text-yellow-500 text-xl'>Loading...</div> : <div className='lg:w-[37rem] md:w-[32rem] w-[90%] bg-white rounded-2xl text-gray-700 m-auto mt-5'>
                <div className='px-5 py-5'>
                    <h1 className='text-xl font-semibold'>KAIZEN AIIMS, Patna</h1>
                    <h2 className='text-base font-medium'>Annual Fest</h2>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem] z-30'></div>
                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />
                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem] z-30'></div>
                </div>
                <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/images%2Fbsic-reg.jpg?alt=media&token=d796d016-e48e-419c-9ca7-f3422ad0e28e")] mt-[-1rem] bg-cover bg-center w-full h-fit text-sm text-white font-normal'>
                    <div className='h-full w-full bg-black bg-opacity-80 p-5'>
                        <p className='pb-2 text-yellow-400 text-base'>This Basic Registration includes:</p>
                        <ul className='list-inside'>
                            {/* <li>✅Lunch on all 5 days</li> */}
                            {/* <li>✅ Kaizen Merchandise & Goodies</li> */}
                            <li>✅ Access to all the events</li>
                            <li>✅ A seat in Medical Workshops lead under eminent faculty of AIIMS Patna:</li>
                            <ul className='list-inside ml-4'>
                                <li>👉 Basic Life Support (BLS)  Workshop</li>
                                <li>👉 Workshop on Laporoscopic Surgery</li>
                                <li>👉 Suturing Workshop</li>
                                <li>👉 Hand Hygiene Skill Station</li>
                            </ul>
                            <li>✅ Participation in Gully Cricket, Darts, Arm Wrestling and Push-up Challenge</li>
                            <li>✅ Access to our 360° Selfie Booth</li>
                            <li>✅ Bus transportation facility against designated routes in Patna</li>
                            <li>✅ Audience viewership across all events held under Kaizen, AIIMS Patna</li>
                        </ul>
                    </div>
                </div>
                {/* <div className='z-0'>
                    <img className='w-full h-fit mt-[-1rem]' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="event" />
                </div> */}
                <div className='z-0 flex flex-col items-center justify-center m-10 h-[16rem]'>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={"https://www.kaizenaiimspatna.com/br/" + data.passId}
                        viewBox={`0 0 256 256`}
                    />
                    <p className='text-2xl font-semibold pt-2'>{data.passId}</p>
                </div>
                <div className='flex flex-col lg:p-6 md:p-6 p-3 gap-2'>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold lg:text-lg md:text-lg text-base text-black'>Name :</p>
                        <p className='font-medium lg:text-base md:text-base text-sm'>{data.name}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold lg:text-lg md:text-lg text-base text-black'>Email :</p>
                        <p className='font-medium lg:text-base md:text-base text-sm'>{data.email}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold lg:text-lg md:text-lg text-base text-black'>College :</p>
                        <p className='font-medium lg:text-base md:text-base text-sm'>{data.college}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold lg:text-lg md:text-lg text-base text-black'>Phone :</p>
                        <p className='font-medium lg:text-base md:text-base text-sm'>{data.phone}</p>
                    </div>

                    {data.checkInID ? <div>
                        <p className='text-lg font-semibold'> CheckIn ID: {data.checkInID}</p>
                    </div> : <div>
                        <p className='font-medium text-red-500 text-center px-5'>Warning ⚠️ No physical I'd card issued. Collect physical I'd card first.</p>
                    </div>}

                    <div className='flex gap-2 items-center justify-center'>
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
                    <div className="text-2xl text-center font-bold text-cyan-700">Your Check In Stats</div>
                    {data.checkInID ? <div className='flex lg:text-lg md:text-lg text-base flex-col m-auto justify-between items-center pt-5'>
                        {data.checkInData.map((day, index) => (
                            <div key={index} className='flex m-auto items-start gap-3'>
                                <p className='font-semibold text-black'>Day {index + 1} <span className='text-blue-500'>({day.date})</span> :</p>
                                <p className={`font-semibold ${day.checked ? 'text-green-600' : 'text-rose-500'}`}>{day.checked ? 'Checked In' : "Unchecked"}</p>
                            </div>
                        ))}
                    </div> : <p className='font-medium py-5 text-center'>Collect physical I'd card first to get your data.</p>}
                    <div className='flex justify-between items-center lg:p-10 md:p-10 p-5'>
                        {/* <p className='font-semibold text-lg text-black'>Total :</p>
                        <p className='font-bold text-xl text-yellow-500'>₹ 1200</p> */}
                        <img className='w-full h-auto' src="/images/sponsors.jpg" alt="Sponsors" />
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Pass