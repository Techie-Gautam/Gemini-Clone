import React, { useContext, useState } from "react";
import avatar from "../assets/avatar.png";
import gemini from "../assets/gemini-icon.png";
import { FaPencilAlt, FaGamepad, FaMap } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";
import { BiImageAdd } from "react-icons/bi";
import { IoMdMic } from "react-icons/io";
import { IoSend, IoMenu } from "react-icons/io5";
import { Context } from "../context/Context";

function Main() {
  const [open, setOpen] = useState(false);

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <main className="w-full">
      <header className="flex w-[80%] md:w-full m-auto justify-between items-center lg:px-8 py-6">
        <p className="text-2xl">Gemini</p>
        <img
          className="w-12 rounded-full object-cover border-white border-2 p-1"
          src={avatar}
          alt="avatar"
        />
      </header>

      <div className="w-full lg:w-full xl:w-[900px] md:w-[80%]  m-auto relative min-h-[86%] ">
        {!showResult ? (
          <main className="px-4">
            <div className="text-6xl">
              <p className="greet mb-1 w-fit">Hello, Gautam.</p>
              <p className="text-textC">How can I help you today?</p>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3 pb-[150px] mt-24">
              <div className="h-[210px] bg-sidebarBg p-4 rounded-2xl relative hover:bg-gray-600 cursor-pointer ">
                <p>Help me write a refund email for a product that’s damaged</p>
                <p className="p-3 bg-bgColor absolute bottom-5 right-5 text-xl rounded-full">
                  <FaPencilAlt className="" />
                </p>
              </div>
              <div className="h-[210px] bg-sidebarBg p-4 rounded-2xl relative hover:bg-gray-600 cursor-pointer ">
                <p>Teach me the concept of game theory in simple terms</p>
                <p className="p-3 bg-bgColor absolute bottom-5 right-5 text-xl rounded-full ">
                  <FaGamepad className="" />
                </p>
              </div>
              <div className="h-[210px] bg-sidebarBg p-4 rounded-2xl relative hover:bg-gray-600 cursor-pointer ">
                <p>Find flights and weather for an upcoming trip</p>
                <p className="p-3 bg-bgColor absolute bottom-5 right-5 text-xl rounded-full">
                  <ImAirplane className="" />
                </p>
              </div>
              <div className="h-[210px] bg-sidebarBg p-4 rounded-2xl relative hover:bg-gray-600 cursor-pointer ">
                <p>What's the time it takes to walk to several landmarks</p>
                <p className="p-3 bg-bgColor absolute bottom-5 right-5 text-xl rounded-full">
                  <FaMap className="" />
                </p>
              </div>
            </div>
          </main>
        ) : (
          <div className="text-lg m-auto w-full lg:w-[90%] flex flex-col gap-5 px-4">
            <div className={`flex gap-8 items-start`}>
              <img
                className="w-12 rounded-full object-cover border-white border-2 p-1"
                src={avatar}
                alt=""
              />
              <p className="break-words w-[90%]">{recentPrompt}</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-5">
              <img
                className={`w-10 rounded-full object-cover ${
                  loading ? "animate-spin" : ""
                }`}
                src={gemini}
                alt=""
              />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  className="pb-[150px] leading-8 font-extralight text-[17px] lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col m-auto items-center w-full fixed bottom-0 lg:w-[900px] md:w-[80%] bg-bgColor mt-5">
          <div className="flex items-center justify-between px-8 py-5 w-full m-auto lg:m-0 rounded-full bg-sidebarBg">
            <form className="w-full pr-3" onSubmit={(e) => onSent(e)}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="bg-transparent outline-none w-full "
                placeholder="Enter a prompt here"
              />
            </form>
            <div className="flex gap-5 items-center text-2xl">
              <BiImageAdd className="cursor-pointer" />
              <IoMdMic className="cursor-pointer" />
              <IoSend
                onClick={() => onSent()}
                className={`cursor-pointer ${input ? "flex" : "hidden"}`}
              />
            </div>
          </div>
          <p className="lg:text-lg text-center text-sm pt-1">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Main;
