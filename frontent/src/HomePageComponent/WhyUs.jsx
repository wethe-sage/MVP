import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.css'; // Make sure to import the bundle CSS

import WhyUsCard from './WhyUsCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import why from "../../SageMain/why.png";

// Install Swiper modules
SwiperCore.use([Scrollbar, A11y, Autoplay]);

const WhyUs = () => {
  const Data = [
    {
      id: "1",
      heading: "Personal growth and connection:",
      description: "We design our itineraries based on the experiences of your favourite travel influencers, who will guide you along the way. You can learn new skills, discover new passions, and find new perspectives. You can also connect with like-minded people who share your love for travel and fun.",
      image: why
    },
    {
      id: "2",
      heading: "Transformative travel:",
      description: "We make travel a meaningful and educational experience for you. We believe that every destination is a classroom and every adventure a life lesson. We help you explore, learn, and grow with us.",
      image: why
    },
    {
      id: "3",
      heading:"Escape and empowerment:",
      description:"We help you escape the stress of academics and social media and empower you to live your best life. You can challenge yourself, step out of your comfort zone, and grow as a person. You can also make a positive impact on the communities and environments you visit.",
      image: why
    },
    {
      id: "4",
      heading:"Curated experiences:",
      description:"We carefully select and customize our travel experiences to suit your needs and preferences. You can choose from a variety of themes, such as offbeat travels, solo-travel, competitions, festivals, and events. You can also create your own itinerary with our help.",
      image: why
    }
  ];

  const isMobileOrTablet = window.innerWidth <= 768;

  return (
    <div className="text-[#164154] bg-white p-8">
      <div className="mb-8 flex flex-col gap-y-7">
        <h1 className="text-3xl font-bold text-center">Why Choose SAGE?</h1>
        <p className="text-lg text-center">At SAGE, we believe that travel is more than just a vacation. It’s a way to transform yourself and the world around you. That’s why we offer you:</p>
      </div>

      <div className="swiper-container">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Scrollbar, A11y]}
          scrollbar={{ draggable: true }}
        >
          {Data.map((card) => (
            <SwiperSlide key={card.id}>
              <WhyUsCard
                heading={card.heading}
                description={card.description}
                image={card.image}
                showMore={isMobileOrTablet}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col justify-center items-center mx-auto mt-8">
        <p className='text-lg text-center mx-auto'>
          Join SAGE today and discover the power of transformative travel. Where every destination is a classroom and every adventure a life lesson
        </p>

        <button className="bg-[#BCAD3C] h-[50px] w-[200px] mt-[16px] rounded-md uppercase text-white md:h-[80px] md:w-[300px] md:rounded-md md:mt-4 md:text-[24px]">
          <a href='/login'>
            Join Now
          </a>
        </button>
      </div>
    </div>
  );
};

export default WhyUs;
