import React from "react";
import { testimonialsData, assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 py-12"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>

      <p className="text-lg text-gray-600 mb-12">
        What Our Users Are Saying
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md w-80 hover:scale-105 transition-all duration-300"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-14 rounded-full mx-auto"
            />

            <h2 className="text-xl font-semibold mt-3">
              {testimonial.name}
            </h2>

            <p className="text-gray-500 mb-4">
              {testimonial.role}
            </p>

            <div className="flex justify-center mb-4">
              {Array(testimonial.stars)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={assets.rating_star}
                    alt=""
                    className="w-4"
                  />
                ))}
            </div>

            <p className="text-gray-600 text-sm">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;