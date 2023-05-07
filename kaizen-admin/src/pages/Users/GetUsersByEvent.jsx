import React, { useState, useEffect } from 'react'
import { getDocs, collection, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase.config'
import CsvDownloadButton from 'react-json-to-csv'
import Select from 'react-select'

const GetUsersByEvent = () => {

    const [users, setUsers] = useState([]);
    const [eventId, setEventId] = useState('hogathon');
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [evnets, setEvents] = useState([]);

    // get all users from firestore and then sort them by eventId and push them to an array whose purchased events is equal to true

    const getUsers = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef);
            const snapshot = await getDocs(q);
            const usersList = snapshot.docs.map(doc => doc.data());

            // get users with unempty carts
            const actualData = usersList.filter((user) => user.cart.length > 0);

            const data = [];
            setUsers(usersList);

            for (let i = 0; i < actualData.length; i++) {
                const { name, email, college, gender, cart, phone } = actualData[i];
                const userData = {
                    name,
                    email,
                    college,
                    phone,
                    gender: gender === undefined ? 'unknown' : gender,
                };
                // console.log(userData);

                for (let j = 0; j < cart.length; j++) {
                    const eventdata = {
                        ...userData,
                        eventName: cart[j].name,
                        eventId: cart[j].eventId,
                        purchased: cart[j].purchased,
                        members: cart[j].members,
                        serialNo: i+1,
                    }
                    if (eventdata.purchased && eventdata.eventId === eventId) {
                        data.push(eventdata);
                    }
                }
            }
            setEventData(data);
            // console.log(data);
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    }

    // get all events from firestore
    const getEvents = async () => {
        try {
            const eventsRef = collection(db, 'events');
            const q = query(eventsRef);
            const snapshot = await getDocs(q);
            const eventsList = snapshot.docs.map(doc => doc.data());
            const data = eventsList.map((event) =>
            ({
                value: event.id,
                label: event.name
            }
            ));
            // console.log(data);
            setEvents(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getEvents();
    }, [])



    return (
        <main className='bg-black min-h-screen'>
            <div className='event-banner'>
                <h1 className='event-head'>Get Users by Event</h1>
            </div>

            <div className='container'>
                <form className='m-auto flex gap-3 items-center justify-center mb-5'>
                    <div className='flex items-center'>
                        <label htmlFor="eventId" className="form-label">Event</label>
                        <Select required onChange={(e) => setEventId(e.value)} className='w-[20rem] text-gray-600  rounded-xl px-3 py-3 ml-5' options={evnets} />
                        {/* <input type="text" value={eventId} className='border w-[17rem] text-gray-600 border-gray-500 rounded-xl px-3 py-2.5 ml-5' id="eventId" onChange={(e) => setEventId(e.target.value)} /> */}
                    </div>
                    <button disabled={loading} type="submit" className='category-btn hover:bg-[#ebe6d0] hover:text-gray-900' onClick={getUsers}>Submit</button>
                </form>
            </div>
            {loading ? <div className='text-center py-16 text-lg font-medium text-yellow-500'> Loading...</div> : eventData.length === 0 ? <div className='text-center py-16'>Search by eventId / No data.</div> : <div>
                <div className='m-auto flex items-center justify-center my-10'>
                    <CsvDownloadButton className='bg-yellow-500 px-10 py-2.5 text-gray-900 font-medium rounded-xl shadow-lg hover:bg-yellow-600' filename={eventId + ".csv"} data={eventData} />
                </div>
                <div className='flex flex-col justify-center items-center gap-5'>
                    {
                        eventData.map((data, id) => (
                            <div className='border lg:w-[30rem] md:w-[30rem] w-[90%] p-5 rounded-2xl' key={id}>
                                <p>Serial No.: {data.serialNo}</p>
                                <p>Name: {data.name}</p>
                                <p>Email: {data.email}</p>
                                <p>College: {data.college}</p>
                                <p>Phone: {data.phone}</p>
                                <p>Event: {data.name}</p>
                                <p>EventID: {data.eventId}</p>
                                <p>Purchased: {data.purchased ? "true" : "false"}</p>
                                <p className='text-blue-300'>EventMembers:</p>
                                <div className='ml-2'>
                                    {data.members.length === 0 ? <p>No members</p> :
                                        data.members.map((mem, index) => (
                                            <div key={index}>
                                                <p>Name: {mem.name}</p>
                                                <p>Email: {mem.email}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>}
        </main>
    )
}

export default GetUsersByEvent