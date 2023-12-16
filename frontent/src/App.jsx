import { useState } from 'react'

import './App.css'
import Navbar from './components/common/Navbar'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassowrd'
import VerifyEmail from './pages/VerifyEmail'
import Error from './pages/Error'
import OpenRoute from "./components/core/auth/OpenRoute";
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from "./components/core/Dashboard/Settings";
import PrivateRoute from './components/core/auth/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from './utils/constants'
import { getUserDetails } from "./services/operations/profileAPI"
import MyListings from './components/core/Dashboard/MyListings'
import Influencer from './components/core/Dashboard/Influencer'
import AddListing from './components/core/Dashboard/AddListing'
import EditListing from './components/core/Dashboard/EditListing'
import Catalog from './pages/Catalog'
import BookedListing from './components/core/Dashboard/BookedListing'
import ListingDetails from './pages/ListingDetails'
import Hero from './HomePageComponent/Hero'
import About from './HomePageComponent/About'
import Footer from './HomePageComponent/Footer'
import CreateListing from './components/core/Dashboard/AddHotelListing/CreateListing'
import ListingItem from './components/core/Dashboard/AddHotelListing/HotelListingItem'


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="flex min-h-screen w-screen flex-col bg-white md:bg-white font-inter">
        <Navbar></Navbar>
        <Routes>
          <Route path="/catalog/:catalogName" element={<Catalog></Catalog>}></Route>
        <Route path="/signup" element={<OpenRoute>
          <Signup></Signup>
        </OpenRoute>}
        ></Route>

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        

        <Route path="/forgot-password" element={
        <OpenRoute>
        <ForgotPassword></ForgotPassword>
        </OpenRoute>
        }></Route>

          <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="*" element={<Error></Error>}></Route>
        <Route path="verify-email" element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path="listings/:listingId" element={<ListingDetails></ListingDetails>}></Route>
        <Route path ="/" element={<Hero></Hero>}></Route>

        <Route path='/about' element={<About></About>}></Route>
        <Route path="/" element={<h1 className='text-white'>Home</h1>}></Route>
        <Route path='/contact' element={<h1 className='text-white'>Contact</h1>}></Route>

        <Route element={<PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>}
        >
          <Route path='/dashboard/my-profile' element={<MyProfile></MyProfile>} />
          <Route path='/dashboard/settings' element={<Settings></Settings>} />

          {
            user !== null && user.accountType=== ACCOUNT_TYPE.USER && (
              <>
                <Route path='/dashboard/cart' element={<h1 className='text-white'>Cart</h1>} />
                <Route path='/dashboard/booked-listing' element={<BookedListing></BookedListing>} />
              </>
            )
          }
          {user?.accountType === ACCOUNT_TYPE.INFLUENCER && (
            <>
              <Route path="dashboard/influencer-dashboard" element={<Influencer />} />
              <Route path="dashboard/my-listings" element={<MyListings />} />
              <Route path="dashboard/add-listing" element={<AddListing />} />
              <Route path="dashboard/edit-listing/:listingId" element={<EditListing />} />
              
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.HOTEL && (
            <>
              <Route path="dashboard/hotel-dashboard" element={<Influencer />} />
              <Route path="dashboard/my-listings" element={<ListingItem></ListingItem>} />
              <Route path="dashboard/add-listing" element={<CreateListing></CreateListing>} />
              <Route path="dashboard/edit-listing/:listingId" element={<EditListing />} /> 
            </>
          )

          }

        </Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
