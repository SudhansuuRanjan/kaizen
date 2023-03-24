import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import RegisterPopup from './RegisterPopup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [popup, setPopup] = useState(false);
  const [Loading, setLoading] = useState(true);

  // get event id from url
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  // get event data from firestore
  const getEvent = async () => {
    setLoading(true);
    const eventsRef = collection(db, 'events');
    const eventsSnap = await getDocs(eventsRef);
    const event = eventsSnap.docs.map(doc => doc.data()).filter((item) => item.id === id);
    setData(event[0]);
    setLoading(false);
    // console.log(event[0])
  }

  useEffect(() => {
    getEvent();
  }, [])

  // handle register button
  // const checkAuth = () => {
  //   if (auth.currentUser === null) {
  //     toast.error("Please login to continue!");
  //     navigate('/signin');
  //   } else {
  //     setPopup(true);
  //   }
  // }


  return (
    <div className='bg-black pb-[5rem] min-h-screen relative'>
      {
        popup && <RegisterPopup event={data} setPopup={setPopup} />
      }

      {
        Loading ? <div className='flex pt-[10rem] w-[100%] items-center justify-center'> <p>Loading...</p></div> : (
          <>
            <div className='event-page-head'>
              <h1>{data.name}</h1>
              <p className='lg:text-4xl text-3xl font-medium py-2'>{data.tagline}</p>
              <p className='py-4'><i >Presented by <a href={data.sponsor} className='text-yellow-500 text-lg font-medium'>{data.sponsorName}</a></i></p>
            </div>

            <div className='event-page-event-container'>
              <div className='event-img-container'>
                <img src={data.image} alt="envent" />
              </div>
              <div className='event-details-container'>
                <div>
                  <div className='flex gap-5 items-center'>
                    <img src="https://ragam.co.in/images/assets/circle%20selected.svg" alt="wsw" />
                    <h3 className='font-bold text-2xl'>About the event</h3>
                  </div>
                  <p className='details-text'>
                    {data.description}
                  </p>
                  <div className='flex py-10 lg:flex-row md:flex-row flex-col justify-between items-start gap-4 text-xl w-[100%] font-medium border-bottom'>
                    <div className='flex items-center gap-2 justify-center'>
                      <h3>Prize Pool:</h3>
                      <span className='text-yellow-500 font-bold text-2xl'> ₹{data.prize}</span>
                    </div>
                    <div className='flex items-center gap-2 justify-center'>
                      <h3>Registration Fee:</h3>
                      <span className='text-yellow-500'> ₹{data.price}</span>
                    </div>
                  </div>
                </div>
                <div className='w-[100%]'>
                  <a href={data.rulebook}><button className='rulebook-btn'>Rulebook</button></a>
                  {/* <button onClick={checkAuth} className='register-btn'>Register Now</button> */}
                </div>
              </div>
            </div>

            <div className='flex items-center justify-center gap-3 pt-[10rem]'>
              <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
              <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
              <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
            </div>
          </>
        )
      }
    </div>
  )
}

export default EventDetails