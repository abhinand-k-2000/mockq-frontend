











import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti'

const PaymentSuccess = () => {
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg viewBox="0 0 24 24" className="text-green-500 w-24 h-24 mx-auto mb-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
          </svg>
        </motion.div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">Thank you for completing your secure online payment. Your transaction has been processed successfully.</p>
        <p className="text-indigo-600 font-semibold mb-8">Have a great day and enjoy your interview session!</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/candidate/home" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:shadow-lg"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PaymentSuccess;








// // import { Link } from 'react-router-dom'

// // const PaymentSuccess = () => {
// //   return (
// //     <div className="bg-gray-100 pt-40 h-screen">
// //     <div className="bg-white p-6  md:mx-auto">
// //       <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
// //           <path fill="currentColor"
// //               d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
// //           </path>
// //       </svg>
// //       <div className="text-center">
// //           <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
// //           <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
// //           <p> Have a great day!  </p>
// //           <div className="py-10 text-center">
// //               <Link to="/candidate/home" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
// //                   GO BACK 
// //              </Link>
// //           </div>
// //       </div>
// //   </div>
// // </div>
// //   )
// // }

// // export default PaymentSuccess