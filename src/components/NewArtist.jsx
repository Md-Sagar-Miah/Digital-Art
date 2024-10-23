"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import Link from 'next/link';

const NewArtist = ({ newArtits }) => {
    return (
        <section className='mx-1 sm:mx-4 md:mx-8 lg:mx-20 mt-3'>
            <h1 className=' text-4xl text-red-500 font-bold italic border-b-4 border-black w-fit p-2 m-auto animate-bounce'>NEWEST ARTISTS</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="swiper2"
            >
                {
                    newArtits.map((user, index) => {
                        return <SwiperSlide key={index} className='swiper-slide2 overflow-hidden'>
                            <Link href={`/artists/profile?id=${user.id}`}><img className=' ' src={user.img} alt='img' /> </Link>
                        </SwiperSlide>


                    })
                }

            </Swiper>
        </section>
    );
}

export default NewArtist
