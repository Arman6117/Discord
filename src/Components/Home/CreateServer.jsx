import React, { useRef, useState } from "react";
import { CameraIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import ReactLoading from "react-loading";
import { createServer } from "../../api";


const CreateServer = ({ set }) => {
  //!States for data
  const [selectedImage, setSelectedImage] = useState(null);
  const [serverName, setServerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iconName, setIconName] = useState("");
  const handleClose = () => {
    set(false);
  };
  const fileInput = useRef(null);
  const handleFileInput = () => {
    fileInput.current.click();
  };

  //!Handle Image file
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setIconName(file.name);
  };

  //!Check for empty string in server name
  const isDisabled = serverName.trim() === "";

  //!Handle Server name change
  const handleServerNameChange = (event) => {
    const name = event.target.value;
    setServerName(name);
  };
  const reset = () => {
    setServerName("");
    setSelectedImage(null);
    setIsLoading(false);
    set(false);
  };
  //!Handle whole form submit
  const handleFormSubmit = async (event) => {
    try {
      await createServer(event, setIsLoading, selectedImage, serverName);

      //!Clear input values
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col rounded-md bg-white   left-[24%] top-[15%]  h-[27rem] w-[32rem] absolute items-center text-center   ">
          <XIcon
            className="absolute h-6 text-gray-700 mt-3 right-0 mr-3 cursor-pointer"
            onClick={handleClose}
          />
          <div className="flex flex-col p-8 ">
            <h1 className="relative font-black text-3xl  top-6 ">
              Customize your server
            </h1>
            <p className="relative text-gray-600 font-light text-lg top-10">
              Give your new server a personality with name and a icon.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="relative bg-white border-gray-700 mt-8 border-4 border-dashed w-20 h-20 rounded-full"
              onClick={handleFileInput}
            >
              <PlusIcon className="absolute h-6 p-1 right-0 cursor-pointer bg-discord_purple text-white rounded-full " />
              <div>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  ref={fileInput}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <CameraIcon className="h-8 text-gray-700 relative top-5 left-5" />
              </div>
            </div>
            <span className=" absolute top-[17rem] ">{iconName}</span>

            <div className="relative mt-8">
              <input
                type="text"
                placeholder="Enter name for your server..."
                className="w-72 h-12 text-center outline-none text-xl font-semibold text-gray-900 border-gray-800 border-[3px] rounded-lg"
                value={serverName}
                onChange={handleServerNameChange}
              />
            </div>
          </div>
          <div>
            <button
              className="mt-6 bg-discord_blue w-36 h-10 text-white font-bold rounded-2xl"
              disabled={isDisabled || isLoading}
              id="submit"
            >
              {isLoading ? (
                <ReactLoading
                  type="spin"
                  color="white"
                  height={20}
                  width={20}
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

export default CreateServer;
