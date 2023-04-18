import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../firebase.config'
import { toast } from 'react-toastify'


const UpdateProfile = ({ setChangeDetails, user, editProfile }) => {
    const [formData, setFormData] = useState({
        gender: user.gender,
        phone: user.phone,
        address: user.address,
        college: user.college,
        year: user.year,
        course: user.course,
        caCode: user.caCode ? user.caCode : "",
    });

    const [updating, setUpdating] = useState(false);

    const updateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const caCode = formData.caCode;
            const caRef = collection(db, "cacodes");
            const caSnap = await getDocs(caRef);
            const caDocs = caSnap.docs.map(doc => doc.data());
            console.log(caDocs);
            if (caDocs.some(doc => doc.code === caCode)) {
                toast.success("Code Validated");
            }else if(caCode === ""){
                setFormData({ ...formData, caCode: "" });
            } else {
                toast.error("Invalid Code!");
                setFormData({ ...formData, caCode: "" });
                return;
            }
            await editProfile(formData);
        } catch (error) {
            toast.error("Something went wrong!");
        }
        setUpdating(false);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    return (
        <div className='fixed z-[1000] flex  items-center h-[100vh] w-[100vw] bg-gray-700 top-0 bg-opacity-20 backdrop-blur-md flex-col gap-10 overflow-y-scroll pb-10'>
            <button onClick={() => setChangeDetails(false)} className='absolute top-5 right-5'><ImCross size={30} /></button>
            <img src="/images/kaizen.png" alt="logo" className='h-16 mt-5 mb-0' />
            <div className='bg-black  bg-opacity-50 backdrop-blur-md rounded-2xl w-[90%] md:w-fit lg:w-fit bg-center m-auto h-fit flex items-center justify-center flex-col py-8 px-10 mt-0'>

                <h1 className='text-2xl font-bold'>Edit Profile</h1>
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
                        <input required id="year" type="text" placeholder="First" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.year} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="course" className='text-sm pb-0.5'>Course</label>
                        <input required id="course" type="text" placeholder="Course" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.course} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col w-[100%]'>
                        <label htmlFor="caCode" className='text-sm pb-0.5'>CA Code</label>
                        <input id="caCode" type="text" placeholder="CA Code" className='py-1.5 rounded-lg px-3 w-[100%] md:w-[20rem] lg:w-[20rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.caCode} onChange={handleChange} />
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