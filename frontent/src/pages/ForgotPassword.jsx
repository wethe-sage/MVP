import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="bg-[#F0F2F6]">
        <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 lg:p-8  bg-[#fff] rounded-md">
          <div className=" p-3 rounded-md">
          <h1 className="text-2xl sm:text-3xl font-semibold leading-7 sm:leading-9 text-black">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          </div>
          <p className="my-4 text-base sm:text-lg text-richblack-600">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-sm sm:text-base leading-5 sm:leading-6 text-richblack-900">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full p-2 rounded-md bg-[#F0F2F6]"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-8 bg-[#BCAD3C] py-3 px-4 rounded-md text-white text-xl font-semibold"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-500">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
        </div>
      )}
    </div>
    
  );
}

export default ForgotPassword;
