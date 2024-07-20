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
  Spinner,
} from "@material-tailwind/react";
import { createGroup, getAllPremiumCandidates } from "../../api/candidateApi";
import toast from "react-hot-toast";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setChats } from "../../redux/slice/chatSlice";
import { FaUsers } from "react-icons/fa";
 
const  GroupChatModal = ({open, handleOpen}) => {

    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const chats = useSelector((state: RootState) => state.chat.chats)
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
        if(!groupChatName || selectedUsers.length < 2) {
          toast.error('Please provide a group chat name and select at least 2 users.', {
            style: {
              border: '1px solid #dc3545', 
              padding: '16px',
              color: '#721c24', 
              backgroundColor: '#f8d7da', 
            },
            iconTheme: {
              primary: '#dc3545',
              secondary: '#721c24',
            },
          });
            return 
        }
        console.log('insdie handle sujbitttttttt')
        const users = JSON.stringify(selectedUsers.map(u => u._id))
        const response = await createGroup(groupChatName, users )
        dispatch(setChats([response, ...chats]))
        setGroupChatName("")
        setSelectedUsers([])
        handleOpen()

    }

 
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem] shadow-xl">
        <CardHeader
          color="blue"
          className="mb-4 grid h-24 place-items-center bg-gradient-to-r from-[#142057] to-[#19328F]"
        >
          <Typography variant="h3" color="white" className="flex items-center">
            <FaUsers className="mr-2" /> Create Group
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Group Name"
            size="lg"
            onChange={(e) => setGroupChatName(e.target.value)}
            className="border-blue-gray-200 focus:border-blue-500"
          />
          <Input
            label="Search members"
            size="lg"
            onChange={(e) => handleSearch(e.target.value)}
            className="border-blue-gray-200 focus:border-blue-500"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedUsers.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => handleDelete(user)}
              />
            ))}
          </div>
          <div className="max-h-40 flex flex-col justify-center overflow-y-auto">
            {loading ? (
                <Spinner />
            ) : (
              searchResult.slice(0, 4).map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
            )}
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#142057] to-[#19328F] hover:from-[#1442E1] hover:to-[#1736B6] transition-all duration-300"
            fullWidth
          >
            Create Group
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}

export default GroupChatModal