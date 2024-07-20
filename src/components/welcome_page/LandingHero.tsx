import { motion } from 'framer-motion';
import { FaStar, FaUserTie } from 'react-icons/fa';
import main from '/main.png'


const LandingHero = () => {
  return (
    <div className=" p-20  rounded-lg ">
      <div className="container bg-gradient-to-r from-[#f6f8fce3] to-[#e9f2ff]  rounded-lg mx-auto px-4 sm:px-6 lg:px-8  ">
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <motion.div 
            className='flex flex-col max-w-xl mb-10 md:mb-0'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
              Land Your <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-[#c6dcec]">Dream </span> Job
            </h1>
            <h5 className="text-xl md:text-2xl font-semibold text-gray-600 mb-6">
              1-on-1 interview preparation sessions
            </h5>
            <p className="text-gray-700 mb-2  text-lg">
              Elevate your interview game! Professionals from top tech companies offer mock interviews and dedicated mentorship sessions, gearing you up for success.
            </p>

            <div className='flex items-center space-x-5'>

            <div className="flex items-center ">
              <FaUserTie className="text-blue-700 mr-2" />
              <span className="font-semibold text-blue-900">4000+<span  className='text-gray-600'>  sessions coached</span></span>
            </div>

            <div className="flex items-center ">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="font-semibold text-blue-900">4.96 <span className='text-gray-600'>average rating</span></span>
            </div>
            
            </div>
    
          </motion.div>

          <motion.div 
            className='w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={main} alt="Interview preparation" className='w-full max-w-md rounded-lg ' />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;