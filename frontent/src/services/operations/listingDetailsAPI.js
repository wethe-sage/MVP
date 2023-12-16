import { toast } from "react-hot-toast"

// import {  } from "../../slices/viewListingSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { listingEndpoints } from "../api"

const {
  GET_ALL_LISTING_API,
  LISTING_DETAILS_API,
  EDIT_LISTING_API,
  LISTING_CAREGORIES_API,
  CREATE_LISTING_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_LISTING_API,
  GET_ALL_INFLUNCER_LISTING_API,
  GET_FULL_LISITING_DETAILS_AUTHENTICATED,
  CREATE_RATING_API

} = listingEndpoints

export const getAllListing = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_LISTING_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Listing Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_LISTING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchListingDetails = async (listingId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", LISTING_DETAILS_API, {
      listingId,
    })
    console.log("LISTING_DETAILS_API............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("LISTING_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available listing categories
export const fetchListingCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", LISTING_CAREGORIES_API,)
    console.log("LISTING_CAREGORIES_API, API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Listing Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("LISTING_CAREGORIES_API, API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// showall categories
export const showAllCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", CATEGORIES_API,)
    console.log("LISTING_CAREGORIES_API, API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Listing Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("LISTING_CAREGORIES_API, API ERROR............", error)
    toast.error(error.message)
  }
  return result
}


// add the Listing details
export const addListingDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_LISTING_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE_LISTING_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Listing Details")
    }
    toast.success("Listing Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE_LISTING_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the listing details
export const editListingDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_LISTING_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT_LISTING_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update listing Details")
    }
    toast.success("listing Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT_LISTING_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Listing Section Created")
    result = response?.data?.updatedListing
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add subsection")
    }
    toast.success("subsectin Added")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("listing Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update subsection")
    }
    toast.success("SubSection Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("listing Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete subsection")
    }
    toast.success("subsection Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all listing under a specific instructor
export const fetchInfluencerListing = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INFLUNCER_LISTING_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("GET_ALL_INFLUNCER_LISTING_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch influecer Listing")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_INFLUNCER_LISTING_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a listing
export const deleteListing = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_LISTING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE_LISTING_API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete lisintg")
    }
    toast.success("listing Deleted")
  } catch (error) {
    console.log("DELETE_LISTING_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// get full details of a lisitng
export const getFullDetailsOfListing = async (listingId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_LISITING_DETAILS_AUTHENTICATED,
      {
        listingId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("GET_FULL_LISITING_DETAILS_AUTHENTICATED RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_FULL_LISITING_DETAILS_AUTHENTICATED API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// create a rating for lisitig
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}
