import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
} from "../../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import {
  BellIcon,
  ChatIcon,
  EmojiHappyIcon,
  GiftIcon,
  HashtagIcon,
  InboxIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  UsersIcon,
} from "@heroicons/react/solid";
// import {useCollection} from 'react-firebase-hooks/'

const Chat = () => {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  //   const [messages] = useCollection()
  const inputRef = useRef("");

  const sendMessage = (event) => {
    event.preventDefault();

    if (inputRef.current.value !== "") {
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between space-x-5 border-b-2 border-gray-800 p-4 -mt-1">
          <div className="flex items-center space-x-1">
            <HashtagIcon className="h-6 text-[#72767d]" />
            <h4 className="text-white font-semibold">{channelName}</h4>
          </div>
          <div className="flex space-x-3">
            <BellIcon className="icon" />
            <ChatIcon className="icon" />
            <UsersIcon className="icon" />
            <div className="flex bg-[#202225] text-xs p-1 rounded-md">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-white pl-1 placeholder-slate-[#72767b]"
              />
              <SearchIcon className="h-4 text-[#72767b]" />
            </div>
            <InboxIcon className="icon" />
            <QuestionMarkCircleIcon className="icon" />
          </div>
        </header>
        <main className="flex-grow overflow-y-scroll scrollbar-hide"></main>
        <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
          <PlusCircleIcon className="icon mr-4 " />
          <form className="flex-grow">
            <input
              type="text"
              disabled={!channelId}
              placeholder={
                channelId ? `Message #${channelName}` : "Select A Channel"
              }
              className="bg-transparent outline-none text-[#dcddde] w-full placeholder-slate-[#72767d] "
              ref={inputRef}
            />
            <button hidden type="submit" onClick={sendMessage}>
              Send
            </button>
          </form>
          <GiftIcon className="icon mr-2" />
          <EmojiHappyIcon className="icon mr-2" />
        </div>
      </div>
    </>
  );
};

export default Chat;
