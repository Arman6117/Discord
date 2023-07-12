import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Server from "./ServerInfo";
import Chat from './chat'
import { PlusIcon } from "@heroicons/react/outline";
import {
  cacheServerIcons,
  fetchServerDataForCache,
} from "../../service-worker.js";

// import Channel from "./Channel";
import CreateServer from "./CreateServer";
import ServerIcon from "./ServerIcon";

//!ICON
import discord from "../../images/discord.png";

const Home = () => {
  useEffect(() => {
    const fetchAndCacheData = async () => {
      const { serverIcons } = await fetchServerDataForCache();
      cacheServerIcons(serverIcons);
    };

    fetchAndCacheData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [server, setServer] = useState([]);
  const [serverName, setServerName] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchServerDataFromCache = async () => {
      const { serverData } = await fetchServerDataForCache();
      setServer(serverData);
    };

    if (user) {
      fetchServerDataFromCache();
    }
  }, [user]);

  const handleIconClick = (e) => {
    const name = e.target.alt;
    setServerName(name);
  };

  return (
    <>
      {!user && navigate("/")}
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max">
          <div className="server_default hover:bg-discord_purple">
            <img src={discord} alt="" className="h-8" />
          </div>
          <hr className="border-gray-700 w-8 mx-auto border" />
          <div className="flex flex-col gap-3" onClick={handleIconClick}>
            {server.map((server) => (
              <ServerIcon
                key={server.id}
                icon={server.image}
                title={server.name}
              />
            ))}
          </div>
          <div className="server_default  hover:bg-discord_green group">
            <PlusIcon
              className="h-7 text-discord_green group-hover:text-white"
              onClick={handleClick}
            />
          </div>
        </div>
        {isOpen && (
          <div className="overlay">
            <CreateServer set={setIsOpen} />
          </div>
        )}

        <div>
          <Server name={serverName} />
        </div>
        <div className="bg-[#36393f]  flex-grow">
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
