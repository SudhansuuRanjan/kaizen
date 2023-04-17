import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { collection, doc, getDoc, updateDoc, writeBatch, addDoc, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import shortid from 'shortid'
import { PaymentInitModal } from 'pg-test-project';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const generateTxnId = () => {
    var chars = '0123456789';
    var string_length = 10;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

const Payment = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const [user, setUser] = useState([]);
    const [amount, setAmount] = useState(0);
    const [urlParams, setUrlParams] = useState({});
    const [paymentCredentials, setPaymentCredentials] = useState({
        isOpen: false,
        clientCode: import.meta.env.VITE_PAYMENT_CLIENT_CODE,
        transUserName: import.meta.env.VITE_PAYMENT_USERNAME,
        txtnId: generateTxnId(),
        transUserPassword: import.meta.env.VITE_PAYMENT_PASSWORD,
        authkey: import.meta.env.VITE_PAYMENT_AUTH_KEY,
        authiv: import.meta.env.VITE_PAMENT_AUTH_IV,
        callbackUrl: 'https://www.kaizenaiimspatna.com/checkout/',
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        phone: '',
        address: '',
        amount: 0,
        udf1: "", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: "", udf11: "", udf12: "", udf13: "", udf14: "", udf15: "", udf16: "", udf17: "", udf18: "", udf19: "", udf20: "", channelId: "", programId: "", mcc: "",
        env: 'prod',

    })

    // get url query params
    const getQueryParams = async () => {
        let params = getJsonFromUrl();
        setUrlParams(params);
        if (params.status === 'SUCCESS' && amount !== 0 && amount === parseInt(params.amount)) {
            toast.success('Payment Successful!' + amount);
            await updatePurchase();
            // navigate('/profile');
        } else if (params.status === 'FAILED') {
            toast.error('Payment Failed!');
            // navigate('/cart')
        }
        // console.log(params);
    }

    function getJsonFromUrl() {
        const queryParams = new URLSearchParams(window.location.search);
        const paramsObject = {};
        for (const [key, value] of queryParams.entries()) {
            paramsObject[key] = value;
        }
        setUrlParams(paramsObject);
        // console.log(paramsObject)
        return paramsObject;
    }

    const getProfile = async () => {
        try {
            const docSnap = await getDoc(userRef);
            const user = docSnap.data();
            setUser(user);
            const { name, email, phone, address } = user;
            const notPurchased = docSnap.data().cart.filter((item) => !item.purchased);
            const amount = notPurchased.reduce((acc, item) => acc + Number(item.price), 0);
            setAmount(amount);
            if (amount === 0) {
                navigate('/events');
            }
            setPaymentCredentials({
                ...paymentCredentials,
                name,
                email,
                phone,
                address,
                amount: Number(amount),
            })
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleChange = (e) => {
        setPaymentCredentials({
            ...paymentCredentials,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPaymentCredentials({
            ...paymentCredentials,
            isOpen: true,
        })
    }

    const updatePurchase = async () => {
        try {
            const cart = user.cart;
            const notPurchasedItems = cart.filter((item) => !item.purchased);

            notPurchasedItems.forEach(async (item) => {
                const regRef = collection(db, "registrations");
                const data = {
                    ...item,
                    uid: auth.currentUser.uid,
                    email: auth.currentUser.email,
                    name: auth.currentUser.displayName,
                    purchasedAt: new Date(),
                }
                await addDoc(regRef, data);
            });

            const purchasedItems = cart.map((item) => {
                return {
                    ...item,
                    purchased: true,
                };
            });

            await updateDoc(userRef, { cart: purchasedItems });
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getQueryParams();
        getProfile();
    }, []);

    return (
        <main className='bg-black pb-36'>
            <div className='cart-banner'>
                <h1 className='cart-head'>Checkout</h1>
            </div>
            {urlParams && urlParams.status ? <div className='m-auto w-[100%] flex items-center justify-center'>
                <div>
                    <h1 className='text-2xl font-semibold'>Payment Info</h1>
                    <h1 >Payment Status: {urlParams.status}</h1>
                    <h1>Payment Message: {urlParams.sabpaisaMessage
                    }</h1>
                    <h1>
                        Payee Name: {urlParams.payerName}
                    </h1>
                    <h1>
                        Amount Paid: ₹ {
                            urlParams['amount']
                        }
                    </h1>
                </div>

            </div>

                : <div className='m-auto flex items-center lg:w-[100%] md:w-[100%] px-5'>
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
            }

            <PaymentInitModal
                amount={String(paymentCredentials.amount)}
                payerMobile={paymentCredentials.phone}
                payerName={paymentCredentials.name}
                payerEmail={paymentCredentials.email}
                payerAddress={paymentCredentials.address}
                clientCode={paymentCredentials.clientCode}
                transUserPassword={paymentCredentials.transUserPassword}
                transUserName={paymentCredentials.transUserName}
                callbackUrl={paymentCredentials.callbackUrl}
                isOpen={paymentCredentials.isOpen}
                authkey={paymentCredentials.authkey}
                authiv={paymentCredentials.authiv}
                env={paymentCredentials.env}
                clientTxnId={paymentCredentials.txtnId}
                amountType={'INR'}
            />
        </main>
    )
}

export default Payment