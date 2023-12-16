import React from "react";
import ContactUsForm from './ContactUsForm'

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl font-bold text-center text-[#164154] md:text-5xl md:leading-10 md:font-semibold md:text-[#164154]">
        Contact Us
      </h1>
      <h1 className=" text-xl text-[#164154] md:text-3xl md:leading-10 md:font-semibold md:text-[#164154]">
      Have a travel vision? We have the expertise. Let's collaborate and bring your travel dreams to life!"
      </h1>
      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
