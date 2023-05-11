import React, { useState } from 'react'
import { db } from '../../firebase.config'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import shortid from 'shortid'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getAuth } from 'firebase/auth'


const generatePassID = () => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var string_length = 10;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}


const CreatePass = () => {

    const auth = getAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        id: "",
        passId: "",
    })

    const [loading, setLoading] = useState(false);
    const { name, email } = auth.currentUser;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const passId = generatePassID();
        const id = shortid.generate();
        const pass = {
            ...formData,
            id,
            passId,
            createdAt: serverTimestamp(),
        }

        try {
            const docRef = doc(db, 'passes', pass.id);
            await setDoc(docRef, pass);
            const res2 = await axios.post('https://kaizen-api.vercel.app/api/sendPassMail', pass);
            toast.success('Pass created successfully');
            setFormData({
                name: "",
                email: "",
                phone: "",
                college: "",
                id: "",
                passId: "",
            });
        } catch (error) {
            console.log(error.message);
            toast.error('Something went wrong');
        }
        setLoading(false);
    }



    return (
        <>
            {email !== "sudhanshuranjan2k18@gmail.com" ? <div className='pt-48 min-h-screen text-center px-4 text-lg'>You don't have permission to view this page.</div> : <div className='pt-32 min-h-screen'>
                <h1 className='text-4xl font-bold text-center mb-10'>Create Pass</h1>
                <div className='lg:w-[37rem] md:w-[32rem] w-[90%] m-auto'>
                    <form onSubmit={handleSubmit} className='flex gap-2 flex-col w-full p-6 pt-0'>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium' htmlFor="text">Name</label>
                            <input required className='text-gray-700 px-4 py-2.5 border rounded-lg font-medium' value={formData.name} type="text" id="name" placeholder="Captain Jack Sparrow" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium' htmlFor="email">Email</label>
                            <input required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" className='text-gray-700 px-4 py-2.5 border rounded-lg font-medium' value={formData.email} type="email" id="email" placeholder="capjacksparrow@gmail.com" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium' htmlFor="college">College</label>
                            <input required className='text-gray-700 px-4 py-2.5 border rounded-lg font-medium' value={formData.college} type="college" id="college" placeholder="AIIMS, Patna" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium' htmlFor="mobile">Mobile No.</label>
                            <input required className='text-gray-700 px-4 py-2.5 border rounded-lg font-medium' value={formData.phone} type="text" id="phone" placeholder="9132456778" onChange={handleChange} pattern="[6789][0-9]{9}" title="Please enter valid phone number" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <button disabled={loading} className='bg-yellow-500 text-gray-900 py-2.5 my-3 rounded-lg font-semibold' type="submit">
                                {loading ? 'Creating Pass...' : 'Create Pass'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </>
    )
}

export default CreatePass