import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import shortid from 'shortid'
import { PaymentInitModal } from 'pg-test-project';

const Payment = () => {

    const auth = getAuth();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const [profile, setProfile] = useState();
    // const [formData, setFormData] = useState({
    //     name: auth.currentUser.displayName,
    //     email: auth.currentUser.email,
    //     phone: '',
    //     address: '',
    //     amount: 0,
    // })

    const [paymentCredentials, setPaymentCredentials] = useState({
        isOpen: false,
        clientCode: 'TM001',
        transUserName: 'rajiv.moti_336',
        txtnId: shortid.generate(),
        transUserPassword: 'RIADA_SP336',
        authkey: 'kaY9AIhuJZNvKGp2',
        authiv: 'YN2v8qQcU3rGfA1y',
        callbackUrl: 'http://localhost:5173/profile',
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        phone: '',
        address: '',
        amount: 0,
        udf1: "", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: "", udf11: "", udf12: "", udf13: "", udf14: "", udf15: "", udf16: "", udf17: "", udf18: "", udf19: "", udf20: "", channelId: "", programId: "", mcc: ""
    })

    const getProfile = async () => {
        try {
            const docSnap = await getDoc(userRef);
            const user = docSnap.data();
            const { name, email, phone, address, cart } = user;
            const amount = cart.reduce((acc, item) => {
                return Number(acc) + Number(item.price);
            }, 0);
            // setFormData({
            //     name,
            //     email,
            //     phone,
            //     address,
            //     amount: Number(amount),
            // })
            setPaymentCredentials({
                ...paymentCredentials,
                name,
                email,
                phone,
                address,
                amount: Number(amount),
            })
            setProfile(user);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        // setFormData({
        //     ...formData,
        //     [e.target.id]: e.target.value,
        // })
        setPaymentCredentials({
            ...paymentCredentials,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(paymentCredentials);
        setPaymentCredentials({
            ...paymentCredentials,
            isOpen: true,
        })
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <main className='bg-black'>
            <div className='cart-banner'>
                <h1 className='cart-head'>Checkout</h1>
            </div>
            <div className='m-auto flex items-center w-[100%]'>
                <form onSubmit={handleSubmit} className='w-[27rem] flex flex-col gap-4 m-auto'>
                    <div className='flex flex-col'>
                        <label htmlFor='name'>Name</label>
                        <input disabled={true} className='bg-gray-700 px-2 py-2.5 rounded-lg mt-1' value={paymentCredentials.name} onChange={handleChange} type='text' name='name' id='name' />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='email'>Email</label>
                        <input disabled={true} className='bg-gray-700 px-2 py-2.5 rounded-lg mt-1' value={paymentCredentials.email} onChange={handleChange} type='email' name='email' id='email' />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='amount'>Amount</label>
                        <input disabled={true} className='bg-gray-700 px-2 py-2.5 rounded-lg mt-1' value={paymentCredentials.amount} type='number' name='amount' id='amount' />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='phone'>Phone</label>
                        <input className='bg-gray-700 px-2 py-2.5 rounded-lg mt-1' value={paymentCredentials.phone} onChange={handleChange} type='text' name='phone' id='phone' />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor='address'>Address</label>
                        <input className='bg-gray-700 px-2 py-2.5 rounded-lg mt-1' value={paymentCredentials.address} onChange={handleChange} type='text' name='address' id='address' />
                    </div>

                    <button className='bg-white text-gray-900 font-medium px-2 py-2.5 rounded-lg my-5' type='submit'>Proceed to Pay</button>
                </form>
            </div>

            <PaymentInitModal
                amount={String(paymentCredentials.amount)} txtnId={paymentCredentials.txtnId}
                payerMobile={paymentCredentials.phone} payerName={paymentCredentials.name}
                payerEmail={paymentCredentials.email}
                payerAddress={paymentCredentials.address}
                clientCode={paymentCredentials.clientCode}
                transUserPassword={paymentCredentials.transUserPassword} 
                transUserName={paymentCredentials.transUserName}
                callbackUrl={paymentCredentials.callbackUrl} isOpen={paymentCredentials.isOpen} 
                authkey={paymentCredentials.authkey} 
                authiv={paymentCredentials.authiv}
                label={"testing"} 
                />
        </main>
    )
}

export default Payment