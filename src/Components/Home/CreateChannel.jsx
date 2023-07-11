import { HashtagIcon, XIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { createChannel } from "../../api/index";
const CreateChannel = ({ set, selectedServer,setChannel }) => {
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    set(false);
  };
  //! Handle input value change
  const handleChange = (event) => {
    const name = event.target.value;
    setChannelName(name);
  };
  
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await createChannel(event, channelName, selectedServer, setIsLoading);

      setChannel(channelName)
      reset();
    } catch (error) {
      console.log(error.message);
      reset();
    }
  };

  //! Checking empty string
  const isDisabled = channelName.trim() === "";
  useEffect(() => {
    if (isDisabled) {
      document.querySelector("button").style.background = "red";
    } else {
      document.querySelector("button").style.background = "rgb(64 78 237 )";
    }
  });

  //!Resetting input value
  const reset = () => {
    setChannelName("");
    set(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col h-72 w-96 bg-[#313338] rounded-2xl m-auto mt-44 p-6">
          <XIcon
            className="relative  text-gray-400  left-36  cursor-pointer"
            onClick={handleClose}
          />
          <div className="flex flex-col text-start ">
            <h1 className="font-bold text-xl text-white ">Create a channel</h1>
            <label className="text-[#ced1d5] font-bold relative top-12">
              Channel Name
            </label>
            <input
              type="text"
              value={channelName}
              onChange={handleChange}
              className="flex overflow-hidden relative top-20 h-9 outline-none bg-[#1e1f22] text-white px-12 py-5 rounded-lg "
            />
            <HashtagIcon className="h-5 text-[#c7cacd] relative top-12 right-36 overflow-hidden" />
          </div>
          <div className="flex  justify-center">
            <button
              disabled={isDisabled}
              className="bg-discord_purple relative  mt-20 rounded-xl w-40 text-white font-semibold  p-1 "
            >
              {isLoading ? (
                <ReactLoading
                  color="white"
                  height={20}
                  width={25}
                  className="relative m-auto"
                />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateChannel;
