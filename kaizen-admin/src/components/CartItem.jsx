import React, { useState } from 'react'

const CartItem = ({ data }) => {
    const [members, setMembers] = useState(data.members);
    const [formdata, setFormdata] = useState({
        name: "",
        email: ""
    })

    const handleChange = (e) => {
        setFormdata((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const addMember = (e) => {
        e.preventDefault();
        if (formdata.name === "" || formdata.email === "") return;

        data.members.push(formdata);
        setMembers(data.members);
        setFormdata({
            name: "",
            email: "",
            id: String(data.members.length + 1)
        })
    }

    const deleteMember = (id) => {
        // console.log(id);
        const newMembers = members.filter((member) => member.id !== id);
        data.members = newMembers;
        setMembers(newMembers);
    }

    return (
        <div className='w-[100%] m-auto'>
            <div className="flex flex-col justify-center w-[90%] bg-[#E9CC7E] bg-opacity-10 backdrop-blur-sm border border-yellow-300 rounded-2xl m-auto">
                <div className='p-3 flex justify-between items-center w-[100%]'>
                    <div className='w-16 h-10 overflow-hidden rounded'>
                        <img src={data.image} alt="" className='w-16 h-auto' />
                    </div>
                    <div className='w-[20rem] flex-1 ml-2'>
                        <p className='font-semibold text-2xl text-yellow-400'>{data.name}</p>
                    </div>
                    <div className='flex-0 px-10'>
                        <p className='text-center font-semibold  text-red-500'>{data.participants} members</p>
                    </div>
                    <div className='w-[4.5rem] ml-2 flex-0'>
                        <p className='text-center font-semibold  text-red-500'>₹ {data.price}</p>
                    </div>
                    {/* <button className='text-green-400 py-1.5 px-4 bg-green-900 bg-opacity-30 rounded-xl border border-green-400 ml-2'>
                        + Add Members
                    </button> */}
                    <button className='text-red-600 py-1.5 px-4 bg-red-900 bg-opacity-30 rounded-xl border border-red-600 ml-2'>
                        Delete
                    </button>
                </div>

               <div className={data.participants != 1 && 'py-2'}>
                 {
                    data.members.length < data.participants - 1 &&
                    <form onSubmit={addMember} >
                        <div className='text-sm flex items-center px-3 max-w-lg'>
                            <input
                                type="text"
                                id="name"
                                value={formdata.name}
                                className={
                                    'mb-2 py-2 px-3 w-[10rem]  focus:outline-none focus:border-pink-500 rounded-lg bg-yellow-500 bg-opacity-20'
                                }
                                onChange={handleChange}
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                id="email"
                                value={formdata.email}
                                className={
                                    'mb-2 py-2 px-3  focus:outline-none focus:border-pink-500 rounded-lg w-[12rem] ml-2 bg-yellow-500 bg-opacity-20'
                                }
                                onChange={handleChange}
                                placeholder="Email Id"
                            />
                            <button className='text-green-400 py-1.5 px-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-400 ml-2 mb-2' type="submit">Add Member</button>
                        </div>
                    </form>

                }

                {
                    members.slice(0).reverse().map((member, id) => (
                        <div key={id} className='text-sm flex items-center px-3 max-w-lg'>
                            <input
                                type="text"
                                id="name"
                                value={member.name}
                                disabled={true}
                                className={
                                    'mb-2 py-2 px-3 w-[10rem]  focus:outline-none focus:border-pink-500 rounded-lg bg-yellow-500 bg-opacity-20'
                                }
                            />
                            <input
                                type="text"
                                id="email"
                                value={member.email}
                                disabled={true}
                                className={
                                    'mb-2 py-2 px-3  focus:outline-none focus:border-pink-500 rounded-lg w-[12rem] ml-2 bg-yellow-500 bg-opacity-20'
                                }
                            />
                            <button
                                className='text-red-500 py-1.5 px-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-500 ml-2 mb-2'
                                onClick={() => deleteMember(member.id)}
                            >
                                Del Member
                            </button>
                        </div>
                    ))
                }
               </div>

            </div>
        </div>
    )
}

export default CartItem