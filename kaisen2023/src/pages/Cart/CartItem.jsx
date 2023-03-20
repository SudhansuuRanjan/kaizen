import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { FaSave } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const CartItem = ({ data, cartItems, deleteEvent }) => {

    const [members, setMembers] = useState(data.members);
    const [edit, setEdit] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', email: '' });

    const auth = getAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMembers([...members, newMember]);
        setNewMember({ name: '', email: '' });
    }

    const handleChange = (e) => {
        setNewMember({ ...newMember, [e.target.name]: e.target.value });
    }

    const addMember = (e) => {
        e.preventDefault();
        if (newMember.name === "" || newMember.email === "") return;
        newMember.id = String(members.length);
        setMembers([...members, newMember]);
        setNewMember({ name: '', email: '' });
    }

    const deleteMember = (id) => {
        const newMembers = members.filter((member) => member.id !== id);
        setMembers(newMembers);
    }

    // update event in cart in firestore
    const handleEdit = async () => {
        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            const cart = cartItems;
            let eventInCart = cart.find((item) => item.name === data.name);
            eventInCart = { ...eventInCart, members: [...members] }
            const newCart = [...cart.filter((item) => item.name !== data.name), {
                ...eventInCart,
                members: [...members]
            }];
            await updateDoc(userRef, {
                cart: newCart
            });
            toast.success(`Event members updated of event ${data.name}!`);
        } catch (error) {
            toast.error(error.message);
            setMembers(data.members);
        }
        setEdit(false);
    }


    return (
        <div className='cart-item-container shadow-xl'>
            <div className="card-up">
                <div className='flex items-center'>
                    <Link to={`/events/${data.eventId}`} className='event-icon-container'>
                        <img src={data.image} alt="event" />
                    </Link>
                    <div className='event-cart-event-name-cont'>
                        <Link to={`/events/${data.eventId}`} className='event-name'>{data.name}</Link>
                    </div>
                </div>
                <div className='flex items-center justify-between w-[100%] lg:w-[auto] md:w-[auto]'>
                    <div className='flex gap-10'>
                        <h3 className='event-members'>{data.participants} members</h3>
                        <h1 className='event-price text-yellow-400 font-medium text-lg'>₹ {data.price}</h1>
                    </div>
                    <div className='pl-5'>

                        {edit ? <button onClick={handleEdit} className='edit-btn text-green-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><FaSave size={25} /></button> : <button onClick={() => setEdit((e) => !e)} className='edit-btn text-blue-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><FaEdit size={25} /></button>
                        }

                        <button onClick={() => deleteEvent(data.id)} className='delete-btn text-red-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><AiFillDelete size={25} /></button>
                    </div>
                </div>
            </div>
            <div className="card-down w-[100%]">
                {/* Add Members Form */}
                {
                    edit && data.participants > 1 && members.length < data.participants - 1 &&
                    <div className='add-members-form w-[100%]'>
                        <div className='flex flex-col gap-2 w-[100%]'>
                            <h1 className='font-medium text-gray-500'>Add Members</h1>
                            <form className='text-sm flex items-center md:max-w-lg lg:max-w-lg flex-wrap justify-start gap-2 py-2' onSubmit={handleSubmit}>
                                <input type="text" required name="name" id="name" placeholder='Name' className='bg-gray-800 text-white p-2 rounded-md flex-1' value={newMember.name} onChange={handleChange} />
                                <input type="email" required name="email" id="email" placeholder='Email' className='bg-gray-800 text-white p-2 rounded-md flex-1' value={newMember.email} onChange={handleChange} />
                                <button type="submit" className='flex-1 md:flex-0 lg:flex-0 py-1.5 border font-medium border-green-500 text-green-500 rounded-lg px-5 hover:bg-green-500 hover:text-black hover:border-[#111317]'>Add</button>
                            </form>
                        </div>
                    </div>
                }

                <div className='add-members-form'>
                    <div className='flex flex-col gap-2'>
                        {data.participants > 1 && <h1 className='font-medium text-gray-500'>Your Team Members</h1>}

                        {
                            data.participants > 1 && members.length === 0 && <div className='text-red-500 font-light text-sm'> You haven't added any members yet.</div>
                        }


                        {
                            members.slice(0).reverse().map((member, id) => (
                                <div key={id} className='text-sm flex items-center md:max-w-lg lg:max-w-lg flex-wrap justify-start gap-2 py-2 bg-gray-900 p-1 rounded-xl'>
                                    <input type="text" name="name" id="name" placeholder='Name' className='bg-gray-800 flex-1 text-white p-2 rounded-md' value={member.name} disabled={true} />
                                    <input type="email" name="email" id="email" placeholder='Email' className='bg-gray-800 flex-1 text-white p-2 rounded-md' value={member.email} disabled={true} />
                                    {
                                        edit && <button onClick={() => deleteMember(member.id)} className='text-red-500 py-1.5 border-red-500 border px-2 rounded-lg'>
                                            Delete
                                        </button>
                                    }
                                </div>))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem