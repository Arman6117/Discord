import React from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
//!LOGO
import discord from "../../images/discord-logo-white.png";
import { signInWithPopup } from "firebase/auth";
const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
      navigate("/channels");
    } catch (error) {
      alert(error.message);
    } 
  };
  return (
    <>
      <header className="flex items-center bg-discord_purple justify-between py-5 px-[3rem]">
        <a href="/">
          <img src={discord} alt="" className="w-32 h-12 object-contain" />
        </a>
        <div className=" hidden lg:flex space-x-9 relative right-[3rem] ">
          <a href="/" className="link">
            Download
          </a>
          <a href="/" className="link">
            Nitro
          </a>
          <a href="/" className="link">
            Discover
          </a>
          <a href="/" className="link">
            Safety
          </a>
          <a href="/" className="link">
            Support
          </a>
          <a href="/" className="link">
            Blog
          </a>
          <a href="/" className="link">
            Careers
          </a>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-white p-3 rounded-full text-xs md:text-sm px-4 focus:outline-none font-semibold hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out"
            onClick={!user ? signIn : () => navigate("/channels")}
          >
            {!user ? "Login" : "Open Discord"}
          </button>
          <MenuIcon className="h-9 text-white cursor-pointer lg:hidden " />
        </div>
      </header>
    </>
  );
};

export default Header;
