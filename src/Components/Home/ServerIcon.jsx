import React from "react";

const ServerIcon = ({ icon, title }) => {
  return (
    <>
      
        <div className="w-12 h-12 overflow-hidden rounded-full cursor-pointer hover:rounded-2xl">
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
    
    </>
  );
};

export default ServerIcon;
