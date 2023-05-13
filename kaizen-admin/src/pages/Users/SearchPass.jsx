import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { collection, getDocs, getDoc, query, where, limit, setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'
import { BsCheckAll } from 'react-icons/bs'
import { FaUserCheck } from 'react-icons/fa'

const SearchPass = () => {
    const auth = getAuth();
    const { name, email } = auth.currentUser;
    const allowedUsers = [
        'sudhanshuranjan2k18@gmail.com',
        'kaizen2023checkin@gmail.com',
        'prachi@aiimspatna.org',
        'rudrapriya@aiimspatna.org',
        'abhinavkumar@aiimspatna.org',
        'deepakranjan488@gmail.com',
        'sudhanshur.ug20.ee@nitp.ac.in'
    ]
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const querySnapshot = await getDocs(query(collection(db, 'passes'), where("checkInID", "==", searchTerm), limit(1)));
        const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSearchResults(results);
        setSuggestionsVisible(false);
    }

    const fetchSuggestions = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'passes'), where('checkInID', '>=', searchTerm), where('checkInID', '<=', searchTerm + '\uf8ff'), limit(10)));
            const suggestions = querySnapshot.docs.map((doc) => doc.data());
            setSuggestions(suggestions);
        } catch (error) {
            toast.error("error");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions();
        }, 300); // Debounce time of 300ms

        return () => clearTimeout(timer);
    }, [searchTerm]);


    return (
        <div className='min-h-screen'>
            {/* <div className='cart-banner'>
                <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Search Passes</h1>
            </div> */}

            <div className='m-auto flex items-center justify-center flex-col'>
                <h1 className='text-center lg:text-4xl md:text4xl text-3xl font-bold py-10'>Get Users by CheckIn ID</h1>
                <div className='flex relative items-center flex-col justify-center m-auto max-w-[25rem]'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSuggestionsVisible(true);
                            }}
                            placeholder="Enter CheckIn ID"
                            className='border w-[15rem] text-gray-600 border-gray-500 rounded-xl p-2.5'
                        />
                        <button onClick={() => setSuggestionsVisible(false)} className='category-btn hover:bg-[#ebe6d0] hover:text-gray-900' type="submit">Search</button>
                    </form>
                    <ul className={`bg-gray-900 top-16 absolute p-3 w-full rounded-xl self-start flex flex-col ${suggestionsVisible ? 'flex' : 'hidden'}`}>
                        {suggestions.map((suggestion, id) => (
                            <button onClick={() => {
                                setSearchTerm(suggestion.checkInID);
                                setSuggestionsVisible(false);
                            }} className='px-3 py-1.5 rounded-lg text-left' key={id}>
                                <div>
                                    🔍 {suggestion.name}
                                </div>
                            </button>
                        ))}
                    </ul>
                </div>

                <div className='m-auto'>
                    <div className='m-auto'>
                        {searchResults.length === 0 ? <div className='mt-10'>No results.</div>:  searchResults.map((user) => (
                            <div className='border lg:w-[30rem] md:w-[30rem] w-[95%] p-5 rounded-3xl bg-gray-900 bg-opacity-75 mt-10'>
                                <p>Name: <a href={`https://kaizenaiimspatna.com/br/${user.id}`} target="_blank" rel="noopener noreferrer">{user.name}</a></p>
                                <p>PassID: {user.passId}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                                <p>College: {user.college}</p>
                                <div className='border border-dashed p-3 pb-4 rounded-xl mt-3'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <p className='text-xl font-semibold pt-4'> CheckIn ID: {user.checkInID}</p>
                                        <div className='flex lg:gap-6 md:gap-6 gap-2.5 mt-7 mb-5'>
                                           {user.checkInData && <div>
                                                {user.checkInData.map((day, idx) => <div className='flex lg:gap-6 md:gap-6 gap-2.5' key={idx}>
                                                    <label className='text-lg font-bold' htmlFor="CheckIn ID">Day {idx + 1} <span className='text-yellow-500 font-medium'>({day.date})</span></label>
                                                    {/* <input onChange={handleChange} checked={day.checked} disabled={isTodaysDate(day.date)} type="checkbox" name="day1" id={`${idx}`} /> */}
                                                    <p className={`font-semibold ${day.checked ? 'text-lime-500' : 'text-rose-500'}`}>{day.checked ? 'Checked In' : "Unchecked"}</p>
                                                </div>)}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPass