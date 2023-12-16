import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  listing: null,
  editListing: false,
  paymentLoading: false,
}

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setListing: (state, action) => {
      state.listing = action.payload
    },
    setEditListing: (state, action) => {
      state.editListing = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetListingState: (state) => {
      state.step = 1
      state.listing = null
      state.editListing = false
    },
  },
})

export const {
  setStep,
  setListing,
  setEditListing,
  setPaymentLoading,
  resetListingState,
} = listingSlice.actions

export default listingSlice.reducer