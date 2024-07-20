import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    <div className='h-40 mt-10 w-full text-[#EEF5FF] bg-[#0E1434]  grid grid-cols-12'>
        <div className='col-span-3 flex flex-col justify-center items-center '>
            <h2 className='text-4xl font-bold'>MockQ</h2>
            <div className="flex space-x-2 mt-3 cursor-pointer">
            <FaXTwitter />
            <FaInstagram />
            <FaLinkedinIn />
            <FaFacebook />


            </div>
        </div>
        <div className='col-span-9  flex justify-center items-center '>
            <ul className='flex  space-x-24  font-medium'>
                <li>Contact Information</li>
                <li>Resources</li>
                <li>About Us</li>
                <li>Contact Us</li>
            </ul>
        </div>
    </div>
    <p className="text-center bg-[#0E1434] font-medium text-sm text-[#EEF5FF] p-5">© 2024 MockQ. All rights reserved.</p>
    
    </>
  )
}

export default Footer