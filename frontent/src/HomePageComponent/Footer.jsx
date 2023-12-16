import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../SageMain/logohero.png"
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaMailBulk,
} from 'react-icons/fa';
import {CiLinkedin} from 'react-icons/ci';
import { SiGmail } from 'react-icons/si';
import { FaPhoneVolume } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between bg-[#F0F2F6] md:bg-[#F0F2F6] p-4 md:p-14 md:mt-[100px]">
      <div className="w-full md:w-1/4 flex flex-col gap-y-7 justify-center md:ml-4">
        <h2 className='text-2xl md:text-3xl text-[#164154] font-semibold  md:ml-0  mt-[20px]'>Contact us</h2>
        <div className="flex items-center gap-3  md:ml-0">
          <span className='text-[#ee2424] text-2xl md:text-3xl'><SiGmail /></span>
          <p className='text-[#164154] underline underline-offset-2'><a href="mailto:info@wethesage.com">info@wethesage.com</a></p>
        </div>

        <div className="text-[#164154]  md:ml-0">
          <p>or send us an email-</p>
          <a className='underline underline-offset-1' href="mailto:founder.sehary@gmail.com">
            founder.sehary@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-3  md:ml-0">
          <span className='bg-[#54da2b] rounded-full p-1 text-[#164154] text-2xl md:text-3xl'>
            <FaPhoneVolume />
          </span>
          <p className='text-[#164154]'><a href="tel:+917989909734">+917989909734</a></p>
        </div>

        <div className="hidden md:flex justify-start mt-4 md:mt-0 md:-ml-[80px]">
          <img src={logo} className='w-20 h-[200px] md:w-auto'></img>
        </div>
      </div>

      <div className="w-full md:w-1/5 flex flex-col gap-3 mt-4 md:mt-0">
        <h2 className='text-2xl md:text-3xl font-semibold mb-2 md:mb-6 text-[#164154]'>Quick Links</h2>
        <div className="flex flex-col gap-2 text-[#164154]">
          <p><a href='/about'>About Us</a></p>
          <p><a href='/catalog/mountains'>Mountain Trips</a></p>
          <p><a href='/catalog/bike-trip'>Bike Trips</a></p>
          <p><a href='/catalog/solo-trip'>Solo Trips</a></p>
        </div>

        <div className="mt-4 md:mt-6">
          <h2 className='text-2xl md:text-3xl font-semibold mb-2 md:mb-6 text-[#164154]'>Follow Us</h2>
          <div className="flex gap-3 items-center">
            <a href="https://www.instagram.com/we.the_sage/" target="_blank">
              <FaInstagram className='text-[#f038b9] text-2xl md:text-3xl'/>
            </a>
            <a href="https://www.linkedin.com/company/wethesage/" target="_blank" className='text-[#064fbd] text-2xl md:text-[33px]'>
              <CiLinkedin /> 
            </a>
          </div>
        </div>
      </div>

      <div className="text-[#164154] w-full md:w-1/4 flex flex-col gap-3 mt-4 md:mt-0">
        <h1 className='text-2xl md:text-3xl font-semibold mb-2 md:mb-6 text-[#164154]'>Services</h1>

        <div className="flex flex-col gap-2 text-[#164154]">
          <p><a href="">Privacy Policy</a></p>
          <p><a href="">Terms and Conditions</a></p>
          <p><a href="">FAQs</a></p>
          <p><a href="">Refund & Cancellation Policy</a></p>
        </div>
      </div>

      <div className="w-full h-fit md:w-[30%] p-3 bg-gray-200 rounded-md text-[#164154] bg-[#fff] md:bg-[#fff] mt-4 md:mt-0">
        <h2 className='text-[20px] md:text-[25px] font-semibold text-center'>Join Our Newsletter</h2>
        <p className='p-2 md:p-3'>For our upcoming trips, blogs on transformative travel, exciting discounts and more.</p>
        <input type="email" placeholder="Enter your email" className="w-full p-2 my-2 border rounded"/>
        <button className="w-full p-2 bg-[#BCAD3C] text-white rounded">SUBSCRIBE</button>
      </div>
    </div>
  );
};

export default Footer;
