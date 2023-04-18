import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import shortid from 'shortid';
import axios from 'axios';


const RegisterPopup = ({ event, setPopup }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const [team, setTeam] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name === "" || formData.email === "") return;
        formData.id = String(team.length);
        setTeam([...team, formData]);
        setFormData({ name: '', email: '' });
    }

    const deleteMember = (id) => {
        const newMembers = team.filter((member) => member.id !== id);
        setTeam(newMembers);
    }

    // check if event is already in cart
    const checkCart = async () => {
        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            const docSnap = await getDoc(userRef);
            const user = docSnap.data();
            setUser({
                ...user,
                id: docSnap.id,
            });
            const cart = user.cart;
            const eventInCart = cart.find((item) => item.name === event.name);
            const eventAlreadyPurchased = cart.find((item) => item.purchased === true && item.eventId === event.id);
            // console.log(eventAlreadyPurchased,event.id);
            if (eventAlreadyPurchased) {
                toast.warn("You're already registered for the event.");
                setPopup(false);
                return;
            } else if (eventInCart) {
                toast.warn("Event already in cart, for updating members or deleting event, go to cart.");
                setPopup(false);
                return;
            } else {
                await addEventToCart();
            }
        } catch (error) {
            toast.error("Could not add event to cart");
        }
    }

    const addEventToCart = async () => {
        if (event.minMem > team.length + 1) return toast.error(`Minimum number of members required is ${event.minMem}`);
        const newEvent = {
            name: event.name,
            participants: event.participants,
            price: event.price,
            image: event.image,
            members: [...team],
            details: event.rulebook,
            id: shortid.generate(),
            eventId: event.id,
            purchased: Number(event.price) === 0 ? true : false,
            minMem: event.minMem,
        }

        if (Number(event.price) === 0) {
            // add it to the user's registered events
            const regRef = collection(db, "registrations");
            const data = {
                ...newEvent,
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                name: auth.currentUser.displayName,
                purchasedAt: new Date(),
            }
            await addDoc(regRef, data);
            const mailData = {
                email: auth.currentUser.email,
                name: auth.currentUser.displayName,
                event: [event.name],
                kaizenId: user.id,
            }
            const res = await axios.post('https://kaizen-api.vercel.app/api/sendRegConf', mailData);
        }

        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            const docSnap = await getDoc(userRef);
            const user = docSnap.data();
            const cart = user.cart;
            const newCart = [...cart, newEvent];
            await updateDoc(userRef, {
                cart: newCart
            });
            document.body.style.overflow = 'auto';
            if (Number(event.price) === 0 ? true : false) {
                toast.success("Registration Successful!");
                navigate('/profile')
            } else {
                toast.success("Event added to cart");
                navigate('/cart');
            }
        } catch (error) {
            toast.error("Could not add event to cart");
        }
    }

    return (
        <div className='fixed bg-black bg-opacity-80 backdrop-blur-lg h-[100%] w-[100%] z-[999] flex top-0 overflow-y-scroll'>
            <div className='bg-gray-800 bg-opacity-30 backdrop-blur-lg rounded-2xl p-5 lg:p-10 md:p-8 pt-3 w-[90%] md:w-[35rem] lg:w-[40rem] border border-zinc-700 my-20 h-fit m-auto'>
                <h1 className='text-3xl font-bold text-center mt-5 lg:mt-0 md:mt-0'>Register for {event.name}</h1>
                <div className='flex flex-col gap-2 mt-6'>
                    <div className='text-sm text-red-500 mb-2'>
                        {event.participants > 1 && event.participants - 1 > team.length && <li>This is a team event, add your team members and then proceed to register, you can update your team list in Event Cart.</li>}
                        <li>On registration the events are added to your cart, then you need to go to cart and pay for the events you want to register.</li>
                    </div>

                    {
                        event.participants > 1 && event.participants - 1 > team.length && (
                            <div className='w-[100%] mb-3'>
                                <form onSubmit={handleSubmit} className='flex gap-2 items-center w-[100%] flex-wrap'>
                                    <input value={formData.name} type="text" name="name" id="name" className='border-2 border-gray-300 rounded-md px-2 py-1 flex-1 text-gray-600 order-1' placeholder='Name' onChange={handleChange} />
                                    <input value={formData.email} type="email" name="email" id="email" className='border-2 border-gray-300 text-gray-600 rounded-md px-2 py-1 flex-1 order-3 lg:order-2 md:order-2' placeholder='Email' onChange={handleChange} />
                                    <button type='submit' className='flex-1 bg-green-700 px-4 border-green-500 border-2 text-gray-800 font-medium  rounded-lg py-1 order-3 lg:order-3 md:order-3'>Add</button>
                                </form>
                            </div>
                        )
                    }

                    {
                        team.map((member, id) => (
                            <div key={id} className='flex gap-2 items-center bg-black p-1 rounded-lg flex-wrap bg-opacity-20'>
                                <input required value={member.name} type="text" name="name" id="name" className='border-2 border-gray-600 bg-gray-900 rounded-md px-2 py-0.5 flex-1 white' placeholder='Name' disabled />
                                <input required value={member.email} type="email" name="email" id="email" className='border-2 border-gray-600 bg-gray-900 text-white rounded-md px-2 py-0.5 flex-1' placeholder='Email' disabled />
                                <button className='flex-0 bg-red-700 px-4 border-red-500 border-2 text-red-200 rounded-lg py-0.5' onClick={() => deleteMember(member.id)}>Del</button>
                            </div>
                        ))
                    }

                    <div className='flex relative mt-2 items-center justify-center gap-10 '>
                        <button onClick={checkCart} className='relative flex items-center justify-center'>
                            <p className='text-green-500 border-green-500 hover:border-zinc-800 hover:text-zinc-800 hover:bg-green-500 border px-6 py-1.5 rounded-xl font-semibold text-xl font-mono'>Register</p>
                        </button>

                        <button onClick={() => setPopup(false)} className='relative flex items-center justify-center'>
                            <p className='text-blue-500 border-blue-500 hover:border-zinc-800 hover:text-zinc-800 hover:bg-blue-500 border px-6 py-1.5 rounded-xl font-semibold text-xl font-mono'>Cancel</p>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterPopup;