import React from 'react'
import FAQIems from './FAQIems'

const FAQs = () => {

    const faqs = [
        {
            question: 'What is the theme of the event?',
            answer: 'The theme of the event is "The Future of Art". Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sequi corporis hic similique, eos optio voluptatum voluptates voluptatem tenetur perspiciatis?',
            color: "yellow",
        },
        {
            question: 'What is the theme of the event?',
            answer: 'The theme of the event is "The Future of Art". Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sequi corporis hic similique, eos optio voluptatum voluptates voluptatem tenetur perspiciatis?',
            color: "red",
        },
        {
            question: 'What is the theme of the event?',
            answer: 'The theme of the event is "The Future of Art". Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sequi corporis hic similique, eos optio voluptatum voluptates voluptatem tenetur perspiciatis?',
            color: "blue",
        },
    ]

    return (
        <div className="">
            <h3 className='text-center font-bold text-4xl pt-16 text-yellow-500 decoration-red-500 underline underline-offset[1px]'>FAQs</h3>
            <div className='flex flex-col items-center justify-center py-20'>
                {
                    faqs.map((faq, index) => (
                        <FAQIems key={index} faq={faq} />
                    ))
                }
            </div>
        </div>
    )
}

export default FAQs