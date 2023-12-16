import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import TeamCard from './TeamCard';
import naveen from "../../SageMain/naveen.png"
import vihari from "../../SageMain/vihari.png"
import rohit from '../../SageMain/Rohit.jpg'
import nishu from '../../SageMain/nishu.jpg'
import sagar from "../../SageMain/sagar.jpg"
import priyanshu from "../../SageMain/priyanshu.jpg"
import bhavya from "../../SageMain/bhavya.jpg"

const Team = () => {
  const isMobileOrTablet = window.innerWidth <= 1024;
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const dataTeam = [
    {
      id: 1,
      image: vihari,
      name: 'Vihari',
      url: 'https://www.linkedin.com/in/vihari09/?trk=contact-info',
      designation: 'Co-Founder',
      exp: ' Entrepreneur | Trader',
    },
    {
      id: 2,
      image: naveen,
      name: 'Naveen Anand',
      url: 'https://www.linkedin.com/in/naveen-anand-733022283/?trk=contact-info',
      designation: 'Co-Founder',
      exp: ' Entrepreneur | Vocalist',
    },
    
    {
      id: 3,
      image: rohit,
      name: 'Rohith Thota',
      url: 'https://www.linkedin.com/in/rohith-thota-140b38224/?trk=contact-info',
      designation: 'Co-Founder',
      exp: ' Entrepreneur | Trader',
    },
    {
      id: 4,
      image: nishu,
      name: 'Nishu Agarwal',
      url: 'https://www.linkedin.com/in/nishuagarwal/',
      designation: 'Marketing-Lead',
      exp: 'Branding & Digital Marketing Strategist ',
    },
    {
      id: 5,
      image: sagar,
      name: 'Sagar Tomar',
      url: 'https://www.linkedin.com/in/naveen-anand-733022283/?trk=contact-info',
      designation: 'Content Creator',
      exp:"Photographer | Graphic Designer"
    },
    {
      id: 6,
      image: bhavya,
      name: 'Bhavya Patamsetti',
      url: 'https://www.linkedin.com/in/bhavyapatamsetti/',
      designation: 'Community Manager',
      exp: 'Data Scientist | ML',
    },
    
    {
      id: 7,
      image: priyanshu,
      name: 'Priyanshu Pandey',
      url: 'https://www.linkedin.com/in/priyanshu-pandey-8889r/',
      designation: 'Developer Intern',

    }
    
  ];

  const data = dataTeam.map((item) => (
    <TeamCard
      key={item.id}
      image={item.image}
      name={item.name}
      url={item.url}
      designation={item.designation}
      exp={item.exp}
    />
  ));

  return (
    <>
    {isMobileOrTablet ? (  
    <div className='' >
      <Carousel responsive={responsive}>{data}</Carousel>
    </div>
    ) : ( 
    <div className='rounded-xl  flex flex-row justify-center items-center flex-wrap gap-[80px]'>
    {window.innerWidth > 768 && (
      <div className=' flex flex-row justify-center items-center flex-wrap gap-[130px]'>
        {data}
      </div>
    )}

    </div>
    )}
    </>
  );
};

export default Team;