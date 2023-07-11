import React, { useState,useEffect } from "react";
import { fetchChannelData } from "../../api/index";
import { HashtagIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChannelInfo } from "../../features/channelSlice";
import { auth } from "../../firebase";
const Channel = ({  serverName,channelName }) => {
  const [channel, setServerChannel] = useState([]);
  const [user] = useAuthState(auth)
  
  useEffect(() => {
    const fetchData = async () => {
      const channelData = await fetchChannelData(channelName,serverName);
      setServerChannel(channelData);
    };
    if(user){
    fetchData();
     
    }
  }, [channelName,user,serverName]);
  

  return (
    <>
    <div className="flex flex-col  items-start gap-4 px-1 ">
      {channel.map((channel) => (
        <div className="hover:bg-[#3f4248] p-1 font-medium cursor-pointer items-center rounded-md hover:text-white w-full"  key={channel.id}>
          <HashtagIcon  className="h-5 absolute text-[#c7cacd]   overflow-hidden" />
          <span className="ml-7" >{channel.name}</span>
          </div>
      ))}
      </div>

    </>
  );
};

export default Channel;
