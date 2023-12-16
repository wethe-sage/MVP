import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const location = useLocation();

  const handelOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const { password, confirmPassword } = formData;

  const handelOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <h1>Loading......</h1>
      ) : (
        <div className=" rounded-md p-8  bg-[#F0F2F6] w-96">
          <h1 className="text-2xl font-bold mb-4">Update Password</h1>
          <p className="text-gray-600 mb-4">Enter password and you're all set</p>
          <form onSubmit={handelOnSubmit} className="space-y-4">
            <label className="relative">
              <p className="mb-2">New Password*</p>
              
              <input
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                value={password}
                onChange={handelOnChange}
                placeholder="Password"
                className="w-full bg-white  p-2 rounded-md"
              />
              <span className="mt-2 absolute right-3 top-9 cursor-pointer">
                {showPassword ? (
                  <AiOutlineEyeInvisible onClick={() => setShowPassword(false)} />
                ) : (
                  <AiOutlineEye onClick={() => setShowPassword(true)} />
                )}
              </span>
             
            </label>

            <label className="relative">
              <p className="mb-2">Confirm New Password*</p>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handelOnChange}
                placeholder="Confirm Password"
                className="w-full bg-white  p-2 rounded-md"
              />
              <span className="mt-2 absolute right-3 top-15 cursor-pointer">
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible onClick={() => setShowConfirmPassword(false)} />
                ) : (
                  <AiOutlineEye onClick={() => setShowConfirmPassword(true)} />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="bg-[#BCAD3C] text-white py-2 px-4 rounded"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="text-black">
              <p className="flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
