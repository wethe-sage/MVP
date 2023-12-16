import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../api"
import { logout } from "./authAPI"
import { setLoading } from "../../slices/profileSlice";
import { setUser } from "../../slices/profileSlice"

const { GET_USER_DETAILS_API, GET_USER_BOOKED_LISTING_API ,GET_INFLUENCER_DATA_API} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserBookedListing(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_BOOKED_LISTING_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_BOOKED_LISTING_API API ERROR............", error)
    toast.error("Could Not Get Booked listing")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInfluencerData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_INFLUENCER_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INFLUENCER_DATA_API API RESPONSE............", response)
    result = response?.data?.data
  } catch (error) {
    console.log("GET_INFLUENCER_DATA_API API ERROR............", error)
    toast.error("Could Not Get Influenceer Data")
  }
  toast.dismiss(toastId)
  return result
}
