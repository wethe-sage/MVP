import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Listing_Card = ({ listing, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    if (listing && listing.ratingAndReviews) {
      const count = GetAvgRating(listing.ratingAndReviews);
      setAvgReviewCount(count);
    }

    
  }, [listing]);

  if (!listing) {
    return null;
  }
  return (
    <div className="md:w-[400px] bg-white shadow-lg rounded-lg overflow-hidden my-8 p-3">
      <Link to={`/listings/${listing._id}`}>
        <div className="relative">
          <img
            src={listing?.thumbnail}
            alt='listing thumbnail'
            className={`${Height} w-full rounded-t-lg object-cover`}
          />
        </div>
        <div className="p-4 text-black">
          <p className="text-lg font-semibold">{listing?.listingName}</p>
          <p className="text-gray-600">Created by <span>{listing?.creator?.firstName} {listing?.creator?.lastName}</span></p>
          <p className="text-gray-700 mt-2">{listing?.listingDescription}</p>
          <p className='text-gray-700 mt-2'>{listing.duration}</p>
          <div className='flex items-center mt-3'>
            <span className="text-gray-800 mr-2">{avgReviewCount }</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-gray-600 ml-2">{listing?.ratingAndReviews?.length || 0} Ratings</span>
          </div>
          <p className="mt-3 text-lg font-semibold">Rs.{listing?.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Listing_Card;
