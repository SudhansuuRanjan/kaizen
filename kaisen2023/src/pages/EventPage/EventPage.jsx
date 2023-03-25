import React, { useState, useEffect } from 'react'
import './Event.css'
import { Link } from 'react-router-dom';
import { BsArrowUpRight } from 'react-icons/bs';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';

const EventPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(0);
    const [events, setEvents] = useState([]);
    const [eventSnap, setEventsSnap] = useState(null);
    const [Loading, setLoading] = useState(true);
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



    const auth = getAuth();

    const getEvents = async () => {
        setLoading(true);
        const eventsRef = collection(db, 'events');
        try {
            if (selectedEvent !== 0) {
                // get events by category from firestore 
                const eventsSnap = await getDocs(query(eventsRef, where('category', '==', categories[selectedEvent].name)));
                setEvents(eventsSnap.docs.map(doc => doc.data()));
                // console.log(eventsSnap.docs.map(doc => doc.data()));
            } else {
                const eventsSnap = await getDocs(eventsRef);
                setEvents(eventsSnap.docs.map(doc => doc.data()));
                // console.log(eventsSnap.docs.map(doc => doc.data()));
            }

        } catch (err) {
            console.error(err);
        }
        // get event by category 

        setLoading(false);
    }

    useEffect(() => {
        getEvents();
    }, [selectedEvent]);


    return (
        <main className='bg-black'>
            <div className='event-banner'>
                <h1 className='event-head'>Events<br />2023</h1>
            </div>

            <div className='event-category-container'>
                {
                    categories.map((category, index) => (
                        <button onClick={() => setSelectedEvent(index)} className={`category-btn ${selectedEvent === index && "category-btn-active"}`} key={category.name}>{category.name}</button>
                    ))
                }
            </div>

            <div className='event-card-container'>

                {
                    Loading ? <div> Loading...</div> :
                        events.map((event, index) => (
                            <Link to={event.id} key={index}>
                                <div className='event-card'>
                                    <div className='event-detail'>
                                        <div className='flex justify-between items-center w-[100%]'>
                                            <h3>{event.name}</h3>
                                            <BsArrowUpRight size={32} className="font-bold" />
                                        </div>
                                        <div className='flex justify-between items-center w-[100%]'>
                                            <h4>{event.category}</h4>
                                            <h4 className='text-green-500'>{event.status}</h4>
                                        </div>
                                    </div>
                                    <img src={event.image} alt="treasure-hunt" loading='lazy' />
                                </div>
                            </Link>
                        ))
                }


            </div>

        </main>
    )
}

export default EventPage