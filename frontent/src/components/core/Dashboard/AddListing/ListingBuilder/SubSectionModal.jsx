import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/listingDetailsAPI"
import IconBtn from "../../../../common/IconBtn"

import { setListing } from "../../../../../slices/listingSlice"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { listing } = useSelector((state) => state.listing)

  useEffect(() => {
    if (view || edit) {
      setValue("subSectionTitle", modalData.title);
      setValue("subSectionDesc", modalData.description);
    }
  }, []);
  

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.subSectionTitle !== modalData.title ||
      currentValues.subSectionDesc !== modalData.description
    ) {
      return true;
    }
    return false;
  };
  

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    const formData = new FormData()
    // console.log("Values After Editing form values:", currentValues)
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.subSectionTitle !== modalData.title) {
      formData.append("title", currentValues.subSectionTitle)
    }
    if (currentValues.subSectionDesc !== modalData.description) {
      formData.append("description", currentValues.subSectionDesc)
    }
    
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      // console.log("result", result)
      const updatedListingContent = listing.listingContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedListing = { ...listing, listingContent: updatedListingContent }
      dispatch(setListing(updatedListing))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    // console.log(data)
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.subSectionTitle)
    formData.append("description", data.subSectionDesc)
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of listing
      const updatedListingContent = listing.listingContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedListing = { ...listing, listingContent: updatedListingContent }
      dispatch(setListing(updatedListing))
    } 
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-[#F0F2F6]">
        {/* Modal Header */}
        <div className="flex items-center bg-[#164154] justify-between rounded-t-lg p-5">
          <p className="text-xl font-semibold  text-white">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Subsection
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-900" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          
          {/* subsection Title */}
          <div className="flex flex-col space-y-2 ">
            <label className="text-md text-richblack-900" htmlFor="subSectionTitle">
              SubSection Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="subSectionTitle"
              placeholder="Enter SubSection Title"
              {...register("subSectionTitle", { required: true })}
              className="form-style w-full text-richblack-600 p-2 rounded-md"
            />
            {errors.subSectionTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                SubSection title is required
              </span>
            )}
          </div>
          {/* Sub section Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-md text-richblack-900" htmlFor="subSectionDesc">
              SubSection Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="subSectionDesc"
              placeholder="Enter Subsection Description "
              {...register("subSectionDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full text-richblack-500 p-2 rounded-md"
            />
            {errors.subSectionDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Subsection Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
