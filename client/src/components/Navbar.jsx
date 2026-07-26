import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const {
    user,
    credit,
    setShowLogin,
    logout,
  } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 sm:w-32 lg:w-40"
        />
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-5 py-2 rounded-full hover:scale-105 transition-all"
            >
              <img
                src={assets.credit_star}
                alt=""
                className="w-5"
              />
              <p>Credits Left : {credit}</p>
            </button>

            <p className="max-sm:hidden">
              Hi, {user.name}
            </p>

            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt=""
                className="w-10 cursor-pointer"
              />

              <div className="absolute hidden group-hover:block top-0 right-0 z-20 pt-12">
                <ul className="bg-white border rounded-lg shadow-lg text-sm min-w-[120px] overflow-hidden">
                  <li
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer"
            >
              Pricing
            </p>

            <button
              onClick={() => setShowLogin(true)}
              className="bg-black text-white px-8 py-2 rounded-full hover:scale-105 transition-all"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;