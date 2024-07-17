import { Avatar } from '@material-tailwind/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div 
      onClick={handleFunction}
      className="flex items-center p-4 mb-2 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
    >
      <Avatar alt='avatar' src={user.avatar || 'https://via.placeholder.com/150'} className="mr-4" />
      <div className="flex flex-col">
        <span className="font-semibold text-lg">{user.name}</span>
        <span className="text-gray-500">{user.email}</span>
      </div>
    </div>
  )
}

export default UserListItem
