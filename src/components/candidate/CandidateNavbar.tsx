import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getNotifications, logout } from "../../api/candidateApi";
import { useDispatch } from "react-redux";
import { candidateLogout } from "../../redux/slice/authSlice";
import { IoPersonCircle, IoLogOut } from "react-icons/io5";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  List,
  ListItem,
  Badge,
} from "@material-tailwind/react";
import { FaBell } from "react-icons/fa";

interface INotification {
  userId: string;
  heading: string;
  message: string;
  read: boolean;
  feedbackId?: string; 

}



const CandidateNavbar: React.FC = () => {
  const [navBg, setNavBg] = useState("#D9E9FF");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notificationButton, setNotificationButton] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    try {
      const list = await getNotifications();
      setNotifications(list.data);
      console.log(list.data)
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleScroll = () => {
    setNavBg(window.scrollY > 0 ? "#EEF5FF" : "#D9E9FF");
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        toast.success("Log out successful", {
          style: {
            border: "1px solid #2F76FF",
            padding: "16px",
            color: "#19328F",
            backgroundColor: "#D9E9FF",
          },
        });
        dispatch(candidateLogout());
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleClick =(item: INotification) => {
    console.log("ckkk:", item)
    if(item.feedbackId){
      navigate(`/candidate/feedback/${item.feedbackId}`)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    fetchNotifications();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4"
      style={{ backgroundColor: navBg }}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          onClick={() => navigate("/candidate/home")}
          className="mr-4 cursor-pointer py-1.5 font-bold text-4xl text-[#142057]"
        >
          MockQ
        </Typography>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-bold"
              >
                <Link to="/candidate/outsourced-interviews" className="flex items-center">
                  Outsourced Interviews
                </Link>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-bold"
              >
                <Link to="/candidate/analytics" className="flex items-center">
                  Analytics
                </Link>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-bold"
              >
                <Link to="/candidate/community-chat" className="flex items-center">
                  Community
                </Link>
              </Typography>
            </ul>
          </div>


          <div className="relative">
        <Badge content={notifications.length} invisible={notifications.length === 0} overlap='circular'>
          <Button
            variant="text"  
            color="blue-gray"
            className="flex items-center gap-1 rounded-full p-2 lg:ml-auto"
            onClick={() => setNotificationButton(!notificationButton)}
          >
            <FaBell className="h-6 w-6 text-[#6D98B4]" />
          </Button>
        </Badge>
        {notificationButton && (
          <Card className="absolute right-0 top-12 w-96 max-h-[70vh] overflow-y-auto shadow-xl">
            <List>
              {notifications.length > 0 ? (
                notifications.map((item, index) => (
                  <ListItem key={index} className="hover:bg-blue-gray-50" onClick={() =>handleClick(item) }>
                    <div >
                      <Typography variant="h6" color="blue-gray" className="font-semibold">
                        {item.heading}
                      </Typography>
                      <Typography variant="small" color="gray" className="font-normal">
                        {item.message}
                      </Typography>
                    </div>
                  </ListItem>
                ))
              ) : (
                <ListItem className="flex flex-col items-center justify-center py-8">
                  <FaBell className="h-12 w-12 text-blue-gray-300 mb-2" />
                  <Typography variant="h6" color="blue-gray" className="font-semibold">
                    No notifications
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal text-center">
                    You're all caught up! Check back later for new updates.
                  </Typography>
                </ListItem>
              )}
            </List>
          </Card>
        )}
      </div>



          <Menu>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt="user avatar"
                className="cursor-pointer"
                src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-1047-840229.png?f=webp&w=256"
              />
            </MenuHandler>
            <MenuList className="bg-[#EEF5FF]">
              <MenuItem className="flex items-center gap-2">
                <IoPersonCircle className="h-4 w-4" />
                <Typography variant="small" className="font-medium">
                  My Profile
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem className="flex items-center gap-2" onClick={handleLogout}>
                <IoLogOut className="h-4 w-4" />
                <Typography variant="small" className="font-medium">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
};

export default CandidateNavbar;