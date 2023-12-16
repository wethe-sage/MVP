import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
      <label className="w-full">
        <p className="mb-1 text-sm md:text-base text-black">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-md bg-white p-3 text-black"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-sm md:text-base text-black">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-md bg-white p-3 pr-12 text-black"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password" className="mt-1 ml-auto text-[#d8c63b]">
          <p className="text-xs md:text-sm">Forgot Password?</p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-md bg-[#BCAD3C] py-2 px-4 font-semibold text-white"
      >
        LOGIN
      </button>

      <p className="mt-6 text-sm text-richblack-900 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#BCAD3C]">
          SIGNUP
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
