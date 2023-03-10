import React, { useState } from 'react'
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const CartItem = ({ data, cartItems, deleteEvent }) => {
    const [members, setMembers] = useState(data.members);
    const [edit, setEdit] = useState(false);
    const [formdata, setFormdata] = useState({
        name: "",
        email: ""
    })
    const auth = getAuth();


    const handleChange = (e) => {
        setFormdata((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const addMember = (e) => {
        e.preventDefault();
        if (formdata.name === "" || formdata.email === "") return;
        formdata.id = String(members.length);
        setMembers([...members, formdata]);
        setFormdata({ name: '', email: '' });
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
            toast.success("Event members updated!");
        } catch (error) {
            toast.error(error.message);
            setMembers(data.members);
        }
        setEdit(false);
    }



    return (
        <div className='w-[100%] m-auto'>
            <div className="flex flex-col justify-center w-[90%] bg-[#E9CC7E] bg-opacity-10 backdrop-blur-sm border border-yellow-300 rounded-2xl m-auto">
                <div className='p-3 flex md:justify-evenly lg:justify-between items-center w-[100%] flex-wrap md:flex-nowrap lg:flex-nowrap'>
                    <div className='w-16 h-10 overflow-hidden rounded'>
                        <img src={data.image} alt="" className='w-16 h-auto' />
                    </div>
                    <div className='w-[20rem] flex-1 ml-2'>
                        <p className='font-semibold md:text-2xl lg:text-2xl text-xl text-yellow-400'>{data.name}</p>
                    </div>
                    <div className='flex-0 pr-3 md:px-10 lg:px-10'>
                        <p className='text-center font-semibold  text-red-500'>{data.participants} members</p>
                    </div>
                    <div className='w-[4rem] flex-0 mt-3 md:mt-0 lg:mt-0'>
                        <p className='text-center font-semibold  text-yellow-500 text-xl'>??? {data.price}</p>
                    </div>
                    {
                        data.participants > 1 && !edit ? (
                            <button onClick={() => setEdit(true)} className='text-blue-400 py-1.5 px-4 bg-blue-900 bg-opacity-30 rounded-xl border border-blue-400 ml-2 mt-3 md:mt-0 lg:mt-0'>
                                Edit
                            </button>
                        ) : (
                            <button onClick={handleEdit} className='text-green-400 py-1.5 px-4 bg-green-900 bg-opacity-30 rounded-xl border border-green-400 ml-2 mt-3 md:mt-0 lg:mt-0'>
                                Save
                            </button>
                        )
                    }
                    <button onClick={() => deleteEvent(data.id)} className='text-red-600 py-1.5 px-4 bg-red-900 bg-opacity-30 rounded-xl border border-red-600 ml-2 mt-3 md:mt-0 lg:mt-0'>
                        Delete
                    </button>
                </div>

                <div className={data.participants != 1 && 'py-2'}>
                    {
                        edit && data.participants > 1 && members.length < data.participants - 1 &&
                        <form onSubmit={addMember}>
                            <div className='text-sm flex items-center px-3 md:max-w-lg lg:max-w-lg flex-wrap justify-start gap-2'>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    value={formdata.name}
                                    className={
                                        'py-2 px-3 w-[10rem]  focus:outline-none focus:border-pink-500 rounded-lg bg-yellow-500 bg-opacity-20 flex-1'
                                    }
                                    onChange={handleChange}
                                    placeholder="Name"
                                />
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    value={formdata.email}
                                    className={
                                        'py-2 px-3  focus:outline-none focus:border-pink-500 rounded-lg w-[12rem]  bg-yellow-500 bg-opacity-20 flex-1'
                                    }
                                    onChange={handleChange}
                                    placeholder="Email Id"
                                />
                                <button className='text-green-400 py-1.5 px-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-400 flex-1' type="submit">Add Member</button>
                            </div>
                        </form>

                    }

                    {
                        data.participants > 1 &&
                        <div className='text-sm p-3 px-4 text-yellow-500'>Team Members</div>
                    }

                    {
                        members.slice(0).reverse().map((member, id) => (
                            <div key={id} className='text-sm flex items-center mx-3 max-w-lg flex-wrap gap-2 bg-yellow-600 p-1 bg-opacity-10 rounded-lg my-1'>
                                <input
                                    type="text"
                                    id="name"
                                    value={member.name}
                                    disabled={true}
                                    className={
                                        'py-2 px-3 w-[10rem]  focus:outline-none focus:border-pink-500 rounded-lg bg-yellow-500 bg-opacity-20 flex-1'
                                    }
                                />
                                <input
                                    type="text"
                                    id="email"
                                    value={member.email}
                                    disabled={true}
                                    className={
                                        'py-2 px-3  focus:outline-none focus:border-pink-500 rounded-lg w-[12rem] bg-yellow-500 bg-opacity-20 flex-1'
                                    }
                                />
                                {
                                    edit &&
                                    <button
                                        className='text-red-500 py-1.5 px-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-500 lg:flex-0 md:flex-0 flex-1'
                                        onClick={() => deleteMember(member.id)}
                                    >
                                        Del Member
                                    </button>
                                }
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default CartItem