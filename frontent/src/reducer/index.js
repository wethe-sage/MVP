import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authslice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';
import listingReducer from '../slices/listingSlice';
import viewListingReducer from '../slices/viewListingSlice';



const rootReducer = combineReducers({

    auth:authReducer,
    profile:profileReducer,
    listing:listingReducer,
    cart:cartReducer,
    viewListing:viewListingReducer,

});


export default rootReducer;
