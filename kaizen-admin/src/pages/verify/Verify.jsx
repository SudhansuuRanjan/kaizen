import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config';
import { collection, getDocs, getDoc, query, where, limit, setDoc, doc } from 'firebase/firestore'
import CsvDownloadButton from 'react-json-to-csv'

function Verify() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // get 10 passes at a time
    const getAllPasses = async () => {
        setLoading(true);
        const q = query(collection(db, "passes"));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc, idx) => ({ SerialNo: idx + 1, id: doc.id, ...doc.data() }));

        for (let i = 0; i < results.length; i++) {
            if (results[i].hasOwnProperty('checkInData')) {
                delete results[i]['checkInData'];
            }
        }

        setUsers(results);
        setLoading(false);
    }

    return (
        <main className='bg-black min-h-[100vh]'>
            <div className='event-banner'>
                <h1 className='event-head'>Get Pass Data</h1>
            </div>

            <div className='flex flex-col items-center justify-center gap-10'>
                {users.length === 0 && <button disabled={loading} className='bg-yellow-500 px-10 py-2.5 text-gray-900 font-medium rounded-xl shadow-lg hover:bg-yellow-600' onClick={getAllPasses}>Get Pass Data</button>}

                {loading ? <div className='text-xl text-center'>loading...</div> : users.length > 1 && <div>
                    <p className='text-xl text-center font-semibold'>Total Passes : {users.length}</p>

                    <div className='m-auto flex items-center justify-center my-10'>
                        <CsvDownloadButton className='bg-yellow-500 px-10 py-2.5 text-gray-900 font-medium rounded-xl shadow-lg hover:bg-yellow-600' filename={"pass-data.csv"} data={users} />
                    </div>

                </div>}
            </div>
        </main>
    );
}

export default Verify;
