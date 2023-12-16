import React from 'react';

const ServiceCard = (props) => {
  return (
    <div className='select-none'>
      <div className='hover:shadow-xl shadow-xl ml-[40px] flex select-none rounded-xl p-4 md:p-6 flex-col justify-center items-center bg-[#164154]  w-72 md:w-80 max-h-80'>
        <h1 className='text-[70px] md:text-[70px] text-[#bcad3c] mt-1 md:mt-3'>{props.image}</h1>
        <h1 className='heading font-semibold text-white text-left text-xl md:text-2xl mt-4 md:mt-6 text-blue-950'>{props.name}</h1>
        <p className='text-white text-sm md:text-base p-2 md:p-4 text-center'>{props.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
