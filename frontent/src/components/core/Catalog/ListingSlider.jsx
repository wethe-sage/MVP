import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'

import Listing_Card from './Listing_Card';

const ListingSlider = ({ Listings }) => {
  return (
    <>
      {Listings?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={200}
          pagination={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
         
          breakpoints={{
            1024: { slidesPerView: 3 },
          }}
        >
          {Listings?.map((listing, index) => (
            <SwiperSlide key={index}>
              <Listing_Card listing={listing} Height={'h-[250px]'} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Listings Found</p>
      )}
    </>
  );
};

export default ListingSlider;
