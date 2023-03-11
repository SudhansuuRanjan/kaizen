import React from 'react'

const PurchasedEventItem = ({ data }) => {
    return (
        <div className='w-[100%] m-auto'>
            <div className="flex flex-col justify-center w-[100%] bg-[#E9CC7E] bg-opacity-10 backdrop-blur-sm border border-yellow-300 rounded-2xl m-auto">
                <div className='p-3 flex justify-between items-center w-[100%]'>
                    <div className='w-16 h-10 overflow-hidden rounded'>
                        <img src={data.image} alt="" className='w-16 h-auto' />
                    </div>
                    <div className='w-[20rem] flex-1 ml-2'>
                        <p className='font-semibold md:text-2xl lg:text-2xl text-xl text-yellow-400'>{data.name}</p>
                    </div>
                    <div className='flex-0 px-5 lg:px-10 md:px-10'>
                        <p className='text-center font-semibold  text-red-500'>{data.participants} members</p>
                    </div>
                    <div className='w-[4.5rem] ml-2 flex-0 '>
                        <p className='text-center font-semibold text-yellow-500'>₹ {data.price}</p>
                    </div>
                </div>
                <div className='flex flex-col px-3 pb-3 '>
                    <p className='font-semibold  text-red-500 pb-2'>Members:</p>
                    <div className='flex flex-col gap-2'>
                        {
                            data.members.map((member, id) => (
                                <div key={id} className="flex gap-2">
                                    <input type="text" value={member.name} disabled className='rounded-lg px-3 py-1 flex-1 w-[40%]' />
                                    <input className='rounded-lg px-3 py-1 flex-1' type="email" value={member.email} disabled />
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