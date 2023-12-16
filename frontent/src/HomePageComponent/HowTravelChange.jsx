import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import howtravel from "../../SageMain/howtravel.jpg";
import one from "../../SageMain/one.png";
import two from "../../SageMain/two.png";
import three from "../../SageMain/three.png";

// Initialize Swiper
SwiperCore.use([Navigation, Pagination]);

const HowTravelChange = () => {
  const data = [
    {
      id: 1,
      heading: 'Personal growth:',
      description: 'Travel exposes you to new cultures, challenges, and opportunities. It helps you discover your passions, interests, and purpose in life. It makes you more open-minded, adaptable, and resilient.',
      image: one,
    },
    {
      id: 2,
      heading: 'Connection:',
      description: 'Travel brings you closer to yourself and others. It helps you form meaningful relationships with people from different backgrounds and perspectives. It fosters a sense of belonging and community.',
      image: two,
    },
    {
      id: 3,
      heading: 'Transformation:',
      description: 'Travel changes you in profound and lasting ways. It enriches your mind, body, and soul. It inspires you to live more fully and authentically. It empowers you to create positive change in the world.',
      image: three,
    },
  ];

  const isMobileOrTablet = window.innerWidth <= 768;

  return (
    <div className="relative">
      <img src={howtravel} className='object-cover brightness-50' alt="" />

      <div className="absolute inset-0 text-white">
        <div className="w-full md:w-[720px] px-4 mx-auto md:flex md:flex-col md:justify-center md:items-center">
          <h1 className="text-2xl md:text-4xl mt-[10px] font-bold text-center mb-3 md:mb-10  md:mt-[30px]">
            How Travel Can Change Your Life
          </h1>

          {isMobileOrTablet ? (
            // Swiper for Mobile
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              
              pagination={{ clickable: true }}
              className="mb-8"
            >
              {data.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="flex flex-col items-center gap-4 mt-[20px]">
                    <p className='text-justify'>
                      <span className='text-lg md:text-2xl font-bold text-[#ebd638]'>{slide.heading}</span> {slide.description.split(' ').slice(0, 20).join(' ')}...
                    </p>
                    <img src={slide.image} alt={`Slide ${slide.id}`} className="h-[70px] max-w-[250px]" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            // Non-Swiper version for Larger Screens
            <div className="hidden md:block">
              <div className="md:flex md:flex-col md:gap-8 md:justify-center md:items-center md:mt-[30px]">
                {data.map((slide) => (
                  <div key={slide.id} className="flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 md:gap-8 ">
                    <p className='text-justify'>
                      <span className='text-lg md:text-2xl font-bold '>{slide.heading}</span> {slide.description}
                    </p>
                    <img src={slide.image} alt={`Slide ${slide.id}`} className="md:max-w-[250px]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className=" hidden md:flex md:justify-center md:items-center md:mt-[100px] mr-[470px]">
            <button className=' h-[70px] w-[250px] rounded-md border border-yellow-5 font-bold '>
                LEARN MORE
            </button>
        </div>
      </div>
    </div>
  );
};

export default HowTravelChange;
