import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/listingDetailsAPI";
import {
  setListing,
  setEditListing,
  setStep,
} from "../../../../../slices/listingSlice";
import IconBtn from "../../../../common/IconBtn";
import NestedView from "./NestedView";

export default function ListingBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { listing } = useSelector((state) => state.listing);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // render setListing
    if (listing.listingContent.length > 0) {
      dispatch(setListing(listing));
    }

    // set value of sectionName
    if (editSectionName) {
      const section = listing.listingContent.find(
        (section) => section._id === editSectionName
      );
      setValue("sectionName", section.sectionName);
    }
  }, [setListing]);

  // handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          listingId: listing._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          listingId: listing._id,
        },
        token
      );
    }
    if (result) {
      dispatch(setListing(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const goToNext = () => {
    if (listing.listingContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (
      listing.listingContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one subsection in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditListing(true));
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-[#F0F2F6] p-6 text-richblack-700">
      <p className="text-2xl font-semibold text-richblack-900">Listing Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-md text-richblack-900" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your listing"
            {...register("sectionName", { required: true })}
            className="form-style w-full p-2 rounded-md"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4 text-[#000] ">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-[#000]" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {listing.listingContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-600 py-[8px] px-[20px] font-semibold text-white"
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
}
