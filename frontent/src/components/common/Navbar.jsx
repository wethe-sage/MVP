import React, { useEffect, useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../Data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { listingEndpoints } from '../../services/api';
import sageMainLogo from '../../../SageMain/logoMain.png';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiConnector('GET', listingEndpoints.LISTING_CAREGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.error('Could not fetch Categories.', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="h-14 border-b-[1px] border-b-richblack-500 bg-[#164154]">
      <div className="mx-auto flex w-11/12 max-w-maxContent items-center text-white justify-between mt-2 ">
        <Link to="/" className="text-2xl font-bold text-white">
          <img className="object-contain h-[45px]" src={sageMainLogo} alt="Sage Main Logo" />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden -mr-[180px]">
          <button className="text-white focus:outline-none" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="flex justify-end p-4">
              <button className="text-white text-2xl" onClick={() => setMobileMenuOpen(false)}>
                ✕
              </button>
            </div>
            <ul className="flex flex-col items-center z-[400] bg-[#F0F2F6] gap-[20px] h-[95vh]">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="border border-[#BCAD3C] w-full text-black rounded-md text-center p-3">
                  {link.title === 'Catalog' ? (
                    <div className="relative text-center text-black font-bold text-xl gap-2 group">
                      <div className="">
                        <p className="text-center">{link.title}</p>
                      </div>
                      <div className="opacity-0 absolute left-[50%] translate-x-[-50%] translate-y-[15%] z-50 flex flex-col rounded-md gap-y-[10px] bg-richblack-200 p-4 text-richblack-900 transition-all duration-200 group-hover:opacity-100 lg:w-[200px] text-justify text-lg ">
                        <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded text-center bg-richblack-200"></div>

                        {subLinks.length ? (
                          subLinks.map((subLink, index) => (
                            <Link to={`/catalog/${subLink.name.split(' ').join('-').toLowerCase()}`} key={index}>
                              <p className=" p-2 rounded-md hover:bg-richblack-50" onClick={() => setMobileMenuOpen(false)}>
                                {subLink.name}
                              </p>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path} className={`${matchRoute(link?.path) ? 'text-[#BCAD3C] font-bold text-xl ' : 'text-black font-bold text-xl'}`} onClick={() => setMobileMenuOpen(false)}>
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === 'Catalog' ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div className="opacity-0 absolute left-[50%] translate-x-[-50%] translate-y-[65%] z-50 flex flex-col rounded-md gap-y-[10px] bg-richblack-5 p-4 text-richblack-900 transition-all duration-200 group-hover:opacity-100 lg:w-[200px] text-justify text-lg ">
                      <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5"></div>

                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link to={`/catalog/${subLink.name.split(' ').join('-').toLowerCase()}`} key={index}>
                            <p className=" p-2 rounded-md hover:bg-richblack-50">{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard for Desktop */}
        <div className="flex items-center w md:block">
          {!token ? (
            <>
              <Link to="/login" className="text-white">
                <button className="border border-richblack-700 bg-yellow-150 w-[90px] px-[12px] uppercase py-[8px] text-white rounded-md">
                  Log in
                </button>
              </Link>
              <Link to="/signup" className="text-white">
                <button className="border ml-[20px] border-[#BCAD3C] bg-transparent w-[110px] px-[12px] uppercase py-[8px] text-white rounded-md">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
