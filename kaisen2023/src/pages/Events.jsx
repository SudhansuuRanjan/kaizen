import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard';
import EventDetails from '../components/EventDetails';
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

const Events = () => {

  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState(0);
  const [events, setEvents] = useState([]);
  const [tray, settray] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const categories = [
    {
      name: "All Events",
      id: 0,
    },
    {
      name: "Literary",
      id: 1,
    },
    {
      name: "Cultural",
      id: 2,
    },
    {
      name: "Arts",
      id: 3,
    },
    {
      name: "Informals",
      id: 4,
    },
    {
      name: "Sports",
      id: 5,
    },
    {
      name: "Academics",
      id: 6,
    }
  ]

  // get all events from firestore
  const getEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const docs = [];
    querySnapshot.docs.map(doc => docs.push(doc.data()));
    setEvents(docs);
    setLoading(false);
    // console.log(docs);
  }

  useEffect(() => {
    getEvents();
  }, [])

  useEffect(() => {
    console.log(category)
  }, [category])

  // set scroll to none
  const handleTray = () => {
    document.body.style.overflow =
      !tray ? "hidden" : "auto";
    settray(!tray);
  }


  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 flex relative items-start">
      {modal && <EventDetails auth={auth} setModal={setModal} event={events[selectedEvent]} />}

      <div className={
        tray ? "flex bg-[url('https://zeevector.com/wp-content/uploads/Old-Paper-Background-Free-768x1161.png')] bg-no-repeat h-[90vh] w-[13.5rem] justify-between absolute lg:relative md:relative left-0 lg:left-0 md:left-0 z-[100]" : "flex bg-[url('https://zeevector.com/wp-content/uploads/Old-Paper-Background-Free-768x1161.png')] bg-no-repeat h-[90vh] w-[15rem] justify-between absolute lg:relative md:relative left-[-100%] lg:left-0 md:left-0 z-[100]"
      }>
        <img src="images/list2.png" alt="list2" className='z-20' />
        <div className='h-fit text-gray-800'>
          <img src="images/list1.png" className='z-30' alt="list2" />
          <h1 className='text-3xl font-bold underline underline-offset-4 decoration-orange-600 decoration-wavy pl-6 pt-6'>
            Events
          </h1>
          <ul className='flex flex-col gap-4 mt-8 pl-6'>
            {
              categories.map((cat, id) => (
                <li key={cat.id}><button onClick={() => {
                  setCategory(id);
                }} className={
                  cat.id
                    === category ? 'px-6 py-2 bg-pink-700 bg-opacity-30 rounded-xl w-[10rem] text-left text-pink-700 font-semibold' : 'px-6 py-2 hover:bg-pink-700 hover:bg-opacity-30 rounded-xl w-[10rem] text-left hover:text-pink-700 font-semibold'
                }>{cat.name}</button>
                </li>
              ))
            }
          </ul>
          <img src="images/list1.png" className='z-30 absolute bottom-0 ml-[-5%]' alt="list2" />
        </div>
        <img src="images/list2.png" alt="list2" className='z-20' />
      </div>


      <div className='flex-1 flex flex-col items-center justify-start m-auto px-5 lg:px-10 md:px-10 min-h-[90vh]'>
        <button onClick={handleTray} className='bg-yellow-200 px-11 py-2 rounded-xl text-yellow-800 font-semibold border border-yellow-700 self-end mt-7 mb-3 block lg:hidden md:hidden' >
          {
            tray ? "Close" : "Category"
          }
        </button>
        <div className="bg-[#E9CC7E] border-img  bg-opacity-10 backdrop-blur-sm rounded-xl m-8 mt-12 w-[100%] bg-center">
          <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-10 lg:h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
            <p className='text-xl lg:text-2xl font-bold text-yellow-200 px-5'>{categories[category].name}</p>
          </div>


          <div className='flex items-center flex-wrap justify-evenly gap-2 mt-16 mb-10'>

            {loading ? (
              <div className='flex items-center justify-center w-[100%] h-[50vh]'>
                <p className='text-2xl font-semibold text-yellow-400'>Loading...</p>
              </div>
            ) :
              events.map((event, id) => (
                <EventCard key={id} id={id} event={event} setModal={setModal} setSelectedEvent={setSelectedEvent} />
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Events