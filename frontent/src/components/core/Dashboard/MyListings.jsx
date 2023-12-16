import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInfluencerListing } from "../../../services/operations/listingDetailsAPI"
import IconBtn from "../../common/IconBtn"
import ListingTabel from "./InfluencerListings/ListingsTabel"

export default function MyListings() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      const result = await fetchInfluencerListing(token)
      if (result) {
        setListings(result)
      }
    }
    fetchListings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-black">My Lisitings</h1>
        <IconBtn
          text="Add Listing"
          onclick={() => navigate("/dashboard/add-listing")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      <div className=" bg-[#F0F2F6] rounded-md">
      {listings && <ListingTabel listings={listings} setListings={setListings} />}
      </div>
    </div>
  )
}
