import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addListingDetails,
  editListingDetails,
  fetchListingCategories,
} from "../../../../../services/operations/listingDetailsAPI"
import {setListing, setStep } from "../../../../../slices/listingSlice"
import { LISTING_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementsField"

import ImageUrlUpload from "../ImageUrlUpload"

export default function ListingInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { listing, editListing } = useSelector((state) => state.listing)
  const [loading, setLoading] = useState(false)
  const [listingCategories, setListingCategories] = useState([])
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchListingCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setListingCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editListing) {
      
      setValue("listingTitle", listing.listingName)
      setValue("listingShortDesc", listing.listingDescription)
      setValue("listingPrice", listing.price)
      setValue("listingTags", listing.tag)
      setValue("listingCategory", listing.category)
      setValue("listingRequirements", listing.instructions)
      setValue("address", listing.address)
      setValue("duration", listing.duration)
      setValue("listingImage", listing.thumbnail)
      setValue("imageUrls", listing.imageUrls)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editListing])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.listingTitle !== listing.listingName||
      currentValues.listingShortDesc !== listing.listingDescription ||
      currentValues.listingPrice !== listing.price ||
      currentValues.listingTags.toString() !== listing.tag.toString() ||
      currentValues.listingCategory._id !== listing.category._id ||
      currentValues.address !== listing.address ||
      currentValues.duration !== listing.duration ||
      currentValues.listingRequirements.toString() !==
      listing.instructions.toString() ||
      currentValues.listingImage !== listing.thumbnail ||
      currentValues.imageUrls !== listing.imageUrls

    ) {
      return true
    }
    return false
  }


  //   handle next button click
  const onSubmit = async (data) => {
    console.log("the data is",data)

    if (editListing) {
      
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        console.log("the data is of ",data)
        formData.append("listingId", listing._id)
        if (currentValues.listingTitle !== listing.listingName) {
          formData.append("listingName", data.listingTitle)
        }
        if (currentValues.listingShortDesc !== listing.listingDescription) {
          formData.append("listingDescription", data.listingShortDesc)
        }
        if (currentValues.listingPrice !== listing.price) {
          formData.append("price", data.listingPrice)
        }
        if(
          currentValues.address !== listing.address
        ) {
          formData.append("address", data.address)
        }
        if(
          currentValues.duration !== listing.duration
        ) {
          formData.append("duration", data.duration)
        }
        if (currentValues.listingTags.toString() !== listing.tag.toString()) {
          formData.append("tag", JSON.stringify(data.listingTags))
        }
        if (currentValues.listingCategory._id !== listing.category._id) {
          formData.append("category", data.listingCategory)
        }
        if (
          currentValues.listingRequirements.toString() !==
          listing.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.listingRequirements)
          )
        }
        if (currentValues.imageUrls !== listing.imageUrls) {
          formData.append("imageUrls", data.imageUrls)
        }

        if (currentValues.listingImage !== listing.thumbnail) {
          formData.append("thumbnailImage", data.listingImage)
        }
        console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editListingDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setListing(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("listingName", data.listingTitle)
    formData.append("listingDescription", data.listingShortDesc)
    formData.append("price", data.listingPrice)
    formData.append("tag", JSON.stringify(data.listingTags))
    formData.append("category", data.listingCategory)
    formData.append("address", data.address)
    formData.append("duration", data.duration)
    formData.append("status", LISTING_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.listingRequirements))
    formData.append("thumbnailImage", data.listingImage)
    formData.append("imageUrls", JSON.stringify(data.imageUrls))
    setLoading(true)
    const result = await addListingDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setListing(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-[#F0F2F6] p-6 text-richblack-700"
    >
      {/*  Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="listingTitle">
          Listing Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="listingTitle"
          placeholder="Enter listing Title"
          {...register("listingTitle", { required: true })}
          className="form-style w-full p-2 rounded-md text-richblack-900"
        />
        {errors.listingTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            listing title is required
          </span>
        )}
      </div>
      {/* Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="listingShortDesc">
          Listing Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="listingShortDesc"
          placeholder="Enter Description"
          {...register("listingShortDesc", { required: true })}
          className="form-style resize-x-none p-2 rounded-md min-h-[130px] w-full text-richblack-900 "
        />
        {errors.listingShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Listing Description is required
          </span>
        )}
      </div>
      {/* \ Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="listingPrice">
          Listing Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="listingPrice"
            placeholder="Enter Listing Price"
            {...register("listingPrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style p-2 rounded-md w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.listingPrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Listing Price is required
          </span>
        )}
      </div>
      {/*  Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="listingCategory">
          listing Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("listingCategory", { required: true })}
          defaultValue=""
          id="listingCategory"
          className="form-style w-full p-2 rounded-md"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            listingCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.listingCategories && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            listing Category is required
          </span>
        )}
      </div>
      {/* Address */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="address">
          Address <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="address"
          placeholder="Enter Address"
          {...register("address", { required: true })}
          className="form-style w-full p-2 rounded-md"
        />
        {errors.address && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Address is required
          </span>
        )}
      </div>

      {/* Duration */}

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-900" htmlFor="duration">
          Duration <sup className="text-pink-200">*</sup>
        </label>
        <input

          id="duration"
          placeholder="Enter Duration"
          {...register("duration", { required: true })}
          className="form-style w-full p-2 rounded-md "
        />  
        {errors.duration && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Duration is required
          </span>
        )}
      </div>

      {/* Tags */}
      <ChipInput
        label="Tags"
        name="listingTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Thumbnail Image */}
      <Upload
        name="listingImage"
        label="listing Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editListing ? listing?.thumbnail : null}
      />
    
      {/* Requirements/Instructions */}
      <RequirementsField
        name="listingRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-richblack-900 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          
          <ImageUrlUpload
            name={'imageUrls'}
            label={'Image Urls'}
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editListing ? listing?.imageUrls : null}
          />

        </div>
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editListing && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-600 py-[8px] px-[20px] font-semibold text-white`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editListing ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
