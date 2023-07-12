import { ChevronDownIcon, CogIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import Channel from "./Channel";
import CreateChannel from "./CreateChannel";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Server = ({ name }) => {
  const [serverTitle, setServerTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [channel, setChannel] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    setServerTitle(name);
  }, [name]);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {!user && navigate("/")}
      <div className="flex h-screen">
        <div className="bg-[#2f3136] flex flex-col min-w-max ">
          <h2 className="flex text-white font-bold items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373c] cursor-pointer  shadow-md">
            {!serverTitle ? "Direct Messages" : serverTitle}
            <ChevronDownIcon className="h-5 ml-2" />
          </h2>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide mt-3 ">
            <div className="flex items-center p-3 mb-2 hover:text-white  ">
              {!serverTitle ? null : <ChevronDownIcon className="h-3  mr-2" />}

              <h4 className="  font-semibold">
                {!serverTitle ? "Direct Messages" : "Text Channels"}
              </h4>

              <PlusIcon
                className="h-5  cursor-pointer ml-auto  "
                onClick={handleClick}
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {!serverTitle ? null : (
                <Channel serverName={serverTitle} channelName={channel} />
              )}
            </div>
          </div>
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-1">
              <img
                src={user?.photoURL}
                className="h-10 rounded-full  cursor-pointer"
                onClick={() => auth.signOut()}
                alt="userImage"
              />
              <h4 className="text-white font-medium text-xs">
                {user?.displayName}
                <span className="text-[#b9bbbe] block">
                  #{user?.uid.substring(0,4)}
                </span>
              </h4>
            </div>
            <div className="text-gray-400 flex items-center">
              <div className="icon-container">
                <MicrophoneIcon className="h-5 icon" />
              </div>
              <div className="icon-container">
                <PhoneIcon className="h-5 icon" />
              </div>
              <div className="icon-container">
                <CogIcon className="h-5 icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="overlay">
          <CreateChannel
            set={setIsOpen}
            selectedServer={serverTitle}
            setChannel={setChannel}
          />
        </div>
      )}
    </>
  );
};

export default Server;
