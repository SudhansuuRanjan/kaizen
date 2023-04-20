import React, { useState, useEffect } from 'react'
import './CartPage.scss'
import CartItem from './CartItem'
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import PaymentGateway from '../../utils/PaymentGateway';
import { Link } from 'react-router-dom';


const CartPage = () => {
  const auth = getAuth();
  const [cartItems, setCartItems] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [changed, setChanged] = useState(Date.now());
  const [discount, setDiscount] = useState(0);

  const userRef = doc(db, 'users', auth.currentUser.uid);

  // get current user data from firestore
  const getUser = async () => {
    setLoading(true);
    const docSnap = await getDoc(userRef);
    // filter not purchased events from cart
    const notPurchased = docSnap.data().cart.filter((item) => !item.purchased);
    const amount = notPurchased.reduce((acc, item) => acc + Number(item.price), 0);
    // if user is from aiims patna then discount 60% from total amount
    const address = docSnap.data().email.split('@').pop();
    if (address === 'aiimspatna.org') {
      setDiscount(Math.ceil(0.2 * amount));
      toast.success("Congratulations🥳, AIIMS Patna student discount of 80% applied!");
    }

    setCartItems(notPurchased);
    setLoading(false);
  }

  // delete event from cart
  const deleteEvent = async (id) => {
    try {
      const cart = cartItems;
      const newCart = cart.filter((item) => item.id !== id);
      await updateDoc(userRef, {
        cart: newCart
      });
      setCartItems(newCart);
      const amount = newCart.reduce((acc, item) => acc + Number(item.price), 0);
      const address = auth.currentUser.email.split('@').pop();
      if (address === 'aiimspatna.org') {
        setDiscount(Math.ceil(0.2 * amount));
      }
      toast.success("Event removed from cart!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUser();
  }, [changed]);

  const validateEvents = () => {
    // if members are less that minMem then return false
    return cartItems.every((item) => item.members.length + 1 >= item.minMem);
  }

  const handlepayment = async () => {
    if (!validateEvents()) {
      toast.error("One or more event(s) have less members than expected!", cartItems[0].members.length);
      return;
    }
    setDisabled(true);
    try {
      const status = await PaymentGateway(cartItems.reduce((acc, item) => acc + Number(item.price), 0));
      // after payment is successful, update purchased field of events in cart
      console.log(status);
    } catch (error) {
      toast.error(error.message);
    }

    setChanged(Date.now());
    setDisabled(false);
  }


  return (
    <main className='bg-black min-h-screen'>
      <div className='cart-banner'>
        <h1 className='cart-head'>Your Event<br />Cart</h1>
      </div>
      <div className='cart-container'>
        {
          Loading ? <div> Loading...</div> : (cartItems.length === 0 ?
            <div className='empty-cart flex text-center flex-col justify-center gap-10'>
              <p>Your Cart is Empty.</p>
              <p className='text-lg'>Go to <Link className='text-yellow-500' to='/events'>Events</Link> page to add events to cart.</p>
            </div> :
            <div className='cart-items'>
              {
                cartItems.map((item, index) => (
                  <CartItem key={index} data={item} cartItems={cartItems} deleteEvent={deleteEvent} />
                ))
              }
            </div>
          )}

        {
          cartItems.length !== 0 && <div className='flex flex-col items-center justify-between w-[100%] mt-24 mb-16'>
            <div className='flex items-center justify-between lg:w-[80%] md:w-[85%] w-[90%] '>
              {discount === 0 ?
                <span className='text-xl md:text-2xl lg:text-2xl text-yellow-600'>
                  Total <span className='font-bold'>
                    ₹  {cartItems.reduce((acc, item) => acc + Number(item.price), 0)}
                  </span>
                </span> :
                <span className='text-xl md:text-2xl lg:text-2xl text-yellow-600 flex items-center gap-1'>
                  Total <span className='text-red-500 text-base line-through'> ₹ {cartItems.reduce((acc, item) => acc + Number(item.price), 0)}</span>
                  <span className='font-bold '>
                    ₹  {discount}
                  </span>

                </span>
              }


              <Link to="/checkout">
                <button disabled={disabled} className='bg-black shadow-xl py-2 lg:px-5  md:px-5 px-3 rounded-xl border  border-[#ebe6d0] font-semibold text-lg font-mono text-[#ebe6d0] hover:bg-[#ebe6d0] hover:text-black transition-all delay-75 ease-out'>
                  Proceed to Pay
                </button>
              </Link>
            </div>
          </div>
        }
      </div>
    </main >
  )
}

export default CartPage