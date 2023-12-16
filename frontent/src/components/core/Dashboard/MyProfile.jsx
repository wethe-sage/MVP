import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
    <div className="bg-[#F0F2F6] rounded-md">
      <h1 className=" text-3xl p-4 md:ml-[30px] md:mt-[30px] text-center font-semibold md:text-left text-black md:w-[70vw] overflow-hidden">
        My Profile
      </h1>
      <div className="">
      <div className="flex flex-col md:flex-row items-center justify-between rounded-md border-[1px]  bg-[#F0F2F6] p-8 px-12">
        <div className="flex flex-col md:flex md:flex-row items-center gap-[10px] md:items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square mr-[10px] w-[78px] md:w-[100px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-black">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <div className="mt-[15px]">
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          
          <RiEditBoxLine />
        </IconBtn>
        </div>
      </div>
      <div className=" flex flex-col gap-y-[30px] rounded-md border-[1px]  bg-[#F0F2F6]
       p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-black">About</p>
          
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-black"
              : "text-black"
          } text-sm font-medium -mt-[30px] bg-white p-4 rounded-md`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className=" flex flex-col rounded-md border-[1px]  bg-[#F0F2F6] p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-black">
            Personal Details
          </p>
         
        </div>
        <div className="flex flex-col md:flex-row justify-between bg-white p-4 rounded-md">
          <div className="flex flex-col gap-y-5 md:w-1/2 ">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-base font-semibold text-black">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-base font-semibold text-black">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-base font-semibold text-black">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-[10px] gap-y-5 md:w-1/2">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-base font-semibold text-black">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-base font-semibold text-black">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-base font-semibold text-black">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}
