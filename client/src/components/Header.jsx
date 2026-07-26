import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-16"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Badge */}
      <motion.div
        className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-gray-600 font-medium">
          Best text to image generator
        </p>

        <img src={assets.star_icon} alt="" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl sm:text-6xl font-semibold max-w-3xl mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Turn text to{" "}
        <motion.span
          className="text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          image
        </motion.span>
        , in seconds.
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-center max-w-3xl mx-auto mt-6 text-gray-600 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Unleash your creativity with our AI-powered text-to-image generator.
        Transform your ideas into stunning visuals effortlessly – just type,
        and watch the magic happen.
      </motion.p>

      {/* Generate Button */}
      <motion.button
        onClick={onClickHandler}
        className="mt-8 flex items-center gap-2 bg-black text-white px-10 py-3 rounded-full text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Generate Image

        <img
          className="h-6"
          src={assets.star_group}
          alt=""
        />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {Array(6)
          .fill("")
          .map((_, index) => (
            <motion.img
              key={index}
              src={
                index % 2 === 0
                  ? assets.sample_img_2
                  : assets.sample_img_1
              }
              alt="Sample"
              className="w-16 sm:w-20 rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          ))}
      </motion.div>

      <motion.p
        className="mt-3 text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        Generated images from Pexico
      </motion.p>
    </motion.div>
  );
};

export default Header;