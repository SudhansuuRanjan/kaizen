import React, { useState, useEffect } from 'react'
import { getDocs, collection, orderBy, query, limit, startAt } from 'firebase/firestore'
import { db } from '../../firebase.config'

const Users = () => {

    const [users, setUsers] = useState([]);
    const [lastVisible, setLastVisible] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10);
    const [inpNumber, setInpNumber] = useState(10);

    // get paginated users from firestore
    const getUsers = async () => {
        setLoading(true);
        const usersRef = collection(db, 'users');
        const q = query(usersRef, limit(count));
        const snapshot = await getDocs(q);
        const usersList = snapshot.docs.map(doc => doc.data());
        setUsers(usersList);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        console.log(usersList);
        setLoading(false);
    }

    // get next paginated users from firestore
    const getNextUsers = async () => {
        if (users.length < count) return;
        setLoading(true);
        const usersRef = collection(db, 'users');
        const q = query(usersRef, startAt(lastVisible), limit(count));
        const snapshot = await getDocs(q);
        const usersList = snapshot.docs.map(doc => doc.data());
        setUsers(usersList);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        // console.log("next ", usersList);
        setIndex(index + count);
        setLoading(false);
    }

    // get previous paginated users from firestore
    const getPrevUsers = async () => {
        if (users.length < count) return;
        setLoading(true);
        const usersRef = collection(db, 'users');
        const q = query(usersRef, startAt(lastVisible), limit(count));
        const snapshot = await getDocs(q);
        const usersList = snapshot.docs.map(doc => doc.data());
        setUsers(usersList);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        // console.log("back ", usersList);
        setIndex(index - count);
        setLoading(false);
    }

    useEffect(() => {
        getUsers();
    }, [count])

    return (
        <main className='bg-black'>
            <div className='event-banner'>
                <h1 className='event-head'>Users</h1>
            </div>
            <div className='m-auto pb-32'>

                {/* <form>
                    <input type="text" placeholder="KAIZENID" className='border border-gray-500 rounded-md p-2' />
                    <button className='category-btn hover:bg-[#ebe6d0] hover:text-gray-900'>Search</button>
                </form> */}

                <form onSubmit={async(e)=>{
                    e.preventDefault();
                    setCount(parseInt(inpNumber));
                }} className='m-auto flex items-center justify-center mb-5'>
                    <p className='text-white mr-5'>Set Count</p>
                    <input onChange={(e) => setInpNumber(e.target.value)} value={inpNumber} min={10} max={50} type="number" placeholder="Set Count" className='border w-[10rem] text-gray-600 border-gray-500 rounded-md p-2' />
                    <button type='submit' className='category-btn hover:bg-[#ebe6d0] hover:text-gray-900'>Set</button>
                </form>

                 <div className='m-auto flex items-center justify-center mb-5'>
                    <button className='category-btn hover:bg-[#ebe6d0] hover:text-gray-900' onClick={getPrevUsers}>Prev</button>
                    <button className='category-btn hover:bg-[#ebe6d0] hover:text-gray-900' onClick={getNextUsers}>Next</button>
                </div>

                <div>
                    <p className='text-center text-white my-10'>Showing {index + 1} - {index + count}</p>
                </div>

                <div className='flex flex-col justify-center items-center gap-5'>
                    {
                        loading ? "loading..." : users.map((user, index) => (
                            <div key={index} className='border lg:w-[30rem] md:w-[30rem] w-[90%] p-5 rounded-2xl'>
                                <p>Name: {user.name}</p>
                                <p>KaizenID: {user.id}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                                <p>Gender: {user.gender}</p>
                                <p>Address: {user.address}</p>
                                <p>City: {user.city}</p>
                                <p>College: {user.college}</p>

                                <p className='text-yellow-500 pt-3'>Cart</p>
                                <div className='ml-3 flex flex-col gap-2 mt-2'>
                                    {
                                        Array.isArray(user.cart) && user.cart.filter((e) => e.purchased === true).length === 0 ? <div>no events purchased.</div> : user.cart.filter((e) => e.purchased === true).map((event, index) => (
                                            <div key={index} className='border-dashed border rounded-xl p-3'>
                                                <p>Event: {event.name}</p>
                                                <p>EventID: {event.eventId}</p>
                                                <p>Purchased: {event.purchased ? "true" : "false"}</p>
                                                <p className='text-blue-300'>EventMembers:</p>
                                                <div className='ml-2'>
                                                    {event.members.length === 0 ? <p>No members</p> :
                                                        event.members.map((mem, index) => (
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
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default Users