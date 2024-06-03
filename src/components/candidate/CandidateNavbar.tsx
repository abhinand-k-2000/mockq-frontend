import  { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {logout} from '../../api/candidateApi'
import { useDispatch } from 'react-redux';
import { candidateLogout } from '../../redux/slice/authSlice';

const CandidateNavbar = () => {
    const [navBg, setNavBg] = useState("#D9E9FF");
    const navigate = useNavigate()
    const dispatch = useDispatch() 
  
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavBg("#EEF5FF");
      } else {
        setNavBg("#D9E9FF");
      }
    };

    const handleLogout = async () => {
      const response = await logout()
      if(response.success){
        
        toast.success("Log out successful")
        dispatch(candidateLogout())
        navigate('/')
      }
    }
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
  
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <div
        onScroll={handleScroll}
        className={`h-8 fixed bg-[${navBg}]  transition-colors duration-300 w-full flex justify-between items-center p-10`}
      >
        <div>
          <h1 onClick={()=> navigate('/')} className="font-bold text-4xl cursor-pointer text-[#142057]">
            MockQ
          </h1>
        </div>
        <div className=''>
            <ul className='flex space-x-20 font-bold text-[#142057] '>
                <li className='cursor-pointer'><Link to="">Outsourced Interviews</Link></li>
                <li className='cursor-pointer'>Analytics</li>
                <li className='cursor-pointer'>Community</li>
            </ul>
        </div>
        <div className="flex m-10">
          <p className='cursor-pointer font-bold' onClick={handleLogout}>Logout</p>
        </div>
      </div>
    );
}

export default CandidateNavbar 