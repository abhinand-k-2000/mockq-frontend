import  { useState } from 'react'
import CandidateNavbar from '../../components/candidate/CandidateNavbar'

const Account = () => {
  const [name, setName] = useState('Abhinand K');
  const [phoneNumber, setPhoneNumber] = useState('8089543705');
  const [email, setEmail] = useState('abhinand2000@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <>
      <CandidateNavbar />

      <div className="flex pt-20 justify-center w-screen items-center h-screen bg-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-1/2 max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
              <div className="flex">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-l focus:outline-none"
                />
                <button className="bg-black text-white px-4 py-2 rounded-r">Update Name</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">Phone Number</label>
              <p className="text-gray-600 text-sm mb-2">We'll need your phone number for account access and security purposes.</p>
              <div className="flex">
                <input
                  type="text"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-l focus:outline-none"
                />
                <button className="bg-black text-white px-4 py-2 rounded-r">Update Phone Number</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
              <p className="text-gray-600 text-sm mb-2">We will need this email to send notifications and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-l focus:outline-none"
                />
                <button className="bg-black text-white px-4 py-2 rounded-r">Update Email</button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Change Password</label>
              <p className="text-gray-600 text-sm mb-2">Use 8 or more characters with a mix of uppercase, lowercase letters and special characters as password.</p>
              <div className="flex mb-2">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-l focus:outline-none"
                />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-r focus:outline-none"
                />
              </div>
              <button className="bg-black text-white w-full py-2 rounded">Change Password</button>
            </div>
          </div>
        </div>
      </div>


  
  
    
    
    </>
  )
}

export default Account