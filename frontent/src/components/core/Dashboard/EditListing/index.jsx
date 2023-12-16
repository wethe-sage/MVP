import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  getFullDetailsOfListing,
} from "../../../../services/operations/listingDetailsAPI"
import { setListing, setEditListing} from "../../../../slices/listingSlice"
import RenderSteps from "../AddListing/RenderSteps"
import toast from "react-hot-toast"

export default function EditListing() {
  const dispatch = useDispatch()
  const { listingId } = useParams()
  const { listing } = useSelector((state) => state.listing)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchlisting = async () => {
      

      const result= await getFullDetailsOfListing(listingId, token)
      console.log("the edit listing details :",result);
      if (result) {
        dispatch(setListing(result))
        dispatch(setEditListing(result)) 

      }
     
    }
    fetchlisting()
  }
  , [dispatch, listingId, token])


  if (loading) {
    return (
      toast.loading("Loading...", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    )
  }

  return (
    <div className="bg-[#fff]">
      <h1 className="mb-14 text-3xl font-medium text-richblack-900 text-center md:text-left">
        Edit Listing Details
      </h1>
      <div className="mx-auto max-w-[600px]">
        {listing ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-xl font-semibold text-richblack-100">
           No Listing found ☹️
          </p>
        )}
      </div>
    </div>
  )
}
