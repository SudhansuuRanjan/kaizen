import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EventDetails from '../components/EventDetails';

const Events = () => {

  const [modal, setModal] = useState(false);

  const categories = [
    {
      name: "All",
      id: 0,
    },
    {
      name: "Literary",
      id: 1,
    },
    {
      name: "Cultural",
      id: 2,
    },
    {
      name: "Arts",
      id: 3,
    },
    {
      name: "Informals",
      id: 4,
    },
    {
      name: "Sports",
      id: 5,
    },
    {
      name: "Academics",
      id: 6,
    }
  ]

  const events = [
    {
      name: "CodeJam",
      category: "Informals",
      id: 0,
      description: "CodeJam is a coding competition where you can showcase your coding skills and win exciting prizes. It is a 24-hour long event where you can code in any language of your choice. The top 3 teams will be awarded with exciting prizes.",
      image: "https://images.unsplash.com/photo-1617722532539-1b2f2e1b2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      date: "21st March 2021",
      time: "10:00 AM",
      venue: "Online",
      rules: "CodeJam is a coding competition where you can showcase your coding skills and win exciting prizes. It is a 24-hour long event where you can code in any language of your choice. The top 3 teams will be awarded with exciting prizes.",
      rulebook: "https://drive.com",
    },
    {
      name: "CodeJam",
      category: "Informals",
      id: 0,
      description: "CodeJam is a coding competition where you can showcase your coding skills and win exciting prizes. It is a 24-hour long event where you can code in any language of your choice. The top 3 teams will be awarded with exciting prizes.",
      image: "https://images.unsplash.com/photo-1617722532539-1b2f2e1b2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      date: "21st March 2021",
      time: "10:00 AM",
      venue: "Online",
      rules: "CodeJam is a coding competition where you can showcase your coding skills and win exciting prizes. It is a 24-hour long event where you can code in any language of your choice. The top 3 teams will be awarded with exciting prizes.",
      rulebook: "https://drive.com",
    },
  ]

  return (
    <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 flex relative">
      {modal && <EventDetails setModal={setModal} />}
      <div className="flex bg-[url('https://zeevector.com/wp-content/uploads/Old-Paper-Background-Free-768x1161.png')] bg-no-repeat h-[90vh] w-[15rem] justify-between relative">
        <img src="images/list2.png" alt="list2" className='z-20' />
        <div className='h-fit text-gray-800'>
          <img src="images/list1.png" className='z-30' alt="list2" />
          <h1 className='text-3xl font-bold underline underline-offset-4 decoration-orange-600 decoration-wavy pl-6 pt-6'>
            Events
          </h1>
          <ul className='flex flex-col gap-4 mt-8 pl-6'>
            {
              categories.map((category) => (
                <li key={category.id}><button className='px-6 py-2 hover:bg-pink-700 hover:bg-opacity-30 rounded-xl w-[10rem] text-left hover:text-pink-700 font-semibold'>{category.name}</button></li>
              ))
            }
          </ul>
          <img src="images/list1.png" className='z-30 absolute bottom-0 ml-[-5%]' alt="list2" />
        </div>
        <img src="images/list2.png" alt="list2" className='z-20' />
      </div>

      <div className='w-[100%] flex'>
        <div className="bg-[#E9CC7E] border-img  bg-opacity-10 backdrop-blur-sm rounded-xl m-8 mt-12 w-[100%] bg-center">
          <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
            <p className='text-2xl font-bold text-yellow-200 px-5'>Event Type</p>
          </div>


          <div className='flex items-center flex-wrap justify-evenly gap-2 mt-16'>

            <div className='flex relative items-center justify-between flex-col'>
              <img src="images/card-bg.png" alt="card" className='w-[20rem] h-[22rem]' />
              <div className='absolute top-10'>
                <img src="https://images.news18.com/ibnlive/uploads/2022/08/salaar-prabhas-16605537533x2.jpg?impolicy=website&width=510&height=356" alt="poster" className='w-[16.5rem] h-[11rem] m-[auto] rounded-sm' />
                <p className='text-center font-semibold text-2xl text-yellow-400 pt-2'>Code Jam</p>
                <p className='text-center font-semibold  text-red-600 pt-0'>Informals</p>
              </div>
              <button className='relative flex items-center justify-center mt-[-4.5rem]'>
                <img src="images/btn.png" alt="btn" className='h-[6rem] w-[15rem]' />
                <p className='absolute text-red-900 font-bold text-xl'>Know More</p>
              </button>
            </div>

            <div className='flex relative items-center justify-between flex-col'>
              <img src="images/card-bg.png" alt="card" className='w-[20rem] h-[22rem]' />
              <div className='absolute top-10'>
                <img src="https://images.news18.com/ibnlive/uploads/2022/08/salaar-prabhas-16605537533x2.jpg?impolicy=website&width=510&height=356" alt="poster" className='w-[16.5rem] h-[11rem] m-[auto] rounded-sm' />
                <p className='text-center font-semibold text-2xl text-yellow-400 pt-2'>Code Jam</p>
                <p className='text-center font-semibold  text-red-600 pt-0'>Informals</p>
              </div>
              <button className='relative flex items-center justify-center mt-[-4.5rem]'>
                <img src="images/btn.png" alt="btn" className='h-[6rem] w-[15rem]' />
                <p className='absolute text-red-900 font-bold text-xl'>Know More</p>
              </button>
            </div>

            <div className='flex relative items-center justify-between flex-col'>
              <img src="images/card-bg.png" alt="card" className='w-[20rem] h-[22rem]' />
              <div className='absolute top-10'>
                <img src="https://images.news18.com/ibnlive/uploads/2022/08/salaar-prabhas-16605537533x2.jpg?impolicy=website&width=510&height=356" alt="poster" className='w-[16.5rem] h-[11rem] m-[auto] rounded-sm' />
                <p className='text-center font-semibold text-2xl text-yellow-400 pt-2'>Code Jam</p>
                <p className='text-center font-semibold  text-red-600 pt-0'>Informals</p>
              </div>
              <button onClick={() => {
                setModal(true);
                document.body.style.overflow = 'hidden';
              }} className='relative flex items-center justify-center mt-[-4.5rem]'>
                <img src="images/btn.png" alt="btn" className='h-[6rem] w-[15rem]' />
                <p className='absolute text-orange-200 font-semibold text-xl font-mono'>Know More</p>
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Events