import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';
import { useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';



const EventSwiper = () => {

    const [active, setActive] = useState(null)
    const swiperRef = useRef();

    const langs = [
        {
            name: 'Angular Js',
            logo: 'logo-angular',
            level: 80,
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vitae harum dolorum autem corrupti? Eos! Lorem ipsum dolor sit amet.',
            color: "hue-rotate-[240deg]"
        },
        {
            name: 'React Js',
            logo: 'logo-react',
            level: 70,
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vitae harum dolorum autem corrupti? Eos! Lorem ipsum dolor sit amet.',
            color: "hue-rotate-[310deg]"
        },
        {
            name: 'Vue Js',
            logo: 'logo-vue',
            level: 60,
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vitae harum dolorum autem corrupti? Eos! Lorem ipsum dolor sit amet.',
            color: "hue-rotate-[289deg]"
        },
        {
            name: 'Node Js',
            logo: 'logo-nodejs',
            level: 50,
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vitae harum dolorum autem corrupti? Eos! Lorem ipsum dolor sit amet.',
            color: "hue-rotate-[120deg]"
        },
        {
            name: "CSS",
            logo: 'logo-css3',
            level: 90,
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vitae harum dolorum autem corrupti? Eos! Lorem ipsum dolor sit amet.',
            color: "hue-rotate-[360deg]"
        },
        {
            name: 'HTML',
            logo: 'logo-html5',
            level: 90,
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vitae harum dolorum autem corrupti? Eos! Lorem ipsum dolor sit amet.',
            color: "hue-rotate-[20deg]"
        },
        {
            name: 'Javascript',
            logo: 'logo-javascript',
            level: 90,
            desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi vitae harum dolorum autem corrupti? Eos! Lorem ipsum dolor sit amet.',
            color: "hue-rotate-[210deg]"
        }
    ]


    return (
        <div>
            <div className='flex overflow-hidden justify-center items-center mt-20'>
                <div className="flex max-w-5xl items-center justify-center m-auto">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={(cur) => setActive(cur.realIndex)}
                        loop={true}
                        centeredSlides={true}
                        speed={800}
                        autoplay={{
                            delay: 3000,
                        }}
                    >


                        {
                            langs.map((lang, index) => (
                                <SwiperSlide key={index}>
                                    <div className='h-96 flex'>
                                        <div className={`card 
                                    ${active === index && 'card-active'} to-red-600/40 ${lang.color} border-red-600`}>
                                            <div className='logo'>
                                                <ion-icon name={lang.logo}></ion-icon>
                                            </div>
                                            <h2 className='text-3xl mt-2 font-semibold'>{lang.name}</h2>
                                            <p className='para'>{lang.desc}</p>
                                            {/* <div className={`bg-${lang.logo}-600 skill-level`}>
                                                {lang.level}%
                                            </div> */}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
            </div>

            <div className='flex justify-center items-center gap-20 my-10'>
                <button onClick={() => swiperRef.current?.slidePrev()} className='text-3xl text-white bg-gray-800 items-center justify-center flex rounded-full p-4'>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button onClick={() => swiperRef.current?.slideNext()} className='text-3xl text-white bg-gray-800 items-center justify-center flex rounded-full p-4'>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
            </div>
        </div>
    )
}

export default EventSwiper