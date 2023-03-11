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
  const [selectedEvent, setSelectedEvent] = useState({});
  const auth = getAuth();

  const categories = [
    {
      name: "All",
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
    // console.log(docs);
  }

  useEffect(() => {
    getEvents();
  }, [])


  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 flex relative">
      {modal && <EventDetails auth={auth} setModal={setModal} event={events[selectedEvent]} />}

      <div className="flex bg-[url('https://zeevector.com/wp-content/uploads/Old-Paper-Background-Free-768x1161.png')] bg-no-repeat h-[90vh] w-[15rem] justify-between relative">
        <img src="images/list2.png" alt="list2" className='z-20' />
        <div className='h-fit text-gray-800'>
          <img src="images/list1.png" className='z-30' alt="list2" />
          <h1 className='text-3xl font-bold underline underline-offset-4 decoration-orange-600 decoration-wavy pl-6 pt-6'>
            Events
          </h1>
          <ul className='flex flex-col gap-4 mt-8 pl-6'>
            {
              categories.map((category) => (
                <li key={category.id}><button className='px-6 py-2 hover:bg-pink-700 hover:bg-opacity-30 rounded-xl w-[10rem] text-left hover:text-pink-700 font-semibold'>{category.name}</button>

                </li>
              ))
            }
          </ul>
          <img src="images/list1.png" className='z-30 absolute bottom-0 ml-[-5%]' alt="list2" />
        </div>
        <img src="images/list2.png" alt="list2" className='z-20' />
      </div>

      <div className='w-[100%] flex'>
        <div className="bg-[#E9CC7E] border-img  bg-opacity-10 backdrop-blur-sm rounded-xl m-8 mt-12 w-[100%] bg-center">
          <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
            <p className='text-2xl font-bold text-yellow-200 px-5'>Event Type</p>
          </div>


          <div className='flex items-center flex-wrap justify-evenly gap-2 mt-16'>

            {
              events.map((event, id) => (
                <EventCard key={id} id={id} event={event} setModal={setModal} setSelectedEvent={setSelectedEvent}/>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Events