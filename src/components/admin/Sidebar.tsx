import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="bg-blue-800 text-white w-64">
    <div className="p-4 ">
      <h2 className="text-4xl font-bold mb-4 text-center p-1" >MockQ</h2>
      <ul className='mt-10 flex flex-col space-y-5'>
        <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/dashboard" className="block py-2">Home</Link></li>
        <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/candidates" className="block py-2">Candidates</Link></li>
        <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/interviewers" className="block py-2">Interviewers</Link></li>
        <li className='bg-[#D9E9FF] text-black hover:bg-[#BCD8FF] shadow-lg rounded-lg text-center'><Link to="/admin/stacks" className="block py-2">Stacks</Link></li>
      </ul>
    </div>
  </aside>
  )
}

export default Sidebar