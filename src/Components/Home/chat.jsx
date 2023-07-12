import { BellIcon, ChatIcon, HashtagIcon, UsersIcon } from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Chat = () => {
    const channelId = useSelector(selectChannelId)
    const channelName= useSelector(selectChannelName)
    const [user] = useAuthState(auth)
  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between space-x-5 border-b-2 border-gray-800 p-4 -mt-1">
            <div className="flex items-center space-x-1">
                <HashtagIcon className="h-6 text-[#72767d]"/>
                <h4 className="text-white font-semibold">{channelName}</h4>
            </div>
            <div>
                <BellIcon  className="icon"/>
                <ChatIcon  className="icon"/>
                <UsersIcon className="icon" />
                <div className="flex bg-[#202225]">
                    <input type="text" placeholder="Search" className="" />
                </div>
            </div>
        </header>
      </div>
    </>
  );
};

export default Chat;
