import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchInfluencerListing } from "../../../services/operations/listingDetailsAPI";
import { getInfluencerData } from "../../../services/operations/profileAPI";
import InfluencerChart from "./InfluencerDashboard/InfluencerChart";

export default function Influencer() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [influencerData, setInfluencerData] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getListingDataWithStats = async () => {
      setLoading(true);

      try {
        const influencerApiData = await getInfluencerData(token);
        const result = await fetchInfluencerListing(token);

        console.log("Influencer Data: ", influencerApiData);
        console.log("Listing Data: ", result);

        if (influencerApiData && influencerApiData.length) {
          setInfluencerData(influencerApiData);
        }

        if (result) {
          setListings(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getListingDataWithStats();
  }, [token]);

  const totalAmount = influencerData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  console.log("Total Amount: ", totalAmount);

  const totalUsers = influencerData?.reduce(
    (acc, curr) => acc + curr.totalPeopleBooked,
    0
  );
  console.log("Total Users: ", totalUsers);

  return (
    <div className="flex flex-col md:flex-col p-3 w-[97vw] md:w-fit bg-[#F0F2F6]">
      <div className="flex-1">
        <div className="space-y-2">
          <h1 className="text-[20px] font-semibold md:text-2xl text-richblack-900">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-[15px] md:text-2xl  text-richblack-900">
            Let's start something new
          </p>
        </div>
        {loading ? (
          <div className="spinner"></div>
        ) : listings.length > 0 ? (
          <div className="my-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalUsers > 0 ? (
              <InfluencerChart listings={influencerData} />
            ) : (
              <div className="flex-1 rounded-md bg-white p-6">
                <p className="text-lg font-bold text-black">Visualize</p>
                <p className="mt-4 text-xl font-medium text-black">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex-grow min-w-[250px] md:w-fit flex-col rounded-md bg-white p-6 mb-4 md:mb-0">
              <p className="text-lg font-bold text-black">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-600">Total Listings</p>
                  <p className="font-medium text-[20px] md:text-2xl text-black">
                    {listings.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-600">Total Users</p>
                  <p className="font-medium text-[20px] md:text-2xl text-black">
                    {listings.length > 0 ? totalUsers : 0}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-600">Total Income</p>
                  <p className="font-medium text-[20px] md:text-2xl text-black">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-white p-6 py-20">
            <p className="text-center text-2xl font-bold text-richblack-5">
              You have not created any listing yet
            </p>
            <Link to="/dashboard/add-listing">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Create a listing
              </p>
            </Link>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="rounded-md bg-white p-6">
          {/* Render 3 listings */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-black">Your Listings</p>
            <Link to="/dashboard/my-listings">
              <p className="text-sm font-semibold text-[#BCAD3C]">View All</p>
            </Link>
          </div>
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {listings.slice(0, 3).map((listing) => (
              <div key={listing._id} className="w-full">
                <img
                  src={listing.thumbnail}
                  alt={listing.listingName}
                  className="h-[201px] w-full rounded-md object-cover"
                />
                <div className="mt-3 w-full">
                  <p className="text-sm font-medium text-richblack-600">
                    {listing.listingName}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <p className="text-sm font-medium text-richblack-500">
                      {totalUsers} Users
                    </p>
                    <p className="text-sm font-medium text-richblack-500">|</p>
                    <p className="text-sm font-medium text-richblack-300">
                      Rs. {listing.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
