import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center my-24 p-6 md:px-28"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>

      <p className="text-lg text-gray-600 mb-12">
        Turn Your Imagination into Visualization
      </p>

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left Image */}
        <img
          src={assets.sample_img_1}
          alt="Sample"
          className="w-80 xl:w-96 rounded-lg"
        />

        {/* Right Content */}
        <div className="text-left">
          <h2 className="text-2xl font-semibold mb-4">
            Introducing the AI-powered Text to Image Generator
          </h2>

          <p className="text-gray-600 mb-4">
            Our AI-powered text-to-image generator is a cutting-edge tool that
            transforms your written descriptions into stunning visual
            representations.
          </p>

          <p className="text-gray-600">
            By leveraging advanced machine learning algorithms, our generator
            interprets the nuances of your text and creates high-quality images
            that bring your ideas to life. Whether you're an artist, designer,
            or simply looking to visualize concepts, our tool offers a seamless
            and intuitive experience.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;