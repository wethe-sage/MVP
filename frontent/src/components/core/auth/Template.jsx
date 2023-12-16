import { useSelector } from "react-redux";
import loginimage from "../../../../SageMain/daniel-jensen-tQpypKA92k8-unsplash.jpg";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="relative h-full max-w-screen-xl mx-auto pl-[20px] pr-[20px]">
          
          <div className="absolute inset-0 overflow-hidden rounded-l-md">
            <img
              src={loginimage}
              className="h-full w-full object-cover"
              alt="Login Image"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-[100vh] md:w-[605px] mx-auto rounded-md bg-[#F0F2F6] mt-5 md:mt-0 opacity-[85%]">
            <div className="flex flex-col items-center justify-center p-5 md:p-10 lg:p-16">
              <h1 className="text-4xl font-bold text-[#1E1E1E]">{title}</h1>
              <p className="text-sm text-[#1E1E1E] mt-2">{description1}</p>
              <p className="text-sm text-[#1E1E1E] mt-2">{description2}</p>
            </div>
            <div className="flex flex-col items-center justify-center ">
              {formType === "login" ? <LoginForm /> : <SignupForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
