import React from "react";
// import './Font.scss'
import { DownloadIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
//!IMAGES
import foreground from "../../images/foreground.png";
import rightImg from "../../images/Image right.png";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-discord_purple pd-8 md:pb-0">
        <div className=" lg:p-64 sm:py-20 sm:p-16 pt-[70px]  pl-12 pr-16 lg:items-center md:p  lg:py-32 h-screen md:flex relative">
          <div className="flex flex-col md:max-w-xl lg:max-w-none lg:text-center md:text-start gap-7 ">
            <h1
              style={{ fontFamily: "gintoNord" }}
              className="md:text-[3.5rem] text-[6vw]  text-white font-bold lg:max-w-full md:max-w-md w-full"
            >
              IMAGINE A PLACE...
            </h1>
            <h2 className="text-white md:text-[23px] text-[3.8vw] lg:text-lg font-light tracking-wide z-10">
              ..where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </h2>
            <div className="flex md:flex-row items-start lg:items-center gap-7 z-10 flex-col lg:flex-col">
              <a href="https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86">
                <button className="btn-1">
                  <DownloadIcon className=" w-6 relative" />
                  Download for Windows
                </button>
              </a>

              <button className="btn-2">Open Discord in your browser</button>
            </div>
          </div>
          <div className="flex overflow-hidden ">
            <div
              className="  absolute left-0 bottom-0 w-full h-full overflow-hidden hidden sm:block"
              style={{
                backgroundImage: `url(${foreground})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="flex overflow-hidden">
              <div className="  w-full h-full">
                <img
                  src={rightImg}
                  alt=""
                  className="absolute bottom-0  md:-right-[0rem] xl:-right-[0rem] lg:-right-[25rem]  object-cover  sm:object-none w-auto h-auto"
                  style={{ zIndex: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
