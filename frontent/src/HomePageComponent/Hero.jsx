import React from 'react';
import hero from "../../SageMain/hero.png";
import Services from "./Services";
import WhyUs from "./WhyUs";
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import MovingComponent from 'react-moving-text';
import IconBtn from '../components/common/IconBtn';
import HowTravelChange from './HowTravelChange';

const boxVariants = {
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0, x: 200 },
};

const Hero = () => {

  return (
    <div className='w-full'>
      <div className='relative'>
        <img src={hero} className='h-[500px] object-cover md:h-full md:w-full md:object-contain' alt='Hero Image' />
        <div className='absolute top-[49%] left-[50%] md:left-[40%] md:top-[30%] lg:left-[30%] lg:top-[41%] lg:flex lg:flex-col lg:gap-[20px] transform -translate-x-1/2 -translate-y-1/2'>
          <MovingComponent
            type="slideInFromBottom"
            duration="1000ms"
            delay="1s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            <h1 className='heading text-left flex gap-[10px] font-bold text-[23px] md:text-[70px] lg:ml-[5px] lg:flex lg:items-baseline lg:gap-4 lg:leading-[90px] lg:text-7xl mb-[20px] text-white lg:font-extrabold leading-tight'>
              Ohai <span className='text-[#bcad3c] md:text-[#bcad3c]'>Sanchari </span>!
            </h1>
          </MovingComponent>

          <div className='mt-[0px] text-[15px] md:block md:text-[13px] md:ml-[10px] md:w-[300px] w-[300px] text-gray-800  lg:w-full lg:leading-[40px] lg:font-semibold lg:tracking-tight lg:text-[25px] lg:block lg:text-white'>
            <MovingComponent
              type=""
              duration="1000ms"
              delay="3s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
            >
              <div className="hidden md:block">
                <p className='text-justify tracking-wider lg:text-[26px]'>
                I am SAGE, the author of your offbeat journeys.
              </p>
              <p className='lg:text-[26px]'>As I narrate your fictional bucket list into reality, let’s go on more</p>
              <p className='lg:text-[26px]'>adventures, be around good people, learn new things and grow!</p>
              </div>
              <div className="md:hidden">

              <div className=" relative max-w-[320px] rounded-md md:hidden bg-white opacity-40 h-[160px]">
              </div>
              <p className='text-justify absolute top-[55px] tracking-wider p-2  text-[#164154] font-semibold text-[16px] '>
                I am SAGE, the author of your offbeat journeys.As I narrate your fictional bucket list into reality, let’s go on moreadventures, be around good people, learn new things and grow!
                </p>
              </div>
            </MovingComponent>
          </div>
          <div className='mt-[30px]'>
            <button className="bg-[#BCAD3C] text-white h-[40px] w-[220px] md:h-[60px] md:w-[230px] font-bold md:font-bold rounded-md uppercase mt-4 text-[20px]">
              <a href='/login'>
                Start Journey
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className='mt-[30px]'><Services /></div>
      <div><WhyUs /></div>
      <div><HowTravelChange></HowTravelChange></div>
    </div>
  );
};

export default Hero;
