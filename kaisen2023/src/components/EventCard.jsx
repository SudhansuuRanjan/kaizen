import React from 'react'

const EventCard = ({ event, setModal, id, setSelectedEvent }) => {
    return (
        <div className='flex relative items-center justify-between flex-col'>
            <img src="images/card-bg.png" alt="card" className='w-[20rem] h-[22rem]' />
            <div className='absolute top-10'>
                <img src={event.image} alt="poster" className='w-[16.5rem] h-[11rem] m-[auto] rounded-sm' />
                <p className='text-center font-semibold text-2xl text-yellow-400 pt-2'>{event.name}</p>
                <p className='text-center font-semibold  text-red-600 pt-0'>{event.category}</p>
            </div>
            <button onClick={() => {
                setModal(true);
                setSelectedEvent(id);
                document.body.style.overflow = 'hidden';
            }} className='relative flex items-center justify-center mt-[-4.5rem]'>
                <img src="images/btn.png" alt="btn" className='h-[6rem] w-[15rem]' />
                <p className='absolute text-yellow-300 font-semibold text-xl font-mono'>Know More</p>
            </button>
        </div>
    )
}

export default EventCard