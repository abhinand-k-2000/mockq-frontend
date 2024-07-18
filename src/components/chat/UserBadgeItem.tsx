import { Chip } from '@material-tailwind/react'
import React from 'react'

const UserBadgeItem = ({user, handleFunction}) => {
    console.log('insdie user badetg: ', user)
  return (

    <Chip 
    className='m-1'
    color='indigo'
    value={user.name}
    onClose={handleFunction}

    />

  )
}

export default UserBadgeItem