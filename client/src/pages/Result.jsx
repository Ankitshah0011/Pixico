import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);

    try {
      const generatedImage = await generateImage(input);

      if (generatedImage) {
        setImage(generatedImage);
        setIsImageLoaded(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      {/* Image Preview */}
      <div>
        <div className="relative">
          <img
            src={image}
            alt=""
            className="max-w-sm rounded"
          />

          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading
                ? "w-full transition-all duration-[10s]"
                : "w-0"
            }`}
          ></span>
        </div>

        {!isImageLoaded && (
          <div>
            <p className={!loading ? "hidden" : ""}>
              Loading...
            </p>
          </div>
        )}
      </div>

      {/* Input */}
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-400 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            type="text"
            placeholder="Describe What You Want To Generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className="bg-zinc-900 text-white px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}

      {/* Download Section */}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center mt-10">
          <p
            onClick={() => {
              setIsImageLoaded(false);
              setImage(assets.sample_img_1);
              setInput("");
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>

          <a
            href={image}
            download="generated-image.png"
            className="bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;