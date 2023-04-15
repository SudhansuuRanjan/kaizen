import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Select from 'react-select'
import Creatable from 'react-select/creatable';
import { genderOptions, collegeOptions, yearOptions, courseOptions } from '../utils/FormOptions'
import { useNavigate } from 'react-router-dom'


const CompleteProfile = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gender: "",
        phone: "",
        address: "",
        college: "",
        year: "",
        course: "",
        caCode: "",
        city: '',
    });
    const docRef = doc(db, "users", auth.currentUser.uid);

    const [updating, setUpdating] = useState(false);
    const { displayName, email } = auth.currentUser;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await updateDoc(docRef, formData);
            toast.success("Profile Updated Successfully");
            navigate('/events');
            setUpdating(false);
        } catch (error) {
            toast.error("Something went wrong!");
            setUpdating(false);
        }
    }

    const onChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    }

    // get profile from firestore
    const getProfile = async () => {
        const docSnap = await getDoc(docRef);
        const { gender, phone, address, college, year, course, city } = docSnap.data();
        if (gender && phone && address && college && year && course && city) {
            navigate('/events');
        }
        // setFormData({
        //     gender, phone, address, college, year, course, caCode: "", city
        // })
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover flex flex-col items-center justify-center gap-10 pt-10 lg:pt-4 md:pt-4">
            <img src="/images/kaizen.png" alt="logo" className='h-14' />
            <div className='bg-black h-fit  bg-opacity-20 backdrop-blur-md rounded-2xl  bg-center m-auto flex items-center flex-col py-5 px-5 md:px-7 lg:px-10 mt-[-1rem] mb-16'>
                <h1 className='text-2xl lg:text-3xl font-bold'>Complete Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className='m-auto mt-2 lg:h-[60vh] md:h-[60vh] h-[65vh] overflow-y-scroll pr-2  flex items-center flex-col text-black'>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="name" className='text-yellow-500 font-medium text-lg pb-1'>Name</label>
                            <input id="gender" type="gender" placeholder="Gender" className='py-1.5 text-black bg-white md:py-2 lg:py-2 rounded-lg px-3 lg:w-[25rem] md:w-[22rem] w-[80vw] border-2 border-yellow-400' disabled value={displayName} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="name" className='text-yellow-500 font-medium text-lg pb-1'>Email ID</label>
                            <input id="email" type="email" placeholder="Email ID" className='py-1.5 text-black bg-white md:py-2 lg:py-2 rounded-lg px-3 lg:w-[25rem] md:w-[22rem] w-[80vw] border-2 border-yellow-400' disabled value={email} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="name" className='text-yellow-500 font-medium text-lg pb-1'>CA Referral Code (If any)</label>
                            <input type="text" id="caCode" placeholder="AXD8DEDG43" className='py-1.5 text-black bg-white md:py-2 lg:py-2 rounded-lg px-3 lg:w-[25rem] md:w-[22rem] w-[80vw] border-2 border-yellow-400' onChange={handleChange} value={formData.caCode} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="name" className='text-yellow-500 font-medium text-lg pb-1'>Gender</label>
                            <Select required onChange={(e) => onChange("gender", e.value)} className='ml-0 pl-0 border-2 border-yellow-400 w-[100%] rounded-md' options={genderOptions} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="gender" className='text-yellow-500 font-medium text-lg pb-1'>College</label>
                            <Creatable required onChange={(e) => onChange("college", e.value)} className='ml-0 pl-0 border-2 border-yellow-400 w-[100%] rounded-md' options={collegeOptions} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="gender" className='text-yellow-500 font-medium text-lg pb-1'>Year</label>
                            <Creatable value={formData.caCode} required onChange={(e) => onChange("year", e.value)} className='ml-0 pl-0 border-2 border-yellow-400 w-[100%] rounded-md' options={yearOptions} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="year" className='text-yellow-500 font-medium text-lg pb-1'>Course</label>
                            <Creatable required onChange={(e) => onChange("course", e.value)} className='ml-0 pl-0 border-2 border-yellow-400 w-[100%] rounded-md' options={courseOptions} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="address" className='text-yellow-500 font-medium text-lg pb-1'>Address</label>
                            <input required id="address" type="text" placeholder="Phulwarisharif, Patna, Bihar" className='py-1.5 text-black bg-white md:py-2 lg:py-2 rounded-lg px-3 lg:w-[25rem] md:w-[22rem] w-[80vw] border-2 border-yellow-400' onChange={handleChange} value={formData.address} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="city" className='text-yellow-500 font-medium text-lg pb-1'>City</label>
                            <input required id="city" type="text" placeholder="Patna" className='py-1.5 text-black bg-white md:py-2 lg:py-2 rounded-lg px-3 lg:w-[25rem] md:w-[22rem] w-[80vw] border-2 border-yellow-400' onChange={handleChange} value={formData.city} />
                        </div>
                        <div className='lg:mt-4 flex flex-col items-start justify-start w-[100%]'>
                            <label htmlFor="city" className='text-yellow-500 font-medium text-lg pb-1'>Mobile No</label>
                            <input required placeholder='7869606060' id="phone" type="text" pattern="[6789][0-9]{9}" title="Please enter valid phone number"
                                className='py-1.5 text-black bg-white md:py-2 lg:py-2 rounded-lg px-3 lg:w-[25rem] md:w-[22rem] w-[80vw] border-2 border-yellow-400' onChange={handleChange} value={formData.phone} />
                        </div>
                    </div>
                    <button type='submit' className='bg-yellow-500 text-black font-medium text-lg py-2 px-4 rounded-lg mt-5 hover:bg-yellow-400 w-[100%]' disabled={updating}>{updating ? 'Updating' : 'Update'}</button>
                </form>
            </div>
        </div>
    )
}

export default CompleteProfile