import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../../Data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import {IoClose } from "react-icons/io5";
import {MdMenuOpen } from "react-icons/md";

function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  console.log(user);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set default to open on larger screens

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex ${isSidebarOpen ? 'flex' : 'hidden'} h-[calc(100vh-3.5rem)] min-w-[180px] md:min-w-[220px] flex-col border-r-[1px] bg-white py-10`}>
        <div className="flex flex-col text-black">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className="flex flex-col text-black">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2 text-black">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {/* Conditional rendering of toggle button only on mobile screens */}
      <div  className="fixed left-0 bottom-32 right-4 w-[40px] bg-[#BCAD3C] text-2xl text-center font-bold z-[3000] text-white p-2 rounded-md md:hidden"
        onClick={toggleSidebar}>
          {isSidebarOpen ? <IoClose /> : <MdMenuOpen />}
      </div>
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default Sidebar;
