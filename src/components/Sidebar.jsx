import React, { useContext, useEffect, useState, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FaRegMessage, FaRegCircleQuestion } from "react-icons/fa6";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Context } from "../context/Context";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat, handleDelete } = useContext(Context);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const optionMenuRefs = useRef([]);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(null, prompt);
  };

  const handleClickOutside = (event) => {
    if (clickedIndex !== null) {
      const currentRef = optionMenuRefs.current[clickedIndex];
      if (currentRef && !currentRef.contains(event.target)) {
        setClickedIndex(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [clickedIndex]);

  return (
    <section
      className={`bg-sidebarBg z-10 max-h-screen hidden sticky top-0 left-0 p-6 md:flex flex-col justify-between ${
        open ? "w-72" : "w-24"
      } duration-300 ease-linear transition-all`}
    >
      <div>
        <p className="hover:bg-gray-600 w-fit h-fit p-2 mb-10 rounded-full">
          <IoMenu
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer text-3xl "
          />
        </p>
        <div
          onClick={newChat}
          className="flex items-center gap-3 w-fit p-2 mb-8 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer"
        >
          <GoPlus size={"25px"} />
          {open ? <p className="pr-3 whitespace-nowrap">New Chat</p> : null}
        </div>
        {open ? (
          <div>
            <p>Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex items-center relative gap-5 mt-3 justify-between bg-textBg px-5 py-3 rounded-full cursor-pointer"
                >
                  <div
                    onClick={() => loadPrompt(item)}
                    className="flex items-center gap-3 flex-1"
                  >
                    <FaRegMessage />
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[120px]">
                      {item}
                    </p>
                  </div>
                  <p className={` p-1 rounded-full hover:bg-blue-500  ${hoveredIndex === index ? "visible" : "invisible"}`}>
                    <BsThreeDotsVertical className="font-extrabold " onClick={(e) => { e.stopPropagation(); setClickedIndex(index); }} />
                  </p>
                  <div
                    ref={(el) => (optionMenuRefs.current[index] = el)}
                    className={`absolute flex-col gap-3 h-fit bg-sidebarBg rounded-lg py-3 top-0 -right-36 ${
                      clickedIndex === index ? "flex" : "hidden"
                    }`}
                  >
                    <p className="flex items-center gap-2 hover:bg-gray-950  px-4 py-1">
                      <FaPencilAlt />
                      Rename
                    </p>
                    <p
                      onClick={() => handleDelete(index)}
                      className="flex items-center gap-2 text-red-400 hover:bg-gray-950 px-4 py-1"
                    >
                      <FaTrashAlt />
                      Delete
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div>
        <div className="flex items-center gap-3 text-[20px] hover:bg-gray-500 px-3 py-2 cursor-pointer rounded-full">
          <FaRegCircleQuestion />
          {open ? <p className="text-[15px]">Help</p> : null}
        </div>
        <div className="flex items-center gap-3 text-[20px] hover:bg-gray-500 px-3 py-2 cursor-pointer rounded-full">
          <RiHistoryFill />
          {open ? <p className="text-[15px]">History</p> : null}
        </div>
        <div className="flex items-center gap-3 text-[20px] hover:bg-gray-500 px-3 py-2 cursor-pointer rounded-full">
          <AiOutlineSetting />
          {open ? <p className="text-[15px]">Settings</p> : null}
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
