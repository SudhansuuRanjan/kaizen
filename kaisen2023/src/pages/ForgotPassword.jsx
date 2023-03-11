import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const { email } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Password Reset Email Sent!');
      navigate('/signin');
    } catch (error) {
      toast.error("Couldn't send password reset email")
    }

    setLoading(false);

    setFormdata({
      email: "",
    })
  }


  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover flex flex-col items-center justify-center gap-16 pt-12">
       <img src="/images/kaizen.png" alt="logo" className='h-16' />
      <div className='bg-[#E9CC7E] border-img bg-opacity-10 backdrop-blur-sm rounded-xl w-fit bg-center m-auto h-fit flex items-center justify-center flex-col py-10 px-5 md:px-7 lg:px-10 mt-0'>
        <h1 className='text-3xl lg:text-4xl font-bold'>Forgot Password</h1>
        <form className='m-auto  flex items-center justify-center flex-col' onSubmit={handleSubmit}>
          <div className='m-2 mt-10'>
            <input id="email" type="email" placeholder="Email" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.email} onChange={onChange} />
          </div>

          <button className='bg-yellow-600 py-2.5 md:py-3 lg:py-3 px-2 rounded-lg lg:w-[20rem] w-[17rem] m-3 flex items-center justify-center' type='submit'>
            {loading ? <Loader color="pink-100" size="5" /> : null}
            <span>{loading ? 'Sending Link' : "Send Password Reset Link"}</span>
          </button>


        </form>
        <p className='my-5 text-gray-500 text-lg'>or</p>
        <Link to="/signin">
          <button className='bg-pink-700 py-2 px-4  rounded-md bitems-center justify-between w-[13rem] shadow'>
            <p>SignIn</p>
          </button>
        </Link>
        <p className='mt-16'>Don't have an account? <Link to="/signup" className='text-yellow-500'>SignUp</Link></p>
      </div>

    </div>
  )
}

export default ForgotPassword