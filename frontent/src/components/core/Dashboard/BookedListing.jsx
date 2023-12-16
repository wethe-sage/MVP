import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserBookedListing } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';

const BookedListing = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [bookedListing, setBookedListing] = useState(null);

  const getBookedListing = async () => {
    try {
      const response = await getUserBookedListing(token);
      const filterPublishListing = response.filter((ele) => ele.status !== 'draft');
      setBookedListing(filterPublishListing);
    } catch (error) {
      console.log('Unable to Fetch Booked Listing');
    }
  };

  useEffect(() => {
    getBookedListing();
  }, []);

  return (
    <div className="text-black p-4 md:p-8 lg:p-12">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Booked Listings</div>
      {!bookedListing ? (
        <div className="text-lg">Loading...</div>
      ) : !bookedListing.length ? (
        <p className="text-lg mt-4">You have not booked any listing yet ☹️</p>
      ) : (
        <div>
          <div className="hidden md:flex mb-4">
            <p className="w-3/5 font-bold">Listing Name</p>
            <p className="w-1/5 font-bold text-center">Duration</p>
            <p className="w-1/5 font-bold text-center">Price</p>
          </div>
          {bookedListing.map((listing, i, arr) => (
            <div
              className={`flex flex-col md:flex-row items-center border border-richblack-700 ${
                i === arr.length - 1 ? 'rounded-b-lg' : 'rounded-none'
              } mb-4 md:mb-0`}
              key={i}
            >
              <div
                className="flex w-full md:w-3/5 cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(`/view-listing/${listing._id}`);
                }}
              >
                <img
                  src={listing.thumbnail}
                  alt="listing thumbnail"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{listing.listingName}</p>
                  <p className="text-xs text-richblack-300">
                    {listing.listingDescription.length > 50
                      ? `${listing.listingDescription.slice(0, 50)}...`
                      : listing.listingDescription}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-1/5 justify-center items-center">
                <p className="text-sm text-center text-richblack-500">{listing.duration}</p>
              </div>
              <div className="flex flex-col w-full md:w-1/5 justify-center items-center">
                <p className="text-sm text-center text-richblack-500">{listing.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedListing;
