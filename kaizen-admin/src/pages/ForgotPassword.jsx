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
    <div className='pt-16 flex'>
      <div className='m-auto w-[20rem] flex items-center justify-center flex-col'>
        <h1 className='text-4xl font-bold mt-5'>Forgot Password</h1>
        <form className='m-auto  flex items-center justify-center flex-col' onSubmit={handleSubmit}>
          <div className='m-2 mt-16'>
            <input id="email" type="email" placeholder="Email" className='py-3 rounded-lg px-3 w-[20rem]' value={formData.email} onChange={onChange} />
          </div>

          <button className='bg-pink-600 py-3 px-10 rounded-lg w-[20rem] m-3 flex items-center justify-center' type='submit'>
            {loading ? <Loader color="pink-100" size="5" /> : null}
            <span>{loading ? 'Sending Link' : "Send Password Reset Link"}</span>
          </button>


        </form>
        <p className='my-5 text-gray-500 text-lg'>or</p>
        <Link to="/signin">
          <button className='bg-gray-800 py-2 px-4  rounded-md bitems-center justify-between w-[13rem] shadow'>
            <p>SignIn</p>
          </button>
        </Link>
        <p className='mt-16'>Don't have an account? <Link to="/signup" className='text-pink-500'>SignUp</Link></p>
      </div>

    </div>
  )
}

export default ForgotPassword