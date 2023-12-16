import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {FaHandshake} from 'react-icons/fa';
import { MdOutlineSchool, MdOutlineFestival } from 'react-icons/md';
import { AiOutlineSafety } from 'react-icons/ai';
import { BiTrip } from 'react-icons/bi';
import { GiMagnifyingGlass } from 'react-icons/gi';

const Services = () => {
  const data = [
    {
      id: '1',
      image: <GiMagnifyingGlass />,
      name: 'Pick your itinerary',
      description:
        'Choose your travel from the itineraries designed out of experience by your favorite travel Influencer just for you.',
    },
    {
      id: '2',
      image: <BiTrip />,
      name: 'Offbeat Travel',
      description:
        'Ever wondered how 200 km away from the city would be? Brace yourself to explore the uncharted with SAGE, exclusive for your offbeat travels..',
    },
    {
      id: '3',
      image: <FaHandshake />,
      name: 'Build lasting bonds',
      description:
        'Away from parties? SAGE Club is just the right place for all your cheap thrills right from 1 AM drives to Sunset watching, join SAGE Club for more.',
    },
    {
      id: '4',
      image: <AiOutlineSafety />,
      name: 'Safety',
      description:
        'Scared of Solo-Travel? Give yourself a journey that you deserve accompanied by SAGE with utmost safety and fun along the way.',
    },
    {
      id: '5',
      image: <MdOutlineSchool />,
      name: 'Travel Scholarship',
      description:
        'Sign up for upcoming competitions and get a chance to win 100% sponsorships on your next journey.',
    },
    {
      id: '6',
      image: <MdOutlineFestival />,
      name: 'Festivals and Events',
      description:
        'Get ready to witness exciting Indian festivals and events hosted by SAGE and embrace the seasons with the tribe you wish.',
    },
  ];

  const [visibleCards, setVisibleCards] = useState(3);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth <= 1024
  );

  useEffect(() => {
    const updateVisibleCards = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
      setVisibleCards(isMobileOrTablet ? 1 : 3);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, [isMobileOrTablet]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className='bg-white px-4'>
      <div className='select-none md:pt-[50px]'>
        <h1 className='text-[30px]  mb-[30px] heading text-center font-bold md:text-center md:text-[55px] text-[#164154] md:font-extrabold  '>
          What SAGE has for you?
        </h1>
      </div>
      <div>
        {isMobileOrTablet ? (
          <Carousel swipeable={true} draggable={true} responsive={responsive}>
            {data.slice(0, visibleCards).map((item) => (
              <ServiceCard
                key={item.id}
                image={item.image}
                name={item.name}
                description={item.description}
              />
            ))}
          </Carousel>
        ) : (
          <div className='flex flex-col'>
            <div className='rounded-xl bg-white md:p-[7%] flex flex-row justify-center items-center flex-wrap gap-[50px]'>
              {data.slice(0, visibleCards).map((item) => (
                <ServiceCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                />
              ))}
            </div>
            {visibleCards < data.length && (
              <button
                onClick={() => setVisibleCards(visibleCards + 3)}
                className='show-more-button text-right -mt-[80px] mr-[163px]'
              >
                Show more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
