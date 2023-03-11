import React, { useState, useEffect } from 'react'
import CartItem from '../components/CartItem'
import { db } from '../firebase.config'
import { collection, getDoc, doc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const Cart = () => {
  const auth = getAuth();
  const [cartItems, setCartItems] = useState([]);
  const [Loading, setLoading] = useState(true);

  // get current user data from firestore
  const getUser = async () => {
    setLoading(true);
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    setCartItems(docSnap.data().cart);
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 flex relative">
      <div className="bg-[#E9CC7E] border-img2  bg-opacity-10 backdrop-blur-sm rounded-xl lg:w-[80%] md:w-[95%] w-[95%] bg-center m-auto mt-16 h-fit ">
        <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-10 lg:h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
          <p className='text-xl lg:text-2xl font-bold text-yellow-200 px-5'>Event Cart</p>
        </div>


        {
          Loading ? <div className='flex items-center justify-center w-[100%] h-[50vh]'>
            <p className='text-2xl font-semibold text-yellow-400'>Loading...</p>
          </div> : (cartItems.length === 0 ? <div className='flex flex-col items-center justify-center my-16'>
            <img src="/images/empty-cart.png" alt="empty-cart" className='w-[20rem]' />
            <p className='text-2xl font-bold text-yellow-500 pt-4'>Your cart is empty</p>
          </div>
            :
            <>
              <div className='flex flex-col items-center flex-wrap justify-evenly gap-5 mt-16 mb-16'>
                {
                  cartItems.map((item, id) => (
                    <CartItem key={id} data={item} />
                  ))
                }
              </div>
              <div className='flex flex-col items-center justify-between w-[100%] mt-10 mb-16'>
                <div className='flex items-center justify-between w-[90%] px-2'>
                  <span className='text-2xl text-yellow-500'>Total : <span className='font-bold'> ₹  {cartItems.reduce((acc, item) => acc + Number(item.price), 0)}</span></span>
                  <button className='relative flex items-center justify-center'>
                    <img src="images/btn1.png" alt="btn" className='h-[6rem] w-[17rem]' />
                    <p className='absolute text-yellow-400 font-semibold text-xl font-mono'>Proceed to Pay</p>
                  </button>
                </div>
              </div>
            </>)
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

export default Cart