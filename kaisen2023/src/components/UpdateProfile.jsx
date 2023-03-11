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
        // set overflow to auto
        document.body.style.overflow = "auto";
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
        <div className='fixed z-[1000] flex  items-center h-[100vh] w-[100vw] bg-gray-700 top-0 bg-opacity-50 backdrop-blur-lg flex-col gap-10 overflow-y-scroll pb-10'>
            <img src="/images/kaizen.png" alt="logo" className='h-16 mt-5 mb-0' />
            <div className='bg-[#221900] border-img  bg-opacity-50 backdrop-blur-sm rounded-xl w-[90%] md:w-fit lg:w-fit bg-center m-auto h-fit flex items-center justify-center flex-col py-8 px-10 mt-0'>
                <h1 className='text-2xl font-bold'>Update Profile</h1>
                <form className='m-auto mt-2 gap-3  flex items-center justify-center flex-col w-[100%]' onSubmit={updateProfile}>
                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="gender" className='text-sm pb-0.5'>Gender</label>
                        <input required id="gender" type="text" placeholder="Male" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.gender} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="phone" className='text-sm pb-0.5'>Mobile No.</label>
                        <input required id="phone" type="text" placeholder="+91..." className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="address" className='text-sm pb-0.5'>Address</label>
                        <input required id="address" type="text" placeholder="Patna, Bihar" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.address} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="college" className='text-sm pb-0.5'>College</label>
                        <input required id="college" type="text" placeholder="College Name" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.college} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="year" className='text-sm pb-0.5'>Year</label>
                        <input required id="year" type="text" placeholder="Second" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.year} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="course" className='text-sm pb-0.5'>Course</label>
                        <input required id="course" type="text" placeholder="Course" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.course} onChange={handleChange} />
                    </div>

                    {!updating ? (<button className='bg-yellow-600 py-1.5 px-10 rounded-lg w-[100%] md:w-[20rem] lg:w-[20rem] mt-3 flex items-center justify-center' type='submit'>
                        <span>Update profile</span>
                    </button>)
                        :
                        (<button disabled={true} className='bg-yellow-600 py-1.5 px-10 rounded-lg w-[100%] md:w-[20rem] lg:w-[20rem] mt-3 flex items-center justify-center' type='submit'>
                            <span>Updating Profile</span>
                        </button>)}
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile