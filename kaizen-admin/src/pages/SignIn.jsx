import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        toast.success('Logged In Successfully!')
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Bad User Credentials')
    }
    setLoading(false);

    setFormdata({
      email: "",
      password: ""
    })
  }


  return (
    <div className='pt-16 flex'>
      <div className='m-auto w-[20rem] flex items-center justify-center flex-col'>
        <h1 className='text-4xl font-bold mt-5'>SignIn</h1>
        <form className='m-auto  flex items-center justify-center flex-col' onSubmit={handleSubmit}>
          <div className='m-2 mt-16'>
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
            <span>{loading ? 'Logging In' : "Sign In"}</span>
          </button>


          <Link to="/forgotpassword">Forgot Password</Link>

        </form>
        <p className='my-5 text-gray-500 text-lg'>or</p>

        <OAuth/>
        
        <p className='mt-16'>Don't have an account? <Link to="/signup" className='text-pink-500'>SignUp</Link></p>
      </div>

    </div>
  )
}

export default SignIn