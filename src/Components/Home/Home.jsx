import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Server } from "./ServerInfo";
import { PlusIcon } from "@heroicons/react/outline";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// import Channel from "./Channel";
import CreateServer from "./CreateServer";
import ServerIcon from "./ServerIcon";

//!ICON
import discord from "../../images/discord.png";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [server, setServer] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsOpen(true);
  };

  

  const fetchServerData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "servers"));
      const serverData = [];

      for (const serverDoc of snapshot.docs) {
        const serverName = serverDoc.data().name;

        const serverSubcollectionRef = doc(db, "servers", serverName);
        const serverSubcollectionDoc = await getDoc(serverSubcollectionRef);

        if (serverSubcollectionDoc.exists()) {
          const subCollectionData = serverSubcollectionDoc.data().subcollection;

          const server = {
            id: serverName,
            ...serverDoc.data(),
            subcollection: subCollectionData,
          };
          serverData.push(server);
        }
      }

      setServer(serverData);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (user) {
    fetchServerData();
  }

  return (
    <>
      {!user && navigate("/")}
      <div className="flex h-screen">
        <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max">
          <div className="server_default hover:bg-discord_purple">
            <img src={discord} alt="" className="h-8" />
          </div>
          <hr className="border-gray-700 w-8 mx-auto border" />
          {server.map((server) => (
            <ServerIcon
              key={server.id}
              icon={server.image}
              title={server.name}
            />
          ))}
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
        <Server />
      </div>
    </>
  );
};

export default Home;
