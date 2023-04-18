import React, { useState } from 'react'
import { db } from '../../firebase.config'
import { collection, addDoc, writeBatch, doc, setDoc } from 'firebase/firestore'
import { AiFillDelete } from 'react-icons/ai'
import shortid from 'shortid'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const GetPass = () => {

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
    })

    const [peoples, setPeoples] = useState([]);
    const [hasPromoCode, setHasPromoCode] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [tnc, setTnc] = useState(false);
    const [loading, setLoading] = useState(false);


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
        setFormData({
            email: '',
            name: '',
            phone: '',
        })
    }

    const handleDelete = (id) => {
        const newPeoples = peoples.filter((people) => people.id !== id);
        setPeoples(newPeoples);
    }



    const handlePromoCode = (e) => {
        e.preventDefault();
        if (promoCode === "") return;
        if (peoples.length === 0) {
            toast.warn('Please add atleast one person to apply promo code!');
            setIsPromoCodeApplied(false);
            return;
        }


        if (promoCode === 'KAISEN2023') {
            setIsPromoCodeApplied(true);
            setDiscountedPrice((peoples.length * 2390) - ((peoples.length * 2390) * 0.1));
            toast.success('Promo Code Applied! You gave got a discount of 10%');
            return;
        } else if (promoCode === 'KAISENEVENT2023') {
            setIsPromoCodeApplied(true);
            if (peoples.length >= 10) {
                setDiscountedPrice((peoples.length * 2390) - ((peoples.length * 2390) * 0.2));
                toast.success('Promo Code Applied! You gave got a discount of 20%');
                return;
            } else {
                toast.error('Minimum 10 people required to apply this promo code!');
                setIsPromoCodeApplied(false);
                return;
            }
        } else {
            toast.error('Invalid Promo Code!');
            setIsPromoCodeApplied(false);
        }
    }

    const handlePuchase = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (peoples.length === 0) {
            toast.warn('Please add atleast one person to purchase!');
            return;
        }
        if (!tnc) {
            toast.warn('Please accept terms and conditions to purchase!');
            return;
        }

        const docRef = collection(db, 'passes');
        // store PASSES in firestore FOR EACH PEOPLE

        try {
            for (let i = 0; i < peoples.length; i++) {
                const doc = await addDoc(docRef, peoples[i]);
                // console.log("Document written with ID: ", doc.id);
            }
            const res = await axios.post('https://kaizen-api.vercel.app/api/sendPassMail', peoples);
            toast.success('Passes Purchased Successfully! The pass will be sent to your email address shortly.');
        } catch (error) {
            // console.log(error);
            toast.error('Something went wrong! Please try again later. If your money has been debited and you do not receive passes within 15 min, please contact us.');
        }

        setPeoples([]);
        setPromoCode('');
        setHasPromoCode(false);
        setIsPromoCodeApplied(false);
        setDiscountedPrice(0);
        setTnc(false);
        setLoading(false);
    }


    return (
        <div className='bg-black pb-24'>
            <div className='cart-banner'>
                <h1 className='cart-head'>Get Passes</h1>
            </div>
            <div className='lg:w-[37rem] md:w-[32rem] w-[90%] bg-white rounded-2xl text-gray-700 m-auto mt-5'>
                <div className='px-5 py-5'>
                    <h1 className='text-xl font-semibold'>KAISEN AIIMS, Patna</h1>
                    <h2 className='text-base font-medium'>Annual Fest</h2>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem] z-30'>
                    </div>

                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />

                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem] z-30'>
                    </div>
                </div>
                <div className='z-0'>
                    <img className='w-full h-fit mt-[-1rem]' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="event" />
                </div>
                <form onSubmit={handleSubmit} className='flex gap-2 flex-col w-full p-6'>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium' htmlFor="text">Name</label>
                        <input required className='text-gray-700 px-4 py-2 border rounded-lg font-medium' value={formData.name} type="text" id="name" placeholder="Lionel Messi" onChange={handleChange} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-medium' htmlFor="email">Email</label>
                        <input required className='text-gray-700 px-4 py-2 border rounded-lg font-medium' value={formData.email} type="email" id="email" placeholder="lionelmessi@gmail.com" onChange={handleChange} />
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
                                    <h2 className='text-sm font-medium'>Mobile No. : {people.phone}</h2>
                                </div>
                                <div className='flex flex-col items-end justify-between'>
                                    <button onClick={() => handleDelete(people.id)} className='text-red-500 cursor-pointer' type="submit"><AiFillDelete size={25} /></button>
                                    <h6 className='text-blue-500 font-semibold'>$2390</h6>
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
                        <h1 className='text-2xl font-semibold text-green-500'>
                            <span className={`${isPromoCodeApplied && 'line-through text-lg mr-3 text-red-500'}`}>
                                {
                                    peoples.length === 0 ? '$0' : `$${peoples.length * 2390}`
                                }
                            </span>
                            <span>
                                {
                                    isPromoCodeApplied && "$" + discountedPrice
                                }
                            </span>
                        </h1>
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
                        <input value={promoCode} onChange={(e) => setPromoCode((e.target.value).trim(""))} className='text-gray-700 px-4 py-2 border rounded-lg font-medium' type="text" id="promo" placeholder="Enter Promo Code" />
                        <button onClick={handlePromoCode} className='font-medium text-gray-900  bg-yellow-500 rounded-full px-5 py-2'>Apply</button>
                    </div>}
                </div>

                <div className='flex flex-col w-full px-6 py-8'>
                    <button onClick={handlePuchase} className={`bg-yellow-500 text-gray-900 disabled:bg-yellow-600 py-2.5 my-3 rounded-lg font-semibold`}>Proceed to Pay</button>
                </div>
            </div>
        </div>
    )
}

export default GetPass;