import React, { useRef, useEffect, useState } from "react";
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
import { sendMessage } from "../../api/index";
import { getMessages } from "../../api/index";
import Message from "./Message";
const Chat = ({ serverName }) => {
  const [messages, setMessages] = useState([]);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);

  const inputRef = useRef("");

  const chatRef = useRef(null);
  useEffect(() => {
    const fetchMessages = async () => {
      if (channelName && serverName) {
        const fetchedMessages = await getMessages(serverName, channelName);
        setMessages(fetchedMessages);
      }
    };

    const messageUpdateInterval = setInterval(fetchMessages, 1000);

    fetchMessages();

    return () => {
      clearInterval(messageUpdateInterval);
    };
  }, [channelName, serverName,messages]);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleSubmit = async (event) => {
    
  const displayName = user.displayName;
  const photoURL = user.photoURL;
  const email = user.email;
    await sendMessage(
      event,
      channelId,
      inputRef,
      serverName,
      channelName,
      displayName,
      photoURL,
      email
    );
    scrollToBottom();
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
        <main className="flex-grow overflow-y-scroll scrollbar-hide">
          {messages?.map((data) => {
            const { message, timeStamp, user, userImage, email } = data;

            return (
              <Message
                id={data.id}
                key={data.id}
                message={message}
                timeStamp={timeStamp}
                name={user}
                email={email}
                photo={userImage}
                server={serverName}
                channel={channelName}
              />
            );
          })}

          <div ref={chatRef} className="pb-16" />
        </main>
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
            <button hidden type="submit" onClick={handleSubmit}>
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
