import React, { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase.config'

const Users = () => {

    const [users, setUsers] = useState([]);

    // get paginated users from firestore
    const getUsers = async () => {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersList);
    }

    useEffect(()=>{
        getUsers();
    },[])

    return (
        <main className='bg-black'>
            <div className='event-banner'>
                <h1 className='event-head'>Users</h1>
            </div>
        </main>
    )
}

export default Users