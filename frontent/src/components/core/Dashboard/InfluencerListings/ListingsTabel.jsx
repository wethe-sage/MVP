import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";
import {
  fetchInfluencerListing,
  deleteListing
} from "../../../../services/operations/listingDetailsAPI";
import { LISTING_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function ListingTable({ listings, setListings }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleListingDelete = async (listingId) => {
    setLoading(true);
    await deleteListing({ listingId: listingId }, token);
    const result = await fetchInfluencerListing(token);
    if (result) {
      setListings(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-richblack-800">
        <thead clas>
          <tr className="flex flex-col sm:flex-row sm:gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <th className="flex-1 text-left text-sm font-medium  text-black">
              Listings
            </th>
            <th className="text-left text-sm font-medium  text-black">
              Duration
            </th>
            <th className="text-left text-sm font-medium  text-black">
              Price
            </th>
            <th className="text-left text-sm font-medium  text-richblack-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {listings?.length === 0 ? (
            <tr>
              <td className="py-10 text-center text-2xl font-medium text-richblack-900">
                No Listing found ☹️
              </td>
            </tr>
          ) : (
            listings?.map((listing) => (
              <tr
                key={listing._id}
                className="flex flex-col sm:flex-row sm:gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <td className="flex flex-1 sm:gap-x-4">
                  <img
                    src={listing?.thumbnail}
                    alt={listing?.listingName}
                    className="h-[148px] w-[220px] rounded-lg object-cover border border-richblack-900"
                  />
                  <div className="flex flex-col ml-[10px] justify-between">
                    <p className="text-lg font-semibold text-richblack-900">
                      {listing.listingName}
                    </p>
                    <p className="text-md text-black">
                      {listing.listingDescription}
                    </p>
                    <p className="text-[12px] text-richblack-600">
                      Created: {formatDate(listing.createdAt)}
                    </p>
                    {listing.status === LISTING_STATUS.DRAFT ? (
                      <p className="flex ml-[10px] w-fit flex-row items-center gap-2 rounded-full bg-[#fff] px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit ml-[10px] flex-row items-center gap-2 rounded-full bg-[#fff] px-2 py-[2px] text-[12px] font-medium text-[#BCAD3C]">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#BCAD3C] text-white">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </td>
                <td className="text-sm mt-[10px] font-medium text-right text-richblack-800">
                  {listing.duration}
                </td>
                <td className="text-sm mt-[10px] font-medium text-right text-richblack-800">
                  ₹{listing.price}
                </td>
                <td className="text-sm mt-[10px] font-medium text-right text-richblack-900 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-listing/${listing._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleListingDelete(listing._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
