import React from 'react'
import Team from './Team'
import ContactUsForm from './ContactUsForm'
import ContactForm from './ContactForm'

const About = () => {
  return (
    <div className=''>  
       
      <div className='text-center'>
        <h1 className='heading text-3xl  sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#164154] mt-[30px] lg:mt-[30px] md:mt-[30px]'>Meet The SAGES</h1>
      </div>
      <div className='mx-4 sm:mx-8 mt-4 sm:mt-8 mb-8 sm:mb-16 md:mb-32 md:pl-[40px] md:mt-[50px] md:pr-[40px] lg:mb-64'>
        <p className='heading text-[#164154] text-center text-base sm:text-lg md:text-2xl'>
          Join us to redefine Indian travel; experience transformative offbeat journeys that fuse adventure and culture; Uncover hidden treasures on the road less taken; Your incredible journey begins here.
        </p>
      </div>
      <div className=' md:mt-[20px] lg:-mt-[150px] mb-[50px]'>
      <Team></Team>
      </div>  

      <div className="">
        <ContactForm></ContactForm>
      </div>
    </div>
  )
}

export default About
