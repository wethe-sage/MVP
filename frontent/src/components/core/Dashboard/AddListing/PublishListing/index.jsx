import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editListingDetails } from "../../../../../services/operations/listingDetailsAPI"
import {  LISTING_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import { resetListingState ,setStep} from "../../../../../slices/listingSlice"

export default function PublishListing() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { listing } = useSelector((state) => state.listing)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (listing?.status === LISTING_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToListing = () => {
    dispatch(resetListingState())
    navigate("/dashboard/my-listings")
  }

  const handleListingPublish = async () => {
    // check if form has been updated or not
    if (
      (listing?.status === LISTING_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (listing?.status === LISTING_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToListing()
      return
    }
    const formData = new FormData()
    formData.append("listingId", listing._id)
    const listingStatus = getValues("public")
      ? LISTING_STATUS.PUBLISHED
      : LISTING_STATUS.DRAFT
    formData.append("status", listingStatus)
    setLoading(true)
    const result = await editListingDetails(formData, token)
    if (result) {
      goToListing()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleListingPublish()
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-[#F0F2F6] p-6">
      <p className="text-2xl font-semibold text-richblack-900">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-700 focus:ring-2 focus:ring-richblack-700"
            />
            <span className="ml-2 text-richblack-400">
              Make this Listing as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-600 py-[8px] px-[20px] font-semibold text-white"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}
