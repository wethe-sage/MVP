import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import {
  FaBed,
  FaParking,
} from 'react-icons/fa';
import { MdRoomService } from "react-icons/md";
import { GiMeal,GiVacuumCleaner } from "react-icons/gi";
import { ImPowerCord } from "react-icons/im";

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://imgs.search.brave.com/wQq40-OKU-s8cUZq2b6wIiLApJOJNhxl7qetbWZoPQ4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/ODgxNjY5L3Bob3Rv/L2hvdXNlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz0zZmM4/Z3IySG9MUXdnSUpu/RTU2OFNwdURqNHRn/a1FlTUt1bXRDTW52/UG9BPQ'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
          ₹ 
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-IN')
              : listing.regularPrice.toLocaleString('en-IN')}
          </p>
          <div className='text-slate-700 flex flex-wrap gap-5'>
            
            <div className="font-bold text-red-500 text-sm">
            
              {listing.parking = true
                ? <span className='text-xl'><FaParking/></span>
                : ""}
            </div>
            <div className="font-bold text-red-500 text-sm">
              {listing.food= true
                ? <span className='text-xl'><GiMeal></GiMeal></span>
                : ``}
            </div>
            <div className="font-bold text-red-500 text-sm">
              {listing.roomService= true
                ? <span className='text-xl'><MdRoomService/></span>
                : ``}
            </div>
            <div className="font-bold text-red-500 text-sm">
              {listing.powerBackup= true
                ? <span className='text-xl'><ImPowerCord/></span>
                : ``}
            </div>
            <div className="font-bold text-red-500 text-xl">
              {listing.houseKeeping= true
                ? <span className='text-xl'><GiVacuumCleaner></GiVacuumCleaner></span>
                : ``}
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
}