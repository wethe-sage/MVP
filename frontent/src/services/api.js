// const BASE_URL = process.env.REACT_APP_BASE_URL;


//auth api
export const endpoints = {
  SENDOTP_API: "http://localhost:5000/api/v1/auth/sendotp",
  SIGNUP_API: "http://localhost:5000/api/v1/auth/signup",
  LOGIN_API:  "http://localhost:5000/api/v1/auth/login",
  RESETPASSTOKEN_API:"http://localhost:5000/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: "http://localhost:5000/api/v1/auth/reset-password",
}

  //profile api
  export const profileEndpoints = {
    GET_USER_DETAILS_API:"http://localhost:5000/api/v1/profile/get-all-user-details",
    GET_USER_BOOKED_LISTING_API:"http://localhost:5000/api/v1/profil/get-booked-listing-by-user",
    GET_INFLUENCER_DATA_API: "http://localhost:5000/api/v1/profile/influencerDashboard",

  }

  export const categories = {
    CATEGORIES_API:"http://localhost:5000/api/v1/listing/showAllCategories",
  }

  //listing api

  export const listingEndpoints = {
    GET_ALL_LISTING_API:"http://localhost:5000/api/v1/listing/get-all-listings",
    LISTING_DETAILS_API:"http://localhost:5000/api/v1/listing/get-listing-details",
    EDIT_LISTING_API:"http://localhost:5000/api/v1/listing/edit-listing",
    LISTING_CAREGORIES_API:"http://localhost:5000/api/v1/listing/showAllCategories",
    CREATE_LISTING_API:"http://localhost:5000/api/v1/listing/create-listing",
    CREATE_SECTION_API:"http://localhost:5000/api/v1/listing/add-section",
    CREATE_SUBSECTION_API:"http://localhost:5000/api/v1/listing/add-subsection",
    UPDATE_SECTION_API:"http://localhost:5000/api/v1/listing/update-section",
    UPDATE_SUBSECTION_API:"http://localhost:5000/api/v1/listing/updateSubSection",
    DELETE_SECTION_API:"http://localhost:5000/api/v1/listing/delete-section",
    DELETE_SUBSECTION_API:"http://localhost:5000/api/v1/listing/deleteSubSection",
    DELETE_LISTING_API:"http://localhost:5000/api/v1/listing/delete-listing",
    GET_ALL_INFLUNCER_LISTING_API:"http://localhost:5000/api/v1/listing/get-all-influencer-listings",
    GET_FULL_LISITING_DETAILS_AUTHENTICATED:"http://localhost:5000/api/v1/listing/getFullListingDetails",
    CREATE_RATING_API:"http://localhost:5000/api/v1/listing/create-rating",
  
  }

  // RAting api

  export const ratingsEndpoints = {
    REVIEWS_DETAILS_API:"http://localhost:5000/api/v1/rating/get-all-rating-and-reviews-on-platform",
  }

  // CATALOG PAGE DATA

  export const catalogData = {
    CATALOGPAGEDATA_API:"http://localhost:5000/api/v1/listing/getCategoryPageDetails",
  }

  // contact us api
  export const contactusEndpoint = {
    CONTACT_US_API: "http://localhost:5000/api/v1/reach/contact",
}

  // setting page api
  export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: "http://localhost:5000/api/v1/profile/update-display-picture",
    UPDATE_PROFILE_API:"http://localhost:5000/api/v1/profile/update-profile",
    CHANGE_PASSWORD_API:"http://localhost:5000/api/v1/auth/change-password",
    DELETE_PROFILE_API:  "http://localhost:5000/api/v1/profile/delete-profile",
  }
  