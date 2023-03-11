import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'


const UpdateProfile = ({ setUpdateProfileModal }) => {
    const auth = getAuth();
    const [formData, setFormData] = useState({
        gender: "",
        phone: "",
        address: "",
        college: "",
        year: "",
        course: "",
    });
    const [updating, setUpdating] = useState(false);

    const { displayName, email } = auth.currentUser;

    const updateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            formData.name = displayName;
            formData.email = email;
            // console.log(formData);
            await updateDoc(userRef, formData);
            setUpdateProfileModal(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            setUpdateProfileModal(false);
            toast.error("Could not update profile details!");
        }
        setFormData({
            gender: "",
            phone: "",
            address: "",
            college: "",
            year: "",
            course: "",
        })
        setUpdating(false);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    return (
        <div className='fixed z-[1000] flex justify-center items-center h-[100vh] w-[100vw] bg-gray-700 top-0 bg-opacity-30 backdrop-blur-sm'>
            <div className='bg-[#705200] border-img  bg-opacity-40 backdrop-blur-sm rounded-xl w-fit bg-center m-auto h-fit flex items-center justify-center flex-col py-8 px-10'>
                <h1 className='text-2xl font-bold'>Update Profile</h1>
                <form className='m-auto mt-2 gap-3  flex items-center justify-center flex-col' onSubmit={updateProfile}>
                    <div className='flex flex-col'>
                        <label htmlFor="gender" className='text-sm pb-0.5'>Gender</label>
                        <select required id="gender" className='py-1.5 rounded-lg px-3 w-[20rem] border-2 border-yellow-400 bg-yellow-400 bg-opacity-20' value={formData.gender} onChange={handleChange}>
                            <option className='bg-yellow-700' value="Male">Male</option>
                            <option className='bg-yellow-700' value="Female">Female</option>
                            <option className='bg-yellow-700' value="Other">Other</option>
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="phone" className='text-sm pb-0.5'>Mobile No.</label>
                        <input required id="phone" type="text" placeholder="+91..." className='py-1.5 rounded-lg px-3 w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="address" className='text-sm pb-0.5'>Address</label>
                        <input required id="address" type="text" placeholder="Patna, Bihar" className='py-1.5 rounded-lg px-3 w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.address} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="college" className='text-sm pb-0.5'>College</label>
                        <input required id="college" type="text" placeholder="College Name" className='py-1.5 rounded-lg px-3 w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.college} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="year" className='text-sm pb-0.5'>Year</label>
                        <input required id="year" max={5} min={1} type="number" placeholder="Year" className='py-1.5 rounded-lg px-3 w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.year} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="course" className='text-sm pb-0.5'>Course</label>
                        <input required id="course" type="text" placeholder="Course" className='py-1.5 rounded-lg px-3 w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.course} onChange={handleChange} />
                    </div>

                    {!updating ? (<button className='bg-yellow-600 py-1.5 px-10 rounded-lg w-[20rem] m-3 flex items-center justify-center' type='submit'>
                        <span>Update profile</span>
                    </button>)
                        :
                        (<button disabled className='bg-yellow-600 py-1.5 px-10 rounded-lg w-[20rem] m-3 flex items-center justify-center' type='submit'>
                            <span>Updating Profile</span>
                        </button>)}



                </form>
            </div>
        </div>
    )
}

export default UpdateProfile