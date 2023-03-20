import React, { useState, useEffect } from 'react'
import './CartPage.scss'
import CartItem from './CartItem'
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import PaymentGateway from '../../utils/PaymentGateway';

const CartPage = () => {
  const auth = getAuth();
  const [cartItems, setCartItems] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  // get current user data from firestore
  const getUser = async () => {
    setLoading(true);
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    setCartItems(docSnap.data().cart);
    setLoading(false);
  }

  // delete event from cart
  const deleteEvent = async (id) => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const cart = cartItems;
      const newCart = cart.filter((item) => item.id !== id);
      await updateDoc(userRef, {
        cart: newCart
      });
      setCartItems(newCart);
      toast.success("Event removed from cart!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <main className='bg-black'>
      <div className='cart-banner'>
        <h1 className='cart-head'>Your Event<br />Cart</h1>
      </div>
      <div className='cart-container'>
        {
          Loading ? <div> Loading...</div> : (cartItems.length === 0 ?
            <div className='empty-cart'> Empty Cart </div> :
            <div className='cart-items'>
              {
                cartItems.map((item, index) => (
                  <CartItem key={index} data={item} cartItems={cartItems} deleteEvent={deleteEvent} />
                ))
              }
            </div>
          )}

        <div className='flex flex-col items-center justify-between w-[100%] mt-24 mb-16'>
          <div className='flex items-center justify-between lg:w-[80%] md:w-[85%] w-[90%] px-2'>
            <span className='text-xl md:text-2xl lg:text-2xl text-yellow-600'>Total : <span className='font-bold'> ₹  {cartItems.reduce((acc, item) => acc + Number(item.price), 0)}</span></span>
            <button disabled={disabled} className='bg-black shadow-xl py-2 px-5 rounded-xl border  border-[#ebe6d0] font-semibold text-lg font-mono text-[#ebe6d0] hover:bg-[#ebe6d0] hover:text-black transition-all delay-75 ease-out' onClick={async () => {
              setDisabled(true);
              await PaymentGateway(cartItems.reduce((acc, item) => acc + Number(item.price), 0))
              setDisabled(false);
            }}>
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CartPage