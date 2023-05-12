import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PaymentInitModal } from 'pg-test-project';
import { db } from '../../firebase.config';
import { getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'


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

const Alumni = () => {
    document.title = 'Alumni Connect | KAIZEN 2023';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        batch: '',
        attending: false,
    })
    const [amount, setAmount] = useState(1000);
    const [paymentCredentials, setPaymentCredentials] = useState({
        isOpen: false,
        clientCode: import.meta.env.VITE_PAYMENT_CLIENT_CODE,
        transUserName: import.meta.env.VITE_PAYMENT_USERNAME,
        txtnId: '',
        transUserPassword: import.meta.env.VITE_PAYMENT_PASSWORD,
        authkey: import.meta.env.VITE_PAYMENT_AUTH_KEY,
        authiv: import.meta.env.VITE_PAMENT_AUTH_IV,
        callbackUrl: 'https://www.kaizenaiimspatna.com/alumni-connect',
        name: '',
        email: '',
        phone: '',
        address: 'Patna, Bihar',
        amount: 0,
        udf1: "", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: "", udf11: "", udf12: "", udf13: "", udf14: "", udf15: "", udf16: "", udf17: "", udf18: "", udf19: "", udf20: "", channelId: "", programId: "", mcc: "",
        env: 'prod'
    });
    const [loading, setLoading] = useState(false);
    const [verifyingPayment, setVerifyingPayment] = useState(false);
    const [urlParams, setUrlParams] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    function getJsonFromUrl() {
        const queryParams = new URLSearchParams(window.location.search);
        const paramsObject = {};
        for (const [key, value] of queryParams.entries()) {
            paramsObject[key] = value;
        }
        // console.log(paramsObject)
        setUrlParams(paramsObject);
        return paramsObject;
    }

    const getQueryParams = async () => {
        let params = getJsonFromUrl();
        if (!params.status) return;
        if (params.status === 'SUCCESS') {
            await handlePaymentSuccess(params);
            navigate('/events');
        } else if (params.status === 'FAILED') {
            toast.error('Payment Failed! If your money has been debited please contact Administrator. Err code 3');
            navigate('/');
        } else if (params.status === 'CANCELLED') {
            toast.error('Payment Cancelled! Err code 4');
            navigate('/');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const txnId = generateTxnId();

        // create a new transaction document in firestore in alumni collection
        try {
            await setDoc(doc(db, 'alumni-temp', txnId), {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                batch: formData.batch,
                attending: formData.attending,
                amount: amount,
                txnId: txnId,
                timestamp: serverTimestamp(),
            })

            setPaymentCredentials({
                ...paymentCredentials,
                name: 'Alumni ' + formData.name,
                email: formData.email,
                phone: formData.phone,
                amount: amount,
                isOpen: true,
                txtnId: txnId,
            });
        } catch (error) {
            toast.error('Some error occured! Please try again later!');
        }
        setLoading(false);
    }

    const handlePaymentSuccess = async (params) => {
        try {
            setVerifyingPayment(true);
            if (params.clientTxnId) {
                const txnId = params.clientTxnId;
                const docRef = doc(db, 'alumni-temp', txnId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log(docSnap.data())
                    const data = docSnap.data();
                    await setDoc(doc(db, 'alumni', txnId), {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        batch: data.batch,
                        attending: data.attending,
                        amount: data.amount,
                        txnId: data.txnId,
                        timestamp: serverTimestamp(),
                        paymentVerified: true,
                        paymentdata: params,
                    });
                    await setDoc(doc(db, 'alumni-temp', txnId), {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        batch: data.batch,
                        attending: data.attending,
                        amount: data.amount,
                        txnId: data.txnId,
                        timestamp: serverTimestamp(),
                        paymentVerified: true,
                        paymentdata: params,
                    });
                    const res2 = await axios.post('https://kaizen-api.vercel.app/api/sendAlumniMail', { email: data.email });
                    toast.success('Payment Successful! Thank you for your contribution!');
                } else {
                    toast.error('Something went wrong! Please try again later. If your money has been debited, please contact us.');
                }
            } else {
                toast.error('Something went wrong! Please try again later. If your money has been debited, please contact us.');
            }
        } catch (error) {
            toast.error('Some error occured! Please try again later!');
        }
    }

    useEffect(() => {
        getQueryParams();
    }, [])

    return (
        <div className='bg-black pb-24'>
            <div className='cart-banner'>
                <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Alumni Connect</h1>
            </div>

            <div className='lg:w-[37rem] md:w-[32rem] w-[90%] m-auto font-medium' >
                <p className='mb-5 text-2xl'>Respected Senior,</p>
                <p className='text-lg'>Warm greetings from Team <span className='text-yellow-500'>KAIZEN!</span></p>
                <p className='text-lg'>We, your juniors, are pleased to inform you that our KAIZEN, is going to be back with a big bang after three years. KAIZEN is going to be held between 10th and 14th May, 2023. We're sure just the mention of KAIZEN brings a wide smile on your face with pleasant memories of sleepless nights and adventurous days.</p>
                <p className='text-lg pt-2'>We hope to see you in <span className='text-yellow-500'>KAIZEN!</span> this year!</p>
            </div>

            {
                loading && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'>
                    </div>
                    <p>
                        Proceeding to Payment...
                    </p>
                    <p>
                        Please do not close this window or press back button.
                    </p>
                </div>
            }

            {
                verifyingPayment && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'>
                    </div>
                    <p>
                        Verifying Payment...
                    </p>
                    <p>
                        Please do not close this window or press back button.
                    </p>
                </div>
            }

            <div className='lg:w-[37rem] md:w-[32rem] w-[90%] bg-gray-900 rounded-2xl text-gray-700 m-auto mt-24'>
                <div className=''>
                    <h1 className='text-3xl text-center font-semibold bg-gray-800 border-b border-gray-900 rounded-2xl p-5 shadow text-yellow-500'>Contribute</h1>
                    {/* <h2 className='text-base font-medium'>Get your basic registration done!</h2> */}
                </div>

                <div className='my-3'>
                    <form onSubmit={handleSubmit} className='flex gap-3.5 flex-col w-full p-4 px-5'>
                        <div className='flex flex-col w-full relative'>
                            <label className='font-medium text-[#ebe6d0]' htmlFor="text">Name</label>
                            <input required className='text-gray-200 px-4 py-2.5 border rounded-lg font-medium pl-24 bg-[#0e0d1b]' value={formData.name} type="text" id="name" placeholder="Captain Jack Sparrow" onChange={handleChange} />
                            <div className='absolute top-[1.55rem] bg-gray-800 py-2.5 px-4 rounded-lg text-gray-300 left-[1px]'>
                                Alum
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium text-[#ebe6d0]' htmlFor="email">Email</label>
                            <input required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" className='text-gray-200 px-4 py-2.5 border rounded-lg font-medium  bg-[#0e0d1b]' value={formData.email} type="email" id="email" placeholder="capjacksparrow@gmail.com" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium text-[#ebe6d0]' htmlFor="mobile">Mobile No.</label>
                            <input required className='text-gray-200 px-4 py-2.5 border rounded-lg font-medium  bg-[#0e0d1b]' value={formData.phone} type="text" id="phone" placeholder="9132456778" onChange={handleChange} pattern="[6789][0-9]{9}" title="Please enter valid phone number" />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-medium text-[#ebe6d0]' htmlFor="text">Batch</label>
                            <input required className='text-[#ebe6d0] px-4 py-2.5 border rounded-lg font-medium  bg-[#0e0d1b]' value={formData.batch} type="text" id="batch" placeholder="2022" onChange={handleChange} />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label className='font-medium text-[#ebe6d0]' htmlFor="amount">Amount</label>
                            <input required className='text-gray-200 px-4 py-2.5 border rounded-lg font-medium pl-16 bg-[#0e0d1b]' value={amount} type="number" min={1000} id="batch" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                            <div className='absolute top-[1.55rem] bg-gray-700 text-white font-medium py-2.5 px-4 rounded-lg left-[1px]'>
                                ₹
                            </div>
                        </div>
                        <div className='flex gap-3 items-center py-3'>
                            <input checked={formData.attending} type='checkbox' onChange={() => setFormData({
                                ...formData,
                                attending: !formData.attending,
                            })} />
                            <label className='text-gray-200 font-medium'>I will be attending this year's KAIZEN. </label>
                        </div>
                        <div className='flex flex-col w-full mt-5'>
                            <button className='bg-yellow-500 text-gray-900 py-2.5 my-3 rounded-lg font-semibold' type="submit">Contribute</button>
                        </div>
                    </form>
                </div>
            </div>
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
                label={'prod'}
            />
        </div>
    )
}

export default Alumni