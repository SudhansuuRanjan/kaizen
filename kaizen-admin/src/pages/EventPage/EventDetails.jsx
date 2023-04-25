import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import RegisterPopup from './RegisterPopup';
import { useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [registrations, setRegistrations] = useState(null);
  const [popup, setPopup] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [regLoading, setRegLoading] = useState(true);

  // get event id from url
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  // get event data from firestore
  const getEvent = async () => {
    setLoading(true);
    const eventsRef = collection(db, 'events');
    const eventsSnap = await getDocs(query(eventsRef, where('id', '==', id)));
    const events = eventsSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    setData(events[0]);
    setLoading(false);
  }


  const getRegistrations = async () => {
    setRegLoading(true);
    const regRef = collection(db, 'registrations');
    const regSnap = await getDocs(query(regRef, where('eventId', '==', id)));
    const registrations = regSnap.docs.map(doc => ({ ...doc.data() }));
    setRegistrations(registrations);
    // console.log(registrations);
    setRegLoading(false);
  }

  useEffect(() => {
    getEvent();
    getRegistrations();
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
              <h1>{data.name.trim('')}</h1>
              <p className='lg:text-4xl text-3xl font-medium py-2'>{data.tagline}</p>
              {
                data.sponsor !== "" && <p className='py-4'><i >Presented by <a href={data.sponsor} className='text-yellow-500 text-lg font-medium'>{data.sponsorName}</a></i></p>
              }
            </div>

            <div className='event-page-event-container'>
              <div className='event-img-container'>
                <img src={data.image} alt="enent" loading='lazy' />
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
                  <div className='flex pt-2 flex-col justify-between items-start gap-4 text-xl w-[100%] font-medium'>
                    <div className='flex flex-col items-start gap-2 justify-center'>
                      <h3 className='details-text m-0 p-0'>For any query contact:</h3>
                      {
                        data.contacts.map((item, index) => {
                          return (
                            <div key={index} className='flex items-center text-base justify-center gap-1'>
                              <span className='details-text m-0 p-0'>{item.name} - </span>
                              <a className='details-text m-0 p-0'>{item.contact}</a>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='flex items-center gap-2 justify-center'>
                      <h3>Team Size:</h3>
                      <span className='text-yellow-500'>{data.participants == '1' ? 'Solo' :
                        data.minMem + '-' + data.participants} </span>
                    </div>
                  </div>
                  <div className='flex py-10 pt-6 lg:flex-row md:flex-row flex-col justify-between items-start gap-4 text-xl w-[100%] font-medium border-bottom'>
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

            <p className='text-center my-16'>
              <span className='text-yellow-500 font-bold text-4xl text-center my-16'>Registrations</span>
            </p>

            <div className='flex flex-wrap items-center gap-2'>
              {
                regLoading ? <div className='flex pt-[10rem] w-[100%] justify-evenly '> <p>Loading...</p></div> : (
                  registrations.map((item, index) => {
                    return (
                      <div key={index} className='flex flex-col items-start justify-start gap-2 w-[100%] lg:w-1/3 md:w-1/2 p-3 border rounded-2xl m-2'>
                        <div className='flex items-start justify-start gap-2'>
                          {/* <img src={item.image} alt="user" className='w-16 h-16 rounded-full' /> */}
                          <h3 className='text-xl font-medium'>Serial no: {index + 1}</h3>
                        </div>
                        <div className='flex items-start justify-start gap-2'>
                          {/* <img src={item.image} alt="user" className='w-16 h-16 rounded-full' /> */}
                          <h3 className='text-xl font-medium'>Name: {item.name}</h3>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <h3 className='text-xl font-medium'>Email:</h3>
                          <h3 className='text-xl font-medium'>{item.email}</h3>
                        </div>

                        <div>
                          <h3 className='text-xl font-medium'>Members:</h3>
                          <div className='py-2 flex gap-2 flex-col'>
                            {
                              item.members.map((member, index) => (
                                <div key={index} className='flex flex-col justify-start text-gray-400'>
                                  <div>
                                    <h3 className='text-base font-medium'>{index + 1}. Name : {member.name}</h3>

                                  </div>
                                  <div>
                                    <h3 className='text-base font-medium'>Email : {member.email}</h3>
                                  </div>

                                </div>

                              ))
                            }
                          </div>
                        </div>
                      </div>
                    )
                  }))}
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