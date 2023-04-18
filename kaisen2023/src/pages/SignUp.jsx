import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp, collection, updateDoc, getDoc, query, getDocs, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import OAuth from '../components/OAuth';
import shortid from 'shortid';
import axios from 'axios';

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState('');
  const [formData, setFormdata] = useState({
    name: "",
    email: Email,
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);
  const [verified, setVerified] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState('Enter your email to get started!');

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
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
      formDataCopy.id = shortid.generate().toUpperCase();
      formDataCopy.purchasedEvents = [];
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      toast.success('Signed Up Successfully!');
      navigate('/complete-profile');
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

  const verifyEmail = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error('Please enter the OTP');
      return;
    }
    try {
      const emailRef = doc(db, "emailverify", formData.email);
      const docSnap = await getDoc(emailRef);
      if (docSnap.exists()) {
        const { otp: otpFromDB } = docSnap.data();
        await updateDoc(emailRef, { isVerified: true });
        console.log(otpFromDB, otp);
        if (otpFromDB == otp) {
          setVerified(true);
          toast.success('Email Verified Successfully!');
          await handleSubmit();
        } else {
          toast.error('Wrong OTP');
        }
      } else {
        toast.error('Email not found!');
      }
      setOtp("");
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendEmail = async (e) => {
    setSendingMail(true);
    const otp = generateOTP();
    try {
      const usersRef = collection(db, 'users');
      const user = await getDocs(query(usersRef, where('email', '==', Email)));
      const users = user.docs.map(doc => doc.data())
      if (users.length > 0) {
        toast.error('Email already exists!');
        setSendingMail(false);
        return;
      }
      const emailRef = doc(db, "emailverify", Email);
      await setDoc(emailRef, { otp, email: Email, id: shortid.generate(), timestamp: serverTimestamp(), isVerified: false });
      const res = await axios.post('https://kaizen-api.vercel.app/api/verifyEmail', { email: Email, otp });
      toast.success('Email Sent Successfully!');
      setMailSent(true);
    } catch (error) {
      toast.error(error.message)
    }
    setSendingMail(false);
  }

  const onChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }


  return (
    <div className="bg-[url('/images/map.png')] bg-repeat-y  min-h-screen bg-center bg-cover flex flex-col items-center justify-center gap-10 pt-12 lg:pt-8 md:pt-8">
      <img src="/images/kaizen.png" alt="logo" className='h-16' />
      <div className='bg-black  bg-opacity-20 backdrop-blur-sm rounded-2xl w-fit bg-center m-auto h-fit flex items-center justify-center flex-col py-10 px-5 md:px-7 lg:px-10 mt-0'>
        <h1 className='text-3xl lg:text-4xl font-bold'>SignUp</h1>
        <p className='my-3 px-4 py-1 bg-yellow-500 backdrop-blur-lg bg-opacity-30 text-yellow-400 rounded-md'>{message}</p>

        {!mailSent ? <form onSubmit={(e) => {
          e.preventDefault();
          sendEmail();
        }} className='m-auto flex items-center justify-center flex-col'>
          <div className='m-2 mt-16 md:mt-5 lg:mt-5'>
            <input required id="email" type="email" placeholder="Enter Email Id" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={Email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className='bg-yellow-600 py-2.5 md:py-3 lg:py-3 px-10 rounded-lg lg:w-[20rem] w-[17rem] m-3 flex items-center justify-center' type='submit'>
            {sendingMail ? <Loader color="pink-100" size="5" /> : null}
            <span>{sendingMail ? 'Sending Code' : "Send Code"}</span>
          </button>
        </form>
          :
          <form className='m-auto  flex items-center justify-center flex-col' onSubmit={verifyEmail}>
            <div className='m-2 mt-10 md:mt-5 lg:mt-5'>
              <input id="name" type="text" placeholder="Name" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.name} onChange={onChange} />
            </div>
            <div className='m-2'>
              <input id="email" type="email" placeholder="Email" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={formData.email} onChange={onChange} />
            </div>
            {
              mailSent &&
              <div className='m-2'>
                <input required id="otp" type="text" placeholder="Enter OTP" className='py-2.5 md:py-3 lg:py-3 rounded-lg px-3 lg:w-[20rem] w-[17rem] border-2 border-yellow-400 bg-yellow-600 bg-opacity-10' value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
            }
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
        }
        <p className='my-5 md:my-3 lg:my-2 text-yellow-700 text-lg'>or</p>
        <OAuth />
        <p className='mt-16 md:mt-5 lg:mt-5'>Already have an account? <Link to="/signin" className='text-yellow-500'>SignIn</Link></p>
      </div>

    </div>
  )
}

export default SignUp