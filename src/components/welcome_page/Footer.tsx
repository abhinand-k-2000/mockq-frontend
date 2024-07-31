import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className='text-4xl font-bold mb-4'>MockQ</h2>
            <div className="flex space-x-4 mt-3">
              <FaTwitter className="text-xl hover:text-blue-300 cursor-pointer transition-colors duration-300" />
              <FaInstagram className="text-xl hover:text-blue-300 cursor-pointer transition-colors duration-300" />
              <FaLinkedinIn className="text-xl hover:text-blue-300 cursor-pointer transition-colors duration-300" />
              <FaFacebook className="text-xl hover:text-blue-300 cursor-pointer transition-colors duration-300" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li>Email: info@mockq.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Interview St, Tech City</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors duration-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-blue-950 py-4">
        <p className="text-center text-sm">© 2024 MockQ. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer; 










    






// import { FaInstagram } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaFacebook } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <>
//     <div className='h-40 mt-10 w-full text-[#EEF5FF] bg-[#0E1434]  grid grid-cols-12'>
//         <div className='col-span-3 flex flex-col justify-center items-center '>
//             <h2 className='text-4xl font-bold'>MockQ</h2>
//             <div className="flex space-x-2 mt-3 cursor-pointer">
//             <FaXTwitter />
//             <FaInstagram />
//             <FaLinkedinIn />
//             <FaFacebook />


//             </div>
//         </div>
//         <div className='col-span-9  flex justify-center items-center '>
//             <ul className='flex  space-x-24  font-medium'>
//                 <li>Contact Information</li>
//                 <li>Resources</li>
//                 <li>About Us</li>
//                 <li>Contact Us</li>
//             </ul>
//         </div>
//     </div>
//     <p className="text-center bg-[#0E1434] font-medium text-sm text-[#EEF5FF] p-5">© 2024 MockQ. All rights reserved.</p>
    
//     </>
//   )
// }

// export default Footer