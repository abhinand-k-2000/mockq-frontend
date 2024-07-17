import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
  Input,
} from "@material-tailwind/react";
import { createGroup, getAllPremiumCandidates } from "../../api/candidateApi";
import toast from "react-hot-toast";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setChats } from "../../redux/slice/chatSlice";
 
const  GroupChatModal = ({open, handleOpen}) => {

    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const chats = useSelector((state: RootState) => state.chat.chats)
    // const selectedChat = useSelector((state: RootState) => state.chat.selectedChat)
    const dispatch = useDispatch()



    const handleSearch = async (query: string) => {
        setSearch(query);
        if(!query) return 

        try {
            setLoading(true)
            const response = await getAllPremiumCandidates(query)
            setLoading(false)
            setSearchResult(response.data)
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        }
    }

    
    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
            toast.error("User already added")
            return 
        }

        setSelectedUsers([...selectedUsers, userToAdd])
    }
    
    const handleDelete = (userToDelete) => {
        setSelectedUsers(selectedUsers.filter(user => user._id !== userToDelete._id))
    }



    const handleSubmit = async() => {
        if(!groupChatName || !selectedUsers) {
            toast.error('Fill the fields')
            return 
        }
        const users = JSON.stringify(selectedUsers.map(u => u._id))
        const response = await createGroup(groupChatName, users )
        dispatch(setChats([response, ...chats]))
        handleOpen()

    }

 
  return (
    <Dialog
    size="xs"
    open={open}
    handler={handleOpen}
    className="bg-transparent shadow-none"
  >
    <Card className="mx-auto w-full max-w-[24rem]">
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h4" color="blue-gray">
          Create Group
        </Typography>
        <Typography className="-mb-2" variant="h6">
          Group Name
        </Typography>
        <Input
          label="Group Name"
          size="lg"
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <Typography className="-mb-2" variant="h6">
          Group Members
        </Typography>
        <Input
          label="Add members here"
          size="lg"
        //   value={groupDescription}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </CardBody>

            <Typography className="flex flex-wrap justify-center">
                {
                    selectedUsers.map(user => (
                        <UserBadgeItem key={user._id} user={user} handleFunction={()=> handleDelete(user) }/>
                    ))
                }
            </Typography>

            {
                loading ? (<p className="text-center p-4">loading</p>) : (
                  searchResult.slice(0, 2).map(user => (
                    <UserListItem user={user} handleFunction={() => handleGroup(user)}/>
                ))
                )
            }

      <CardFooter className="pt-0 text-right">
        <Button  onClick={handleSubmit}  className="bg-[#0F1F5C]"
        // onClick={handleSubmit} fullWidth
        >
          Create Group
        </Button>
      </CardFooter>
    </Card>
  </Dialog>
  );
}

export default GroupChatModal