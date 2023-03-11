import React, { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import PurchasedEventItem from '../components/PurchasedEventItem'
import UpdateProfile from '../components/UpdateProfile'
import EditProfile from '../components/EditProfile'
import QRCode from "react-qr-code";

const Profile = () => {

  document.title = "Profile | Kaisen 2023"

  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [showQr, setShowQr] = useState(false);

  const { name, email } = formData;
  const { uid } = auth.currentUser;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  }

  const checkUser = async () => {
    if (!loading) {
      if (user.gender === "" || user.phone === "" || user.address === "" || user.college === "" || user.year === "" || user.course === "")
        setUpdateProfileModal(true);
    }
  }

  // get profile details from firestore
  const getProfile = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      const user = docSnap.data();
      setUser(user);
    } catch (error) {
      toast.error("Could not get profile details!");
    }
    setLoading(false);
    await checkUser();
  }

  useEffect(() => {
    getProfile();
  });

  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 pb-20 flex relative">
      {
        updateProfileModal && <UpdateProfile setUpdateProfileModal={setUpdateProfileModal} />
      }

      {
        changeDetails && <EditProfile user={user} setChangeDetails={setChangeDetails} />
      }

      {
        showQr && <ShowQr value={"http://127.0.0.1:5173/user/" + uid.toUpperCase().substring(0, 6)} setShowQr={setShowQr}></ShowQr>
      }

      <div className="bg-[#E9CC7E] border-img2  bg-opacity-10 backdrop-blur-sm rounded-xl lg:w-[80%] md:w-[95%] w-[95%] bg-center m-auto mt-16 h-fit ">
        <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
          <p className='text-2xl font-bold text-yellow-200 px-5'>My Profile</p>
        </div>
        {
          user ? <div className="flex flex-col items-center justify-center m-[auto] w-[90%] h-fit py-16">
            <div className='flex justify-between w-[100%]'>

              <div className='flex gap-5'>
                <div className='flex flex-col items-center justify-center'>
                  <div className='overflow-hidden rounded-full h-[5rem] w-[5rem] flex items-center justify-between'>
                    <img src="https://cdn2.f-cdn.com/files/download/40990929/88eaef.jpg" alt="profile" className='w-[5rem] h-auto' />
                  </div>
                  <button className='text-sm bg-yellow-200 hover:bg-yellow-700 hover:text-yellow-200 text-yellow-800 px-3 rounded-full py-0.5 mt-2 font-medium' onClick={() => {
                    setShowQr(true);
                    document.body.style.overflow = "hidden";
                  }}>Show QR</button>
                </div>
                <div className='flex flex-col items-start'>
                  <p className='text-xl font-semibold text-center mt-4'>{name}</p>
                  <p className='text-sm text-center text-gray-400'>UID : {uid.toUpperCase().substring(0, 6)}</p>
                </div>
              </div>


              <div className='flex items-center justify-center gap-2'>
                <button onClick={() => setChangeDetails(true)} className='bg-yellow-700 py-1 px-5 rounded-full border border-yellow-300'>
                  Edit Profile
                </button>
                <button className='bg-red-500 hover:bg-red-600 py-1 px-5 rounded-full border-red-300 border' onClick={onLogout}>
                  Logout
                </button>
              </div>

            </div>
            <div className='flex flex-col items-center justify-center w-[100%] mt-5 h-[1px] bg-yellow-600 bg-opacity-25'>
            </div>

            <div className='flex w-[100%] justify-between mt-10'>
              <div className='flex flex-col gap-2 w-[50%]'>
                <p className='text-xl font-semibold text-yellow-400'>Personal Details</p>
                <p className='text-yellow-500 mt-4'>Gender: <span className='text-white'>{user.gender}</span></p>
                <p className='text-yellow-500'>Contact No.: <span className='text-white'>{user.phone}</span></p>
                <p className='text-yellow-500'>Email: <span className='text-white'>{user.email}</span></p>
                <p className='text-yellow-500'>Address: <span className='text-white'>{user.address}</span></p>
              </div>

              <div className='flex flex-col gap-2 w-[50%]'>
                <p className='text-xl font-semibold text-yellow-400'>College Details</p>
                <p className='text-yellow-500 mt-4'>College: <span className='text-white'>{user.college}</span></p>
                <p className='text-yellow-500'>Year of Study: <span className='text-white'>{user.year}</span></p>
                <p className='text-yellow-500'>Course: <span className='text-white'>{user.course}</span></p>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center w-[100%] mt-10 h-[1px] bg-yellow-600 bg-opacity-25'>
            </div>

            <div className='w-[100%] mt-10'>
              <p className='text-xl font-semibold text-yellow-400'>Your Events</p>

              <div>
                <div className='flex flex-col gap-4 w-[100%] mt-5'>
                  {
                    user.cart.map((item, index) => (
                      <PurchasedEventItem key={index} data={item} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div> :
            <div className='flex items-center justify-center w-[100%] h-[50vh]'>
              <p className='text-2xl font-semibold text-yellow-400'>Loading...</p>
            </div>
        }

        <div className='flex items-center justify-center gap-3 pb-16'>
          <div className='h-3 w-3 bg-yellow-200 rotate-45' />
          <div className='h-3 w-3 bg-yellow-200 rotate-45' />
          <div className='h-3 w-3 bg-yellow-200 rotate-45' />
        </div>

      </div>
    </div>
  )
}


const ShowQr = ({ value, setShowQr }) => {
  return (
    <div className='fixed h-[100vh] w-[100vw] flex justify-center items-center top-0 left-0 bg-blue-300 bg-opacity-20 backdrop-blur-md z-[9999] flex-col gap-2'>
      <button className='absolute top-5 right-5' onClick={() => {
        setShowQr(false);
        document.body.style.overflow = 'auto';
      }}>
        <img src="https://img.icons8.com/ios/50/000000/close-window.png" alt="close" className='h-10 bg-red-800 rounded bg-opacity-20' />
      </button>
      <div className='bg-white h-[17rem] w-[17rem] p-5 rounded-lg'>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>
      <p>Scan it to see profile</p>
    </div>
  )
}

export default Profile