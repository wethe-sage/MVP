import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
//import { ReactMarkdown } from "react-markdown/lib/react-markdown"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import { fetchListingDetails } from "../services/operations/listingDetailsAPI"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import { formatDate } from '../services/formatDate';
import ListingAccordionBar from "../components/core/Listing/ListingAccordionBar";


export const ListingDetails = () => {
        const { user } = useSelector((state) => state.profile);
        const { token } = useSelector((state) => state.auth);
        const [loadingf, setloadingf] = useState(true);
        const { loading } = useSelector((state) => state.profile);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { listingId } = useParams();

        // Declear a state to save the lisitng details
        const [listingData, setListingData] = useState(null);
        const [confirmationModal, setConfirmationModal] = useState(null);
        useEffect(() => {
            const getListingFullDetails = async() => {
                try {
                    const result = await fetchListingDetails(listingId);
                    // if(result.sucess===true){
                    //     console.log("abh8");
                    //     setloadingf(false);
                    // }
                    console.log("Printing lsiting data-> ", result);
                    setListingData(result);
                } catch (error) {
                    console.log("Could not fetch listing details");
                }
            }
            getListingFullDetails();

        }, [listingId]);

        // Calculating Avg Review count
        const [avgReviewCount, setAverageReviewCount] = useState(0);
        useEffect(() => {
            if (!loadingf) {
                const count = GetAvgRating(listingData.data.listingDetails.ratingAndReviews);
                setAverageReviewCount(count);
            }
        }, [listingData])



        const [isActive, setIsActive] = useState(Array(0));
        const handleActive = (id) => {
            setIsActive(!isActive.includes(id) ?
                isActive.concat(id) :
                isActive.filter((e) => e != id)

            )
        }

        const handleBuyListing = () => {

            if (token) {
                (token, [listingId], user, navigate, dispatch);
                return;
            }
            setConfirmationModal({
                text1: "you are not Logged in",
                text2: "Please login to purchase the Listing",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null),
            })

        }

        if (loading || !listingData) {
            return ( 
                <div className="text-center text-white my-auto" >
                Loading... 
                </div>
            )
        }

        if (!listingData.sucess) {
            return ( <div>
                <Error/>
                </div>
            )
        }
        const {
            _id: listing_id,
            listingName,
            listingDescription,
            thumbnail,
            price,
            listingContent,
            ratingAndReviews,
            creator,
            address,
            duration,
            peopelBooked,
            createdAt,
        } = listingData.data.listingDetails;

        

        return ( 
            <>
            <div className="md:hidden text-white font-medium flex items-center justify-center my-8">Please Switch to PC to view this page :-</div> 
            <div className="hidden md:block">
            <div className={`relative w-full bg-richblack-800`}>
              {/* Hero Section */}
              <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                  <div className="relative block max-h-[30rem] lg:hidden">
                    <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                    <img
                      src={thumbnail}
                      alt="listing thumbnail"
                      className="aspect-auto w-full"
                    />
                  </div>
                  <div
                    className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                  >
                    <div>
                      <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                        {listingName}
                      </p>
                    </div>
                    <p className={`text-richblack-200`}>{listingDescription}</p>
                    <div className="text-md flex flex-wrap items-center gap-2">
                      <span className="text-yellow-25">{avgReviewCount}</span>
                      <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                      <span>{`(${ratingAndReviews.length} reviews)`}</span>
                      <span>{`${peopelBooked.length} People Booked`}</span>
                    </div>
                    <div>
                      <p className="">
                        Created By {`${creator.firstName} ${creator.lastName}`}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-5 text-lg">
                      <p className="flex items-center gap-2">
                        {" "}
                        <BiInfoCircle /> Created at {formatDate(createdAt)}
                      </p>
                        <p className="flex items-center gap-2">
                            {" "}
                            <HiOutlineGlobeAlt /> {address}
                        </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                    <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                      Rs. {price}
                    </p>
                    <button className="yellowButton" onClick={handleBuyListing}>
                      Buy Now
                    </button>
                    <button className="blackButton">Add to Cart</button>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
              <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                
      
                {/* listing Content Section */}
                <div className="max-w-[830px] ">
                  <div className="flex flex-col gap-3">
                    <p className="text-[28px] font-semibold">listing Content</p>
                    <div className="flex flex-wrap justify-between gap-2">
                      <div className="flex gap-2">
                        <span>
                          {listingContent.length} {`section(s)`}
                        </span>
                        <span>{`•`}</span>
                      </div>
                      <div>
                        <button
                          className="text-yellow-25"
                          onClick={() => setIsActive([])}
                        >
                          Collapse all sections
                        </button>
                      </div>
                    </div>
                  </div>
                 {/* duration of the trip */}
                                
                    <div className="flex flex-col gap-3">
                    <p className="text-[28px] font-semibold">Duration of the trip</p>
                    <div className="flex flex-wrap justify-between gap-2">
                        <div className="flex gap-2">
                        <span>
                            {duration} {`days`}
                        </span>
                        <span>{`•`}</span>
                        </div>
                    </div>
                    </div>
                
      
                  {/* listng Details Accordion */}
                  <div className="py-4">
                    {listingContent.map((listing, index) => (
                      <ListingAccordionBar
                        listing={listing}
                        key={index}
                        isActive={isActive}
                        handleActive={handleActive}
                      />
                    ))}
                  </div>
      
                  {/* Author Details */}
                  <div className="mb-12 py-4">
                    <p className="text-[28px] font-semibold">Creatior</p>
                    <div className="flex items-center gap-4 py-4">
                      <img
                        src={
                          creator.image
                            ? creator.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${creator.firstName} ${creator.lastName}`
                        }
                        alt="Author"
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <p className="text-lg">{`${creator.firstName} ${creator.lastName}`}</p>
                    </div>
                    <p className="text-richblack-50">
                      {creator.additionalDetails.about}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            </div>        
          </>
            )
        }

export default ListingDetails;

