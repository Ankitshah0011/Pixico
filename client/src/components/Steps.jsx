import React from "react";
import { stepsData } from "../assets/assets";
import {motion} from 'framer-motion'

const Steps = () => {
  return (
    <motion.div 
    
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    
    
    className="flex flex-col items-center justify-center my-32">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        How it works
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Transform words into stunning images
      </p>

      <div className="space-y-4 w-full max-w-3xl">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300"
          >
            <img src={item.icon} alt="" className="w-12" />

            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;