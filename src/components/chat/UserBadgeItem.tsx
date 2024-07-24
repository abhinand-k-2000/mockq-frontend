import { Chip } from '@material-tailwind/react'

interface IUser {
  name: string
}
interface IProps {
  user: IUser;
  handleFunction: () => void;
}

const UserBadgeItem: React.FC<IProps> = ({user, handleFunction}) => {
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