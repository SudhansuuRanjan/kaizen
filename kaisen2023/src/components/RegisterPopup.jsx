import React, { useState } from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';


const RegisterPopup = ({ event, setPopup }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const [team, setTeam] = useState([]);
    const navigate = useNavigate();
    const auth = getAuth();

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
            const cart = user.cart;
            const eventInCart = cart.find((item) => item.name === event.name);
            if (eventInCart) {
                toast.error("Event already in cart, for updating members or deleting event, go to cart.");
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
        const newEvent = {
            name: event.name,
            participants: event.participants,
            price: event.price,
            image: event.image,
            members: [...team],
            details: event.rulebook,
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
            toast.success("Event added to cart");
            document.body.style.overflow = 'auto';
            navigate('/cart');
        } catch (error) {
            toast.error("Could not add event to cart");
        }
    }

    return (
        <div className='fixed bg-slate-600 bg-opacity-30 backdrop-blur-lg h-[100vh] w-[100vw] z-[999] flex items-center justify-center top-0 left-0 right-0'>
            <div className='bg-pink-900 bg-opacity-30 backdrop-blur-lg rounded-xl p-8 pt-3 w-[40rem] border-img'>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="#000" />
                </button>
                <h1 className='text-3xl font-bold text-center'>Register for {event.name}</h1>
                <div className='flex flex-col gap-4 mt-6'>
                    <div className='text-sm text-red-500'>
                        <li>This is a team event, add your team members and then proceed to register, you can update your team list in Event Cart.</li>
                        <li>On registration the events are added to your cart, then you need to go to cart and pay for the events you want to register.</li>
                    </div>

                    {
                        event.participants > 1 && event.participants - 1 > team.length && (
                            <div >
                                <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
                                    <input value={formData.name} type="text" name="name" id="name" className='border-2 border-gray-300 rounded-md px-2 py-1 flex-1 text-gray-600' placeholder='Name' onChange={handleChange} />
                                    <input value={formData.email} type="email" name="email" id="email" className='border-2 border-gray-300 text-gray-600 rounded-md px-2 py-1 flex-1' placeholder='Email' onChange={handleChange} />
                                    <button type='submit' className='flex-0 bg-green-700 px-4 border-green-500 border-2 text-green-400 rounded-lg py-1'>Add</button>
                                </form>
                            </div>
                        )
                    }

                    {
                        team.map((member, id) => (
                            <div key={id} className='flex gap-2 items-center'>
                                <input required value={member.name} type="text" name="name" id="name" className='border-2 border-gray-400 rounded-md px-2 py-1 flex-1 text-gray-800' placeholder='Name' disabled />
                                <input required value={member.email} type="email" name="email" id="email" className='border-2 border-gray-400 text-gray-800 rounded-md px-2 py-1 flex-1' placeholder='Email' disabled />
                                <button className='flex-0 bg-red-700 px-4 border-red-500 border-2 text-red-400 rounded-lg py-1' onClick={() => deleteMember(member.id)}>Del</button>
                            </div>
                        ))
                    }

                    <div className='flex relative mt-3 items-center justify-center'>
                        <button onClick={checkCart} className='relative flex items-center justify-center'>
                            <img src="images/btn.png" alt="btn" className='h-[6rem] w-[15rem]' />
                            <p className='absolute text-yellow-300 font-semibold text-xl font-mono'>Register</p>
                        </button>

                        <button onClick={() => setPopup(false)} className='relative flex items-center justify-center'>
                            <img src="images/btn1.png" alt="btn" className='h-[6rem] w-[15rem]' />
                            <p className='absolute text-blue-900 font-semibold text-xl font-mono'>Cancel</p>
                        </button>

                    </div>


                </div>
            </div>

        </div>
    )
}

export default RegisterPopup