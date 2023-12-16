import React, { useState } from 'react';

const WhyUsCard = (props) => {
  const [showMore, setShowMore] = useState(false);

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  const getDescription = () => {
    if (showMore) {
      return props.description;
    } else {
      return props.description.split(' ').slice(0, 25).join(' ') + '...';
    }
  };

  return (
    <div className="bg-[#F0F2F6] p-8 mb-8 rounded-lg shadow-md text-[#164154]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col justify-center md:ml-8">
          <div className="text-xl md:text-3xl font-bold mb-4">{props.heading}</div>
          <div className="text-justify text-md md:text-lg">
            {getDescription()}
            <button
              onClick={toggleDescription}
              className="text-blue-500 cursor-pointer focus:outline-none"
            >
              {showMore ? ' Show Less' : ' Show More'}
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center mt-4 md:mt-0">
          <img
            className="max-w-full h-[250px] md:h-[400px] w-full md:w-[525px] object-cover rounded-md"
            src={props.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default WhyUsCard;
