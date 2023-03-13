import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';


const EventSwiper = () => {

    return (
        <div className="flex items-center justify-center">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                <SwiperSlide>
                    <img src="https://img.freepik.com/free-photo/top-view-blooming-flowers_23-2148882253.jpg"  alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://img.freepik.com/free-photo/beautiful-flowers-bouquet-with-copy-space_23-2149053793.jpg"  alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://img.freepik.com/free-photo/top-view-blooming-flowers_23-2148882253.jpg"  alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://img.freepik.com/free-photo/top-view-spring-daisies-gerberas_23-2148894214.jpg"  alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://img.freepik.com/free-photo/composition-beautiful-flowers-wallpaper_23-2149057013.jpg"  alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://img.freepik.com/premium-photo/gerbera-flowers-natural-background-colorful-flowers-as-post-card-mother-s-day-8-march-flat-lay_338799-5215.jpg?w=2000" alt="slide_image"  />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://img.freepik.com/free-photo/close-up-multicoloured-gerbera-flowers_23-2148268351.jpg"  alt="slide_image" />
                </SwiperSlide>

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    )
}

export default EventSwiper