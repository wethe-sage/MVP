import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { apiConnector } from '../services/apiconnector';
import { contactusEndpoint } from '../services/api';
import { toast } from 'react-hot-toast';

const ContactUsForm = () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            console.log("longin: ", token);
        }
        //let res = { data: { sucess: false } };
        const [loading, setLoading] = useState(false);
        const {
            register,
            handleSubmit,
            reset,
            formState: { errors, isSubmitSuccessful }
        } = useForm();

        const submitContactForm = async(data) => {
            console.log("Logging Data", data);
            try {
                setLoading(true);
                // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
                const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {
                    firstName: data.firstName,
                    email: data.email,
                    message: data.message,
                    token
                })
                //res = response;
                console.log("Logging response", response);
                toast.success("Response sent sucessfully")
                setLoading(false);
            } catch (error) {
                console.log("Error:", error.message);
                toast.error("Can't send mail");
                setLoading(false);
            }
        }

        useEffect(() => {
            if (isSubmitSuccessful) {
                reset({
                    email: "",
                    firstName: "",
                    message: "",
                    
                })
            }
        }, [reset, isSubmitSuccessful]);


        return ( 
            <div> {
                loading === true ? 
                ( <div className = 'text-white' > Loading... </div>) : 
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="bg-[#F5F0F6] p-3">
      <div className="flex flex-col gap-5 lg:flex-row ">
        <div className="flex flex-col justify-center gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="lable-style text-xl text-black">
            Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter your name"
            className="form-style p-2 rounded-md"
            {...register("firstName", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
        <label htmlFor="email" className="lable-style text-xl mt-[10px] text-black">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style p-2 rounded-md"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>
        
      </div>



      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style text-xl mt-[10px] text-black">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style p-2 rounded-md"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-[#BCAD3C] px-6 py-3 text-center text-[20px] font-bold text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
} 
</div>
)
}

export default ContactUsForm