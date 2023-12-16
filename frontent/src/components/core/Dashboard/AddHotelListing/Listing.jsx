import { EffectFade, Navigation } from 'swiper/core'; // Import specific modules from swiper/core
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade'; // Import the specific styles for the EffectFade module
import 'swiper/css/navigation'; // Import the specific styles for the Navigation module
import 'swiper/css/bundle';
import { FaBed, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaShareAlt } from 'react-icons/fa';
import { MdRoomService } from "react-icons/md";
import { GiMeal, GiVacuumCleaner } from "react-icons/gi";
import { ImPowerCord } from "react-icons/im";
import { useSelector } from 'react-redux';

export default function Listing() {
  Swiper.use([EffectFade, Navigation]); // Use the specific Swiper modules

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper modules={[EffectFade]} effect="fade" navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer mt-[50px]'>
            <FaShareAlt
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />

            </div>
          {copied && (
            <p className='fixed top-[27%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2'>
            <div className='flex flex-col gap-0'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ₹{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
            </p>
            <p className='flex items-center align-baseline mt-6 gap-2 text-slate-600  text-md'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address} <span className=' text-red-600 font-bold'>||</span> <p>{listing.distanceFromFamousLocation}</p> 
            </p>
            </div>
            <div className='flex gap-4'> 
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    Book now and get 10% off
                </p>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${listing.address}`}
                    target='_blank'
                    rel='noreferrer'
                    className='bg-slate-500 text-white px-4 py-2 rounded-md'
                >
                    <FaMapMarkedAlt className='inline-block mr-2' />
                    View on map
                </a>
           
              </div>
              <div className=" flex gap-2">
              <p className='bg-green-900 flex gap-1 justify-center items-center w-full max-w-[200px] text-white text-center  rounded-md'>
                   <span className=''>Regular Price</span> ₹{listing.regularPrice} 
              </p>
              
              {listing.offer && (
                <div className=" flex gap-2">
                    <p className='bg-green-900 flex gap-1 justify-center items-center w-full max-w-[200px] text-white text-center rounded-md'>
                     <span>Discounted Price </span>
                     ₹{listing.discountPrice} 
                    </p>
                <p className=' text-black text-center p-1 rounded-md'>
                  ₹{+listing.regularPrice - +listing.discountPrice} OFF
                </p>
                
                </div>
                
              )}
              </div>
            <div className='flex flex-col md:flex  gap-0 md:align-baseline md:items-start md:justify-center'>
            <span className='font-semibold mt-2  text-black overflow-hidden'>Description : </span>
              <textarea
                className='md:w-[700px] h-[130px] max-h-[150px] rounded-lg p-2 bg-transparent '
                value={listing.description}
                readOnly
                >                
                </textarea>
            </div> 
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
                  <span className='text-xs'>( Max 2 person per room)</span>
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.food ?<span className='flex gap-1'><GiMeal className='text-lg' />Complementary food</span> : ''}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
               
                {listing.parking ? <span className='flex gap-1'> <FaParking className='text-lg' />Parking spot</span> : ''}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.roomService ? <span className='flex gap-1'><MdRoomService className='text-lg' /> Room service</span> : ''}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.powerBackup ? <span className='flex gap-1'><ImPowerCord className='text-lg' /> Power Backup</span> : ''}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.houseKeeping ? <span className='flex gap-1'><GiVacuumCleaner className='text-lg' />House keeping</span> : ''}
              </li>

            </ul>

            <button className=' bg-gray-500 h-[40px] rounded-lg mt-[30px] text-white font-bold' >
                Book now
            </button>           
          </div>
          <div>         
          </div>
        </div>
      )}
    </main>
  );
}