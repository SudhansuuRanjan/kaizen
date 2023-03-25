import React, { useState, useEffect } from 'react'
import './Event.css'
import { Link } from 'react-router-dom';
import { BsArrowUpRight } from 'react-icons/bs';
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

const EventPage = () => {
    const [selectedEvent, setSelectedEvent] = useState(0);
    const [events, setEvents] = useState([]);
    const [eventSnap, setEventsSnap] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
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
    const navigate = useNavigate();
    const eventsRef = collection(db, 'events');

    const getEvents = async () => {
        setLoading(true);
        try {
            if (selectedEvent !== 0) {
                // get events by category from firestore 
                const eventsSnap = await getDocs(query(eventsRef, where('category', '==', categories[selectedEvent].name)));
                // add doc id and doc data in events
                setEvents(eventsSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() })));
                // console.log(eventsSnap.docs.map(doc => ({ id: doc.uid, ...doc.data() })));
            } else {
                const eventsSnap = await getDocs(eventsRef);
                setEvents(eventsSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() })));
                // console.log(eventsSnap.docs.map(doc => ({ id: doc.uid, ...doc.data() })));
            }

        } catch (err) {
            console.error(err);
        }
        // get event by category 

        setLoading(false);
    }

    useEffect(() => {
        getEvents();
    }, [selectedEvent, refresh]);


    // delete event from firestore
    const deleteEvent = async (id) => {
        // prompt user to confirm delete
        const confirm = window.confirm('Are you sure you want to delete this event?');
        if (!confirm) return;

        // delete event from firestore
        try {
            await deleteDoc(doc(db, 'events', id));
            setRefresh(!refresh);
            toast.success('Event deleted successfully');
        } catch (err) {
            toast.error('Error deleting event');
        }
    }

    const handleEdit = (id) => {
        navigate(`/edit-event/${id}`);
    }


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
                            <div key={index}>
                                <div className='event-card'>
                                    <div className='event-detail'>
                                        <div className='flex justify-between items-center w-[100%]'>
                                            <Link to={event.id} key={index}><h3>{event.name}</h3></Link>
                                            <BsArrowUpRight size={32} className="font-bold" />
                                        </div>
                                        <div className='flex justify-between items-center w-[100%]'>
                                            <h4>{event.category}</h4>
                                            <h4 className='text-green-500'>{event.status}</h4>
                                        </div>
                                        <div className='flex justify-end py-2 items-center w-[100%]'>
                                            <button onClick={() => handleEdit(event.uid)} className='edit-btn text-blue-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><FaEdit size={25} /></button>
                                            <button onClick={() => deleteEvent(event.uid)} className='delete-btn text-red-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><AiFillDelete size={25} /></button>
                                        </div>
                                    </div>
                                    <img src={event.image} alt="treasure-hunt" loading='lazy' />
                                </div>
                            </div>
                        ))
                }


            </div>

        </main>
    )
}

export default EventPage