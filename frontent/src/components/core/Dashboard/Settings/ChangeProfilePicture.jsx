import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import {updateDisplayPicture} from "../../../../services/operations/SettingsAPI"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <div className="flex flex-col  justify-between rounded-md bg-[#F0F2F6] p-4 md:p-8 text-richblack-900">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] md:w-[100px] rounded-full object-cover"
          />
          <div className="flex flex-col items-center space-y-2 md:items-start md:space-y-0">
            <p className="text-lg">Change Profile Picture</p>
            <div className="flex  items-center gap-3 md:flex-row md:gap-5 ">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <div className=" flex rounded-md items-center  border border-[#BCAD3C]">
                
              <p
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md  py-2 px-5 w-[90px] font-semibold text-black"
              >
                Upload 
              </p>
              <span><FiUpload className="text-lg text-black mr-[10px]" /></span>
              
              </div>
              <IconBtn
                text={loading ? "Saving..." : "Save"}
                onclick={handleFileUpload}
              >
                {!loading}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
