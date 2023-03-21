import React from 'react'
import { Link } from 'react-router-dom'

const PurchasedEventItem = ({ data }) => {
    return (
        <div className='w-[100%] m-auto'>
            <div className="flex flex-col justify-center w-[100%] bg-[#111317] shadow-xl rounded-2xl m-auto">
                <div className='p-4 flex justify-between items-center w-[100%]'>
                    <Link to={`/events/${data.eventId}`} className='w-16 h-10 overflow-hidden rounded'>
                        <img src={data.image} alt="" className='w-16 h-auto' />
                    </Link>
                    <div className='w-[20rem] flex-1 ml-2'>
                        <Link to={`/events/${data.eventId}`} className='font-semibold md:text-2xl lg:text-2xl text-xl text-gray-400'>{data.name}</Link>
                    </div>
                    <div className='flex-0 px-5 lg:px-10 md:px-10'>
                        <p className='text-center font-semibold  text-red-500'>{data.members.length} members</p>
                    </div>
                    <div className='w-[4.5rem] ml-2 flex-0 '>
                        <p className='text-center font-semibold text-yellow-500'>₹ {data.price}</p>
                    </div>
                </div>
                <div className='flex flex-col px-4'>
                    {
                        data.members.length > 0 && <p className='text-gray-400 font-semibold pt-3'>Members</p>
                    }
                    <div className={`flex flex-col gap-2 ${data.members.length > 0 && 'py-4'}`}>
                        {
                            data.members.map((member, id) => (
                                <div key={id} className="flex gap-2">
                                    <input type="text" value={member.name} disabled className='rounded-lg px-3 bg-gray-800 py-1 flex-1 w-[40%]' />
                                    <input className='rounded-lg px-3 bg-gray-800 py-1 flex-1' type="email" value={member.email} disabled />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PurchasedEventItem