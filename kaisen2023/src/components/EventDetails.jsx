import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import RegisterPopup from './RegisterPopup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EventDetails = ({ setModal, event, auth }) => {

    const [popup, setPopup] = useState(false);

    const navigate = useNavigate();

    const checkAuth = () => {
        if (auth.currentUser === null) {
            setModal(false);
            toast.error("Please login to continue!");
            navigate('/signin');
        } else {
            setPopup(true);
            document.body.style.overflow = 'hidden';
        }
    }

    return (
        <div className="h-[100vh] w-[100vw]  fixed z-[101] bg-[url('https://zeevector.com/wp-content/uploads/Old-Paper-Background-Free-768x1161.png')] top-0 flex items-center justify-center overflow-y-scroll md:overflow-hidden lg:overflow-hidden">

            {
                popup && <RegisterPopup setPopup={setPopup} event={event} />
            }

            <div className="h-[100%] w-[100%]">
                <div className='flex justify-between py-3 px-4'>
                    <div>
                        <Link to="/">
                            <p
                                className="font-sans text-3xl font-extrabold ml-2 md:ml-5 lg:ml-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 cursor-pointer"
                            >
                                <img src="/images/kaizen.png" alt="logo" className="h-10" />
                            </p>
                        </Link>
                    </div>

                    <button onClick={() => {
                        setModal(false);
                        document.body.style.overflow = 'auto';
                    }}>
                        <img src="https://img.icons8.com/ios/50/000000/close-window.png" alt="close" className='h-10 bg-red-800 rounded bg-opacity-20' />
                    </button>
                </div>

                <div className='flex flex-col lg:flex-row md:flex-row w-[100%] lg:justify-evenly
                md:justify-evenly lg:items-start md:items-start items-center justify-center m-auto mt-6'>
                    <div className="md:w-[50%] lg:w-[50%] flex flex-col md:pl-6 lg:pl-6 items-center justify-center">

                        <div className='border-img p-2 w-[85%] md:w-[90%] lg:w-[70%] h-fit overflow-hidden md:ml-0 lg:ml-6 lg:mt-10 md:mt-10'>
                            <img src={event.image} alt="" className='w-auto' />
                        </div>
                    </div>

                    <div className="p-8  md:w-[50%] lg:w-[50%]">
                        <div className='mb-5'>
                            <p
                                className="font-sans text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-400"
                            >
                                {event.name}
                            </p>
                            <p className='text-orange-500 font-semibold font-mono'>{event.category}</p>
                        </div>
                        <p className="text-orange-400  md:pr-5 lg:pr-16 font-mono">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis aperiam velit id magnam ex modi, reiciendis quia! In voluptatum est blanditiis asperiores sunt adipisci quasi quam autem id a vitae, ab quidem omnis modi at aut similique nihil placeat nemo quidem, voluptates nostrum.</p>

                        <div className='font-mono'>
                            <p className='text-orange-400 mt-3'><span className='text-orange-500'>No of team members: </span> {
                                event.participants == 1 ? 'Individual' : event.participants
                            }</p>
                        </div>

                        <div>
                            <p className='text-orange-500 mt-5 font-mono'>
                                Prize Worth:
                            </p>
                            <p className='font-bold text-3xl text-orange-400 font-mono'>{event.prize}</p>
                        </div>

                        <div className='flex relative ml-[-1rem] mt-4'>
                            <button onClick={checkAuth} className='relative flex items-center justify-center'>
                                <img src="images/btn.png" alt="btn" className='h-[6rem] w-[15rem]' />
                                <p className='absolute text-yellow-300 font-semibold text-xl font-mono'>Register</p>
                            </button>
                            <a href={event.rulebook} target="_blank" >
                                <button className='relative flex items-center justify-center'>
                                    <img src="images/btn1.png" alt="btn" className='h-[6rem] w-[15rem]' />
                                    <p className='absolute text-blue-900 font-semibold text-xl font-mono'>Rulebook</p>
                                </button>
                            </a>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default EventDetails