import React, { useState } from 'react'

const FAQIems = ({ faq }) => {

    // state to store the active faq item
    const [active, setActive] = useState(false)

    return (
        <div className='lg:w-[45rem] md:w-[80%] w-[90%] text-lg overflow-hidden h-fit my-5'>
            <div className='flex gap-4 items-center cursor-pointer' onClick={() => setActive((e) => !e)}>
                <img src={`https://archive.hackmit.org/2020/assets/img/${faq.color}_arrow.svg`} alt="ssd" className={`h-5 transition-all ease-in-out delay-75 ${!active && 'rotate-90'}`} />
                <h3 className={`text-left font-bold text-2xl pt-2 text-${faq.color}-400 hover:text-sky-400`}>{faq.question}</h3>
            </div>
            <div className={`transition-all ease-in-out delay-100 ml-8 mt-4 ${active && 'hidden'}`}>
                <p className={`text-white transition delay-300 text-lg ease-in-out`}>{faq.answer}</p>
            </div>
        </div>
    )
}

export default FAQIems