import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  listingSectionData: [],
  listingEntireData: [],
}

const viewListingSlice = createSlice({
  name: "viewListing",
  initialState,
  reducers: {
    setListingSectionData: (state, action) => {
      state.listingSectionData = action.payload
    },
    setEntireListingData: (state, action) => {
      state.listingEntireData = action.payload
    },
    
  },
})

export const {
  setListingSectionData,
  setEntireListingData,
} = viewListingSlice.actions

export default viewListingSlice.reducer
