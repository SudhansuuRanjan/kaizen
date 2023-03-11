import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import OAuth from '../components/OAuth';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.gender = "";
      formDataCopy.phone = "";
      formDataCopy.address = "";
      formDataCopy.college = "";
      formDataCopy.year = "";
      formDataCopy.course = "";
      formDataCopy.cart = [];
      formDataCopy.purchasedEvents = [];
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success('Signed Up Successfully!')
      navigate('/profile');
    } catch (error) {
      toast.error('Bad User Credentials')
    }
    setLoading(false);
    setFormdata({
      name: "",
      email: "",
      password: ""
    });
  }

  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }


  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover flex flex-col items-center justify-center gap-10 pt-12 lg:pt-8 md:pt-8">
      <img src="/images/kaizen.png" alt="logo" className='h-16' />
      <div className='bg-[#E9CC7E] border-img bg-opacity-10 backdrop-blur-sm rounded-xl w-fit bg-center m-auto h-fit flex items-center justify-center flex-col py-10 px-5 md:px-7 lg:px-10 mt-0'>
        <h1 className='text-3xl lg:text-4xl font-bold'>SignUp</h1>
        <form className='m-auto  flex items-center justify-center flex-col' onSubmit={handleSubmit}>
          <div className='m-2 mt-10 md:mt-5 lg:mt-5'>
            <input id="name" type="name" placeholder="Name" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.name} onChange={onChange} />
          </div>
          <div className='m-2'>
            <input id="email" type="email" placeholder="Email" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.email} onChange={onChange} />
          </div>
          <div className='m-2 flex items-center relative'>
            <input id="password" type={showPassword ? "text" : "password"} placeholder="Password" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.password} onChange={onChange} />
            <button onClick={(e) => {
              e.preventDefault();
              setShowPassword((prevState) => !prevState);
            }} className='absolute right-3 text-xl'>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />
              }
            </button>
          </div>

          <button className='bg-yellow-600 py-2.5 md:py-3 lg:py-3 px-10 rounded-lg lg:w-[20rem] w-[17rem] m-3 flex items-center justify-center' type='submit'>
            {loading ? <Loader color="pink-100" size="5" /> : null}
            <span>{loading ? 'Creating Account' : "Sign Up"}</span>
          </button>


        </form>
        <p className='my-5 md:my-3 lg:my-2 text-yellow-700 text-lg'>or</p>
        <OAuth />
        <p className='mt-16 md:mt-5 lg:mt-5'>Already have an account? <Link to="/signin" className='text-yellow-500'>SignIn</Link></p>
      </div>

    </div>
  )
}

export default SignUp