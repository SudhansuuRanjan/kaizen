import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import RegisterPopup from './RegisterPopup';

const EventDetails = () => {
  const auth = getAuth();
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
    console.log(event[0])
  }

  useEffect(() => {
    getEvent();
  }, [])

  // handle register button
  const checkAuth = () => {
    if (auth.currentUser === null) {
      setModal(false);
      toast.error("Please login to continue!");
      navigate('/signin');
    } else {
      setPopup(true);
    }
  }


  return (
    <div className='bg-black pb-[5rem] min-h-screen relative'>
      {
        popup && <RegisterPopup event={data} setPopup={setPopup}/>
      }

      {
        Loading ? <div className='flex pt-[10rem] w-[100%] items-center justify-center'> <p>Loading...</p></div> : (
          <>
            <div className='event-page-head'>
              <i>Kaizen 2023 presents</i>
              <h1>{data.name}</h1>
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
                </div>
                <div className='w-[100%]'>
                  <a href={data.rulebook}><button className='rulebook-btn'>Rulebook</button></a>
                  <button onClick={checkAuth} className='register-btn'>Register Now</button>
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