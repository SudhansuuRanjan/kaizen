import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'

const VerifyPass = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSuggestions();
        }, 300); // Debounce time of 300ms

        return () => clearTimeout(timer);
    }, [searchTerm]);


    const fetchSuggestions = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'passes'), where('passId', '>=', searchTerm), where('passId', '<=', searchTerm + '\uf8ff'), limit(10)));
            const suggestions = querySnapshot.docs.map((doc) => doc.data());
            setSuggestions(suggestions);
        } catch (error) {
            console.log("error");
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        try {
            e.preventDefault();

            const querySnapshot = await getDocs(query(collection(db, 'passes'), where('passId', '>=', searchTerm), where('passId', '<=', searchTerm + '\uf8ff'), limit(10)));

            const results = querySnapshot.docs.map((doc) => doc.data());
            setSearchResults(results);
            setLoading(false);
        } catch (error) {
            console.log("error");
        }
        setLoading(false);
    };

    return (
        <main className='bg-black min-h-[150vh]'>
            <div className='event-banner'>
                <h1 className='event-head'>Verify Pass</h1>
            </div>
            <div className='m-auto'>
                <div className='flex relative items-center flex-col justify-center m-auto max-w-[25rem]'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSuggestionsVisible(true);
                            }}
                            placeholder="Search users"
                            className='border w-[15rem] text-gray-600 border-gray-500 rounded-xl p-2.5'
                        />
                        <button onClick={() => setSuggestionsVisible(false)} className='category-btn hover:bg-[#ebe6d0] hover:text-gray-900' type="submit">Search</button>
                    </form>
                    <ul className={`bg-gray-900 top-16 absolute p-3 w-full rounded-xl self-start flex flex-col ${suggestionsVisible ? 'flex' : 'hidden'}`}>
                        {suggestions.map((suggestion, id) => (
                            <button onClick={() => {
                                setSearchTerm(suggestion.passId);
                                setSuggestionsVisible(false);
                            }} className='px-3 py-1.5 rounded-lg text-left' key={id}>
                                <div>
                                    🔍 {suggestion.name}
                                </div>
                            </button>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1 className='text-center text-4xl font-bold py-10'>Users</h1>
                </div>



                <div className='flex flex-col justify-center items-center gap-5 pb-16'>
                    {
                        loading ? "loading..." : searchResults.length === 0 ? 'No results.' : searchResults.map((user, index) => (
                            <div key={index} className='border lg:w-[30rem] md:w-[30rem] w-[90%] p-5 rounded-2xl'>
                                <p>Name: {user.name}</p>
                                <p>PassID: {user.passId}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                                <p>College: {user.college}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default VerifyPass