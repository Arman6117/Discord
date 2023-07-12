import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HashtagIcon } from "@heroicons/react/outline";

import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../features/channelSlice";
import { useNavigate } from "react-router-dom";

const Channel = ({ serverName }) => {
  const [channels, setChannels] = useState([]);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [user, serverName]);

  const fetchData = async () => {
    if (user) {
      const serverQuery = query(collection(db, "servers"), where("name", "==", serverName));
      const serverSnapshot = await getDocs(serverQuery);

      if (!serverSnapshot.empty) {
        const serverDoc = serverSnapshot.docs[0];
        const channelsRef = collection(serverDoc.ref, "channels");
        const channelsSnapshot = await getDocs(channelsRef);

        const channelData = channelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChannels(channelData);
      }
    }
  };

  const handleChannelClick = (channel) => {
    dispatch(
      setChannelInfo({
        channelId: channel.id,
        channelName: channel.name,
      })
    );
    navigate(`/channels/${channel.name}`);
  };

  return (
    <div className="flex flex-col items-start gap-4 px-1">
      {channels.map((channel) => (
        <div
          className="hover:bg-[#3f4248] p-1 font-medium cursor-pointer items-center rounded-md hover:text-white w-full"
          key={channel.id}
          onClick={() => handleChannelClick(channel)}
        >
          <HashtagIcon className="h-5 absolute text-[#c7cacd] overflow-hidden" />
          <span className="ml-7">{channel.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Channel;
