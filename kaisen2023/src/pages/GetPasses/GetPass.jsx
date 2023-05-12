import React, { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { AiFillDelete } from 'react-icons/ai'
import shortid from 'shortid'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { PaymentInitModal } from 'pg-test-project';

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

const generatePassID = () => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var string_length = 10;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}


const GetPass = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        college: '',
    })

    const [peoples, setPeoples] = useState([]);
    const [hasPromoCode, setHasPromoCode] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [tnc, setTnc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [urlParams, setUrlParams] = useState({});
    const [paymentStatus, setPaymentStatus] = useState("UPDATING");
    const [gt10, setGt10] = useState(false);
    const [generatingPass, setGeneratingPass] = useState(false);
    const [paymentCredentials, setPaymentCredentials] = useState({
        isOpen: false,
        clientCode: import.meta.env.VITE_PAYMENT_CLIENT_CODE,
        transUserName: import.meta.env.VITE_PAYMENT_USERNAME,
        txtnId: '',
        transUserPassword: import.meta.env.VITE_PAYMENT_PASSWORD,
        authkey: import.meta.env.VITE_PAYMENT_AUTH_KEY,
        authiv: import.meta.env.VITE_PAMENT_AUTH_IV,
        callbackUrl: 'https://www.kaizenaiimspatna.com/basicregistration',
        name: '',
        email: '',
        phone: '',
        address: 'Patna, Bihar',
        amount: 0,
        udf1: "", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: "", udf11: "", udf12: "", udf13: "", udf14: "", udf15: "", udf16: "", udf17: "", udf18: "", udf19: "", udf20: "", channelId: "", programId: "", mcc: "",
        env: 'prod'
    })

    const getQueryParams = async () => {
        let params = getJsonFromUrl();
        if (!params.status) return;
        if (params.status === 'SUCCESS') {
            await handlePurchase(params);
            navigate('/');
        } else if (params.status === 'FAILED') {
            toast.error('Payment Failed! Err code 3');
            navigate('/')
            setPaymentStatus("FAILED");
        }
    }

    const getPeoples = async () => {
        if (localStorage.getItem('peoples') === null) return setPeoples([]);
        localStorage.getItem('peoples') && setPeoples(JSON.parse(localStorage.getItem('peoples')));
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


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = formData;
        data.id = shortid.generate();
        setPeoples([...peoples, data]);
        localStorage.setItem('peoples', JSON.stringify([...peoples, data]));
        setFormData({
            email: '',
            name: '',
            phone: '',
            college: '',
        });
        if (peoples.length >= 9) {
            setGt10(true);
            toast.success('Group Discount Applied!');
        }
        setIsPromoCodeApplied(false);
    }

    const handleDelete = (id) => {
        const newPeoples = peoples.filter((people) => people.id !== id);
        localStorage.setItem('peoples', JSON.stringify(newPeoples));
        setPeoples(newPeoples);
        setIsPromoCodeApplied(false);
        setPromoCode('');
    }


    const handlePromoCode = (e) => {
        e.preventDefault();
        if (promoCode === "") return;
        if (peoples.length === 0) {
            toast.warn('Please add atleast one person to apply promo code!');
            setIsPromoCodeApplied(false);
            return;
        }

        // if promocode matches any in promoCodes array set the respective discount
        // if (promoCode === 'IGIMSKIS' && peoples.length < 10) {
        //     setIsPromoCodeApplied(true);
        //     setDiscountedPrice(0.58 * (peoples.length * 1200));
        //     toast.success('Promo Code Applied! You have got a discount of 42%');
        //     return;
        // } else if (promoCode === 'IGIMSKIS' && peoples.length >= 10) {
        //     setIsPromoCodeApplied(true);
        //     setGt10(true);
        //     setDiscountedPrice(0.58 * ((peoples.length * 1200) - 1200));
        //     toast.success('Promo Code Applied! You have got a discount of 42%');
        //     return;
        // }else 
        if (promoCode === 'TMB' && peoples.length < 10) {
            setIsPromoCodeApplied(true);
            setDiscountedPrice(0.83 * (peoples.length * 1200));
            toast.success('😃 Promo Code Applied! You have got a discount of 17%');
            return;
        } else if (promoCode === 'TMB' && peoples.length >= 10) {
            setIsPromoCodeApplied(true);
            setGt10(true);
            setDiscountedPrice(0.83 * ((peoples.length * 1200) - 1200));
            toast.success('😃 Promo Code Applied! You have got a discount of 17%');
            return;
        } else {
            toast.error('Invalid Promo Code or Promo Code Expired 😟!');
            setDiscountedPrice(peoples.length * 1200);
            setIsPromoCodeApplied(false);
        }
    }

    const handlePaymentInit = async () => {
        if (peoples.length < 1) {
            toast.warn('Please add atleast one person to purchase!');
            return;
        }
        if (!tnc) {
            toast.warn('Please accept terms and conditions to purchase!');
            return;
        }
        setLoading(true);
        const txnId = generateTxnId();
        setPaymentStatus("UPDATING");
        // create a new doc in firestore in temp-passes collection and store peoples in it and then use the doc id as txnId
        const docRef = doc(db, 'temp-passes', txnId);
        await setDoc(docRef, { peoples: peoples, txnId: txnId, timestamp: serverTimestamp() });
        setPaymentCredentials({
            ...paymentCredentials,
            txtnId: txnId,
            isOpen: true,
            amount: Number(isPromoCodeApplied ? discountedPrice : peoples.length * 1200),
            name: peoples[0].name,
            phone: peoples[0].phone,
            email: peoples[0].email
        });
        // console.log({
        //     ...paymentCredentials,
        //     txtnId: txnId,
        //     isOpen: true,
        //     amount: Number(isPromoCodeApplied ? discountedPrice : peoples.length * 1200),
        //     name: peoples[0].name,
        //     phone: peoples[0].phone,
        //     email: peoples[0].email
        // })
        setLoading(false);
    }

    const handlePurchase = async (params) => {
        // console.log(params);
        setGeneratingPass(true);

        if (params.clientTxnId) {
            // get the doc from firestore using the clientTxnId
            const docRef = doc(db, 'temp-passes', params.clientTxnId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                try {
                    const data = docSnap.data();
                    // const res = await axios.post('https://kaizen-api.vercel.app/api/generatePasses', data);
                    // const peopleData = res.data.peoples;
                    for (let i = 0; i < data.peoples.length; i++) {
                        data.peoples[i].passId = generatePassID();
                    }

                    const peopleData = data.peoples;

                    for (let i = 0; i < peopleData.length; i++) {
                        try {
                            peopleData[i].paymentInfo = params;
                            const docRef = doc(db, 'passes', peopleData[i].id);
                            await setDoc(docRef, peopleData[i]);
                            const res2 = await axios.post('https://kaizen-api.vercel.app/api/sendPassMail', peopleData[i]);
                            console.log(peopleData[i]);
                        } catch (error) {
                            console.log(error.message);
                        }
                        // console.log(res2.data);
                    }
                    localStorage.removeItem('peoples');
                    getPeoples();
                    toast.success('😃 Registration Successfull! The confirmation mail will be sent to your email address shortly.');
                    setPaymentStatus("SUCCESS");
                } catch (error) {
                    toast.error(error.message);
                }
            } else {
                toast.error('Something went wrong! Please try again later. If your money has been debited and you do not receive passes within 15 min, please contact us.');
                setPaymentStatus("FAILED");
            }
        }

        setGeneratingPass(false);
    }

    useEffect(() => {
        getPeoples();
        getQueryParams();
    }, []);

    // return (
    //     <div className='bg-black pb-24 min-h-screen'>
    //         <div className='cart-banner'>
    //             <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Basic Registration</h1>
    //         </div>
    //         <div className="m-auto text-center flex flex-col items-center justify-center gap-3 max-w-[45rem]">
    //             <p className='px-5 text-lg'>This page is under <span className='text-yellow-500'>maintainance</span> ⛑️. Please check again later.</p>
    //             <p className='px-5 text-lg'>Due to heavy number 🚀 of Basic Registrations our site server is down.</p>
    //             <p className='px-5 text-lg'>It will 😃 reopen soon but with limited slots. Please try again after some time. Keep visiting for latest updates.</p>
    //             <p className='px-5 text-lg'>USE code '<span className='text-xl font-medium text-amber-400'>TMB</span>' at checkout for <span className='text-yellow-500'>The Mind Blowing</span>🤯 offer.</p>
    //             <p className='px-5 text-lg mt-5'>Sorry 🙇 for the inconvenience.</p>
    //         </div>
    //     </div>
    // )

    const isValidTime = () => {
        const now = new Date();
        const hour = now.getHours();
        return hour >= 18 && hour <= 22; // 6pm to 10pm
    };


    if (isValidTime()) return (
        <div className='bg-black pb-24 min-h-screen'>
            <div className='cart-banner'>
                <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Basic Registration</h1>
            </div>
            <div className="m-auto text-center flex flex-col items-center justify-center gap-3 max-w-[45rem]">
                <p className='px-5 text-lg'>Only spot 📍 registrations are allowed from <span className='text-yellow-500'>6pm to 10pm</span>. Please 😟 check again later!</p>
            </div>
        </div>
    )

    return (
        <div className='bg-black pb-24'>
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
                generatingPass && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'>
                    </div>
                    <p>
                        Registering you...
                    </p>
                    <p>
                        Please do not close this window or press back button.
                    </p>
                </div>
            }

            <div className='cart-banner'>
                <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Basic Registration</h1>
            </div>
            <p className='text-center text-yellow-500 text-lg mb-[7rem] lg:max-w-[55rem] md:max-w-[40rem] w-full px-6 m-auto'>Your basic registration <span className='text-red-500 font-medium'>DOES NOT</span> include participation in cultural, literary, arts, informals and sports competitions. To participate in them, register seperately by <Link to="/events" className='text-blue-400 font-medium'>clicking here</Link>.</p>
            <div className='lg:w-[37rem] md:w-[32rem] w-[90%] bg-white rounded-2xl text-gray-700 m-auto mt-5'>
                <div className='px-5 py-5'>
                    <h1 className='text-xl font-semibold'>KAIZEN AIIMS, Patna</h1>
                    <h2 className='text-base font-medium'>Get your basic registration done!</h2>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem] z-30'>
                    </div>

                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />

                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem] z-30'>
                    </div>
                </div>
                <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/images%2Fbsic-reg.jpg?alt=media&token=d796d016-e48e-419c-9ca7-f3422ad0e28e")] mt-[-1rem] bg-cover bg-center w-full h-fit text-sm text-white font-normal'>
                    <div className='h-full w-full bg-black bg-opacity-80 p-5'>
                        <p className='pb-2 text-yellow-400 text-base'>This Basic Registration includes:</p>
                        <ul className='list-inside'>
                            {/* <li>✅Lunch on all 5 days</li> */}
                            {/* <li>✅ Kaizen Merchandise & Goodies</li> */}
                            <li>✅ Access to all the events</li>
                            <li>✅ A seat in Medical Workshops lead under eminent faculty of AIIMS Patna:</li>
                            <ul className='list-inside ml-4'>
                                <li>👉 Basic Life Support (BLS)  Workshop</li>
                                <li>👉 Workshop on Laporoscopic Surgery</li>
                                <li>👉 Suturing Workshop</li>
                                <li>👉 Hand Hygiene Skill Station</li>
                            </ul>
                            <li>✅ Participation in Gully Cricket, Darts, Arm Wrestling and Push-up Challenge</li>
                            <li>✅ Access to our 360° Selfie Booth</li>
                            <li>✅ Bus transportation facility against designated routes in Patna</li>
                            <li>✅ Audience viewership across all events held under Kaizen, AIIMS Patna</li>
                        </ul>
                    </div>
                </div>
                {/* <div className='z-0'>
                    <img className='w-full h-fit mt-[-1rem]' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="event" />
                </div> */}
                <div className='flex p-6'>
                    <p className='font-medium text-red-500 text-center'>*Confirmation mail will be sent to each email separately.</p>
                </div>
                <form onSubmit={handleSubmit} className='flex gap-2 flex-col w-full p-6 pt-0'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium' htmlFor="text">Name</label>
                        <input required className='text-gray-700 px-4 py-2 border rounded-lg font-medium' value={formData.name} type="text" id="name" placeholder="Captain Jack Sparrow" onChange={handleChange} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium' htmlFor="email">Email</label>
                        <input required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" className='text-gray-700 px-4 py-2 border rounded-lg font-medium' value={formData.email} type="email" id="email" placeholder="capjacksparrow@gmail.com" onChange={handleChange} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium' htmlFor="college">College</label>
                        <input required className='text-gray-700 px-4 py-2 border rounded-lg font-medium' value={formData.college} type="college" id="college" placeholder="AIIMS, Patna" onChange={handleChange} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium' htmlFor="mobile">Mobile No.</label>
                        <input required className='text-gray-700 px-4 py-2 border rounded-lg font-medium' value={formData.phone} type="text" id="phone" placeholder="9132456778" onChange={handleChange} pattern="[6789][0-9]{9}" title="Please enter valid phone number" />
                    </div>
                    <div className='flex flex-col w-full'>
                        <button className='bg-yellow-500 text-gray-900 py-2 my-3 rounded-lg font-semibold' type="submit">Add</button>
                    </div>
                </form>

                <div>
                    <h1 className='text-xl font-semibold text-center'>Persons</h1>
                    <div className='flex flex-col gap-2 p-6'>
                        {peoples.length === 0 ? <div className='text-center'>No persons added.</div> : peoples.map((people) => (
                            <div key={people.id} className='flex justify-between border-gray-200 border p-3 rounded-xl'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-base font-semibold'>Name : {people.name}</h1>
                                    <h2 className='text-sm font-medium'>Email: {people.email}</h2>
                                    <h2 className='text-sm font-medium'>College : {people.college}</h2>
                                    <h2 className='text-sm font-medium'>Mobile No. : {people.phone}</h2>
                                </div>
                                <div className='flex flex-col items-end justify-between'>
                                    <button onClick={() => handleDelete(people.id)} className='text-red-500 cursor-pointer' type="submit"><AiFillDelete size={25} /></button>
                                    <h6 className='text-blue-500 font-semibold'>₹1200</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='py-10 flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem]'>
                    </div>

                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />

                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem]'>

                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-center'>Total</h1>
                    <div className='flex justify-between px-6 py-2'>
                        <h1 className='text-base font-semibold'>Total Persons</h1>
                        <h1 className='text-base font-semibold'>{peoples.length}</h1>
                    </div>
                    <div className='flex justify-between px-6 py-2'>
                        <h1 className='text-base font-semibold text'>Total Amount</h1>
                        {peoples.length < 10 ? <h1 className='text-2xl font-semibold text-green-500'>
                            <span className={`${isPromoCodeApplied && 'line-through text-lg mr-3 text-red-500'}`}>
                                {
                                    peoples.length === 0 ? '₹0' : `₹${peoples.length * 1200}`
                                }
                            </span>
                            <span>
                                {
                                    isPromoCodeApplied && "₹" + discountedPrice
                                }
                            </span>
                        </h1> :
                            <h1 className='text-2xl font-semibold text-green-500'>
                                <span className={`${isPromoCodeApplied && 'line-through text-lg mr-3 text-red-500'}`}>
                                    {
                                        `₹${peoples.length * 1200 - 1200}`
                                    }
                                </span>
                                <span>
                                    {
                                        isPromoCodeApplied && "₹" + discountedPrice
                                    }
                                </span>
                            </h1>
                        }
                    </div>
                </div>

                <div className='px-6'>

                    <div className='flex gap-3 items-center pb-2'>
                        <input checked={tnc} type='checkbox' onChange={() => setTnc(!tnc)} />
                        <label className='text-sm font-medium'>I agree to the <Link to="/legals/terms-of-service" className='text-blue-500'>Terms and Conditions</Link>.</label>
                    </div>
                    <div className='flex gap-3 items-center pb-2'>
                        <input checked={hasPromoCode} onChange={
                            () => {
                                if (hasPromoCode) {
                                    setPromoCode('')
                                    setIsPromoCodeApplied(false);
                                };
                                setHasPromoCode(!hasPromoCode);
                            }
                        } type='checkbox' />
                        <label className='text-sm font-medium'>Have a Promo Code ?</label>
                    </div>
                    {hasPromoCode && <div className='flex gap-3 items-center'>
                        <input value={promoCode} onChange={(e) => setPromoCode((e.target.value).trim(""))} className='text-gray-700 px-2 py-1.5 border rounded-lg font-medium w-[12rem]' type="text" id="promo" placeholder="Enter Promo Code" />
                        <button onClick={handlePromoCode} className='font-medium text-gray-900  bg-yellow-500 rounded-full px-5 py-1.5'>Apply</button>
                    </div>}
                </div>

                <div className='flex flex-col w-full px-6 py-8'>
                    <button onClick={handlePaymentInit} className={`bg-yellow-500 text-gray-900 disabled:bg-yellow-600 py-2.5 my-3 rounded-lg font-semibold`}>Proceed to Pay</button>
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

export default GetPass;