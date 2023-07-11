import { ChevronDownIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import Channel from "./Channel";
import CreateChannel from "./CreateChannel";

const Server = ({ name }) => {
  const [serverTitle, setServerTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [channel,setChannel] = useState('')

  useEffect(() => {
    setServerTitle(name);
  }, [name]);

  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
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
                className="h-5  cursor-pointer ml-5  "
                onClick={handleClick}
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {!serverTitle ? null : <Channel serverName={serverTitle} channelName={channel} />}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="overlay">
          <CreateChannel set={setIsOpen} selectedServer={serverTitle} setChannel={setChannel} />
        </div>
      )}
    </>
  );
};

export default Server;
