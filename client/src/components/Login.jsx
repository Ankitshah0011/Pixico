import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");

  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(
          backendUrl + "/api/user/login",
          {
            email,
            password,
          }
        );

        if (data.success) {
          setToken(data.token);
          setUser(data.user);

          localStorage.setItem("token", data.token);

          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        if (data.success) {
          setToken(data.token);
          setUser(data.user);

          localStorage.setItem("token", data.token);

          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-96"
      >
        {/* Close Button */}
        <img
          src={assets.cross_icon}
          alt=""
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 w-4 cursor-pointer"
        />

        {/* Heading */}
        <h1 className="text-center text-3xl font-semibold text-neutral-700">
          {state}
        </h1>

        {/* Description */}
        <p className="text-sm text-center mt-2 mb-6">
          {state === "Login"
            ? "Welcome Back! Please Sign In To Continue."
            : "Create your account to get started."}
        </p>

        {/* Full Name */}
        {state !== "Login" && (
          <div className="border px-5 py-3 flex items-center gap-3 rounded-full mb-4">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-4 h-4 object-contain"
            />

            <input
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="border px-5 py-3 flex items-center gap-3 rounded-full mb-4">
          <img
            src={assets.email_icon}
            alt=""
            className="w-4 h-4 object-contain"
          />

          <input
            type="email"
            placeholder="Email ID"
            className="outline-none text-sm flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="border px-5 py-3 flex items-center gap-3 rounded-full">
          <img
            src={assets.lock_icon}
            alt=""
            className="w-4 h-4 object-contain"
          />

          <input
            type="password"
            placeholder="Password"
            className="outline-none text-sm flex-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer">
            Forgot Password?
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-full mt-6 hover:bg-blue-700 transition-all"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="text-center mt-5 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Login
            </span>
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Login;