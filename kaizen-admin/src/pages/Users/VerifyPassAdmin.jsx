import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { collection, getDocs, getDoc, query, where, limit, setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { getAuth } from 'firebase/auth'


const isTodaysDate = (date) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayDate = dd + '-' + mm + '-' + yyyy;
    return date !== todayDate;
}

const VerifyPassAdmin = () => {
    const auth = getAuth();
    const { name, email } = auth.currentUser;
    const allowedUsers = [
        'sudhanshuranjan2k18@gmail.com',
        'kaizen2023checkin@gmail.com',
        'prachi@aiimspatna.org',
        'rudrapriya@aiimspatna.org',
        'abhinavkumar@aiimspatna.org'
    ]
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState({});
    const [loading, setLoading] = useState(false);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [checkInID, setCheckInID] = useState('');
    const [todayCheckedIn, setTodayCheckedIn] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [formData, setFormData] = useState([
        {
            checked: false,
            date: '11-05-2023',
        },
        {
            checked: false,
            date: '12-05-2023',
        },
        {
            checked: false,
            date: '13-05-2023',
        },
        {
            checked: false,
            date: '14-05-2023',
        }
    ]);
    const [checkedinData, setCheckedInData] = useState([]);

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
            toast.error("error");
        }
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }
        setLoading(true);
        setCheckInID('');
        try {

            const querySnapshot = await getDocs(query(collection(db, 'passes'), where('passId', '>=', searchTerm), where('passId', '<=', searchTerm + '\uf8ff'), limit(10)));

            const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setSearchResults(results[0]);
            if (results[0].checkInData) {
                // console.log(results[0].checkInData);
                setFormData(results[0].checkInData);
                setCheckedInData(results[0].checkInData);
            } else {
                setFormData([
                    {
                        checked: false,
                        date: '11-05-2023',
                    },
                    {
                        checked: false,
                        date: '12-05-2023',
                    },
                    {
                        checked: false,
                        date: '13-05-2023',
                    },
                    {
                        checked: false,
                        date: '14-05-2023',
                    }
                ])
                setCheckedInData([
                    {
                        checked: false,
                        date: '11-05-2023',
                    },
                    {
                        checked: false,
                        date: '12-05-2023',
                    },
                    {
                        checked: false,
                        date: '13-05-2023',
                    },
                    {
                        checked: false,
                        date: '14-05-2023',
                    }
                ]);
            }
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    const setCheckInIDHandler = async (id) => {
        // get pass with doc id and update checkInID

        try {
            setLoading1(true);
            await setDoc(doc(db, 'passes', id), { checkInID: checkInID }, { merge: true });
            handleSubmit();
            setLoading1(false);
            toast.success('Check-in ID updated successfully');
        } catch (error) {
            setLoading1(false);
            toast.error('Error updating check-in ID');
        }
    }

    const handleCheckIn = async (id) => {
        try {
            setLoading2(true);
            // console.log(formData, id);
            await setDoc(doc(db, 'passes', id), { checkInData: formData }, { merge: true });
            setFormData([
                {
                    checked: false,
                    date: '11-05-2023',
                },
                {
                    checked: false,
                    date: '12-05-2023',
                },
                {
                    checked: false,
                    date: '13-05-2023',
                },
                {
                    checked: false,
                    date: '14-05-2023',
                }
            ])
            handleSubmit();
            setTodayCheckedIn(false);
            setLoading2(false);
            toast.success('Check-in successful');
        } catch (error) {
            setLoading2(false);
            toast.error('Error checking in');
        }
    }

    const handleChange = (e) => {
        const { id } = e.target;
        setFormData((prevState) => {
            return prevState.map((item, index) => {
                if (index === parseInt(id)) {
                    if (item.checked) {
                        return {
                            ...item,
                            checked: item.checked,
                        }
                    } else {
                        setTodayCheckedIn(true);
                        return {
                            ...item,
                            checked: !item.checked,
                        }
                    }
                } else {
                    return item;
                }
            })
        })
    }

    return (
        <>
            <main className='bg-black min-h-[150vh]'>
                <div className='event-banner'>
                    <h1 className='event-head'>Check In</h1>
                </div>

                {
                    loading1 && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'>
                        </div>
                        <p>
                            Adding CheckIn ID...
                        </p>
                        <p>
                            Please do not close this window or press back button.
                        </p>
                    </div>
                }

                {
                    loading2 && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'>
                        </div>
                        <p>
                            Checking In...
                        </p>
                        <p>
                            Please do not close this window or press back button.
                        </p>
                    </div>
                }
                {!allowedUsers.includes(email) ? <div className='pt-32 min-h-screen text-center px-4 text-lg'>You don't have permission to view this page.</div> : <div className='m-auto'>
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
                            loading ? "loading..." : searchResults.name === undefined ? 'No results.' :
                                <div className='border lg:w-[30rem] md:w-[30rem] w-[90%] p-5 rounded-3xl bg-gray-900 bg-opacity-75'>
                                    <p>Name: {searchResults.name}</p>
                                    <p>PassID: {searchResults.passId}</p>
                                    <p>Email: {searchResults.email}</p>
                                    <p>Phone: {searchResults.phone}</p>
                                    <p>College: {searchResults.college}</p>
                                    {/* <p>ID: {searchResults.id}</p> */}
                                    <div className='border border-dashed p-3 pb-4 rounded-xl mt-3'>
                                        <div>
                                            {searchResults.checkInID ? <div>
                                                <p className='text-lg font-semibold'> CheckIn ID: {searchResults.checkInID}</p>
                                            </div> : <div>
                                                <label className='text-yellow-500 text-lg font-medium' htmlFor="CheckIn ID">CheckIn ID</label>
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    setCheckInIDHandler(searchResults.id);
                                                }} className='flex gap-3 items-center pt-1'>
                                                    <input value={checkInID} onChange={(e) => setCheckInID(e.target.value)} className='text-gray-700 px-2 py-1.5 border rounded-lg font-medium w-[12rem]' type="text" id="promo" placeholder="Enter CheckIn ID" />
                                                    <button type="submit" className='font-medium text-gray-900  bg-yellow-500 rounded-full px-5 py-1.5'>Add</button>
                                                </form>
                                            </div>}

                                            {searchResults.checkInID && <form onSubmit={(e) => {
                                                e.preventDefault();
                                                handleCheckIn(searchResults.id);
                                            }} className='mt-5'>
                                                <div className='flex gap-6'>
                                                    <div>
                                                        {formData.map((day, idx) => <div className='flex gap-6' key={idx}>
                                                            <label className='text-lg font-bold' htmlFor="CheckIn ID">Day {idx + 1} <span className='text-yellow-500 font-medium'>({day.date})</span></label>
                                                            <input onChange={handleChange} checked={day.checked} disabled={isTodaysDate(day.date)} type="checkbox" name="day1" id={`${idx}`} />
                                                        </div>)}
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        {
                                                            checkedinData.map((day, idx) => <div className='flex' key={idx}>
                                                                <p className={`font-semibold ${day.checked ? 'text-lime-500' : 'text-rose-500'}`}>{day.checked ? 'Checked In' : "Unchecked"}</p>
                                                            </div>)
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    todayCheckedIn && <button className='font-medium text-gray-900 w-[12rem]  bg-yellow-500 rounded-xl py-2 my-5' type="submit">Check In</button>
                                                }
                                            </form>}
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>}
            </main>
        </>
    )
}

export default VerifyPassAdmin