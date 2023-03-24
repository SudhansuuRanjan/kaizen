import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Profile = () => {

  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }

  const onSubmit = async (e) => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update displayname in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        toast.success('Profile updated successfully');

        //update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (err) {
      toast.error('Could not update profile details!');
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  return (
    <div className='flex min-h-screen'>
      <div className='m-auto w-[100%]'>
        <div className='max-w-[40rem] m-auto'>
          <div className='flex items-center justify-between py-4'>
            <p className='text-xl font-semibold'>
              My Profile
            </p>
            <button type='button' className='bg-pink-600 py-1 px-4 rounded-full text-sm' onClick={onLogout}>Logout</button>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <p className='font-medium'>Personal Details</p>
              <p className='text-pink-500 cursor-pointer font-bold' onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => (!prevState));
              }}>
                {changeDetails ? 'done' : 'change'}
              </p>
            </div>

            <div>
              <form>
                <div className='mt-4'>
                  <p className='text-sm font-semibold text-pink-600'>Email</p>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    disabled={true}
                    className={
                      'my-2 py-2 px-3 w-6/12 focus:outline-none focus:border-pink-500 rounded-lg'
                    }
                  />
                </div>
                <div className='mt-4'>
                  <p className='text-sm font-semibold text-pink-600'>Name</p>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    disabled={!changeDetails}
                    onChange={onChange}
                    className={
                      changeDetails ? 'my-2 w-6/12 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500 py-2 px-3 rounded-lg' :
                        'my-2 py-2 px-3 w-6/12 focus:outline-none focus:border-pink-500 rounded-lg'
                    }
                  />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile