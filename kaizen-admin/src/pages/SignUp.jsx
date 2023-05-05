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
      formDataCopy.cart = [];
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success('Signed Up Successfully!')
      navigate('/events');
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
    <div className='pt-16 flex'>
      <div className='m-auto w-[20rem] flex items-center justify-center flex-col'>
        <h1 className='text-4xl font-bold mt-5'>SignUp</h1>
        <form className='m-auto  flex items-center justify-center flex-col' onSubmit={handleSubmit}>
          <div className='m-2 mt-16'>
            <input id="name" type="name" placeholder="Name" className='py-3 rounded-lg px-3 w-[20rem]' value={formData.name} onChange={onChange} />
          </div>
          <div className='m-2'>
            <input id="email" type="email" placeholder="Email" className='py-3 rounded-lg px-3 w-[20rem]' value={formData.email} onChange={onChange} />
          </div>
          <div className='m-2 flex items-center relative'>
            <input id="password" type={showPassword ? "text" : "password"} placeholder="Password" className='py-3 rounded-lg px-3 w-[20rem]' value={formData.password} onChange={onChange} />
            <button onClick={(e) => {
              e.preventDefault();
              setShowPassword((prevState) => !prevState);
            }} className='absolute right-3 text-xl'>
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />
              }
            </button>
          </div>

          <button className='bg-pink-600 py-3 px-10 rounded-lg w-[20rem] m-3 flex items-center justify-center' type='submit'>
            {loading ? <Loader color="pink-100" size="5" /> : null}
            <span>{loading ? 'Creating Account' : "Sign Up"}</span>
          </button>


        </form>
        <p className='my-5 text-gray-500 text-lg'>or</p>
        <OAuth/>
        <p className='mt-16'>Already have an account? <Link to="/signin" className='text-pink-500'>SignIn</Link></p>
      </div>

    </div>
  )
}

export default SignUp