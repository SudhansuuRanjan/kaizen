import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { collection, getCountFromServer, where, getDocs } from 'firebase/firestore'
import { toast } from 'react-toastify'

const SearchPass = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // get count of passes from collection passes where the field checkInID exists

    const getSearchResults = async () => {
        setLoading(true);
        try {
            const passRef = collection(db, 'passes');
            // const snapshot = await getCountFromServer(passRef, where('checkInID', '==', ''));
            // setCount(snapshot.data().count);
            const snapshot = await getDocs(passRef);
            let temp = 0;
            snapshot.forEach(doc => {
                if (doc.data().checkInID) {
                    ++temp;
                }
            })
            setCount(snapshot.size - temp);
            setLoading(false);
            // console.log(snapshot.data().count);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }



    useEffect(() => {
        getSearchResults();
    }, []);


    return (
        <div>

            <div className='m-auto mb-5'>
                <h1 className='text-xl text-center text-[#ebe6d0] font-semibold'>Users without CheckInID</h1>
                <p className='text-center text-yellow-500 text-lg font-medium'>Count : {loading ? "..." : count}</p>
            </div>
        </div>
    )
}

export default SearchPass