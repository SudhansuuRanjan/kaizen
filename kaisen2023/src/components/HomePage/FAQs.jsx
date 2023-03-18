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
            question: 'What is the theme of the event lorem is the?',
            answer: 'The theme of the event is "The Future of Art". Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sequi corporis hic similique, eos optio voluptatum voluptates voluptatem tenetur perspiciatis?',
            color: "blue",
        },
        {
            question: 'What is the theme of the event?',
            answer: 'The theme of the event is "The Future of Art". Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sequi corporis hic similique, eos optio voluptatum voluptates voluptatem tenetur perspiciatis?',
            color: "red",
        },
    ]

    return (
        <div className="relative bg-no-repeat min-h-fit bg-center bg-cover w-[100%] bg-[url('https://ragam.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftheyyam%202.98e82130.png&w=1080&q=75')]">
            <div className='flex lg:flex-row md:flex-row flex-col justify-between lg:items-start md:items-start items-center absolute w-[100%] lg:top-[20%] md:top-[20%] top-[10%] z-0 h-[32rem]'>
                <img src="coin.png" alt="wheel" data-aos="fade-up-right" className='lg:h-[17rem] md:h-[15rem] h-[15rem] brightness-75' />
                <img src="hat.png" alt="hat" data-aos="zoom-in-up" className='lg:h-[22rem] md:h-[20rem] h-[15rem] self-end brightness-75' />
                <img src="map.png" alt="cpmpass" data-aos="fade-up-left" className='lg:h-[17rem] md:h-[15rem] h-[15rem] brightness-75' />
            </div>

            <div className='flex flex-col bg-opacity-20 backdrop-blur-0 rounded-[2rem] lg:w-[70%] w-[90%] m-auto z-[1999999]'>
                <h3 className='text-center font-bold text-4xl pt-20 text-yellow-500 decoration-red-500 underline underline-offset[1px]'>FAQs</h3>
                <div className='flex flex-col items-center justify-center py-24'>
                    {
                        faqs.map((faq, index) => (
                            <FAQIems key={index} faq={faq} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default FAQs