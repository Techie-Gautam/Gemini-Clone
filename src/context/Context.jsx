import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState(localStorage.getItem("recentPrompt") || "");
  const [prevPrompts, setPrevPrompts] = useState(JSON.parse(localStorage.getItem("prevPrompts")) || []);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [formattedResponse, setFormattedResponse] = useState("");


  useEffect(() => {
    localStorage.setItem("input", input);
  }, [input]);

  useEffect(() => {
    localStorage.setItem("recentPrompt", recentPrompt);
  }, [recentPrompt]);

  useEffect(() => {
    localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (e, prompt) => {
    if (e && e.preventDefault) e.preventDefault();
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [input, ...prev]);
      setRecentPrompt(input);
      response = await run(input);
    }

    try {
      const formattedResponse = formatResponse(response);
      setLoading(false);
      setInput("");
      setFormattedResponse(formattedResponse);
      setTypingIndex(0);
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      setLoading(false);
      setInput("");
    }
  };

  const formatResponse = (response) => {
    let formattedText = response
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
      .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
      .replace(/^\d+\.(.*$)/gim, '<ol><li>$1</li></ol>')
      .replace(/\n$/gim, '<br />')
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/gi,
        '<a href="$2" target="_blank">$1</a>'
      )
      .replace(
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
        '<a href="$1" target="_blank">$1</a>'
      );

    formattedText = formattedText.replace(
      /<ul>(.*?)<\/ul>/gims,
      (match, p1) => `<ul>${p1.replace(/<\/ul><ul>/gim, '')}</ul>`
    );

    formattedText = formattedText.replace(
      /<ol>(.*?)<\/ol>/gims,
      (match, p1) => `<ol>${p1.replace(/<\/ol><ol>/gim, '')}</ol>`
    );

    return formattedText;
  };

  useEffect(() => {
    if (typingIndex < formattedResponse.length) {
      const timeoutId = setTimeout(() => {
        setResultData((prev) => prev + formattedResponse.charAt(typingIndex));
        setTypingIndex((index) => index + 1);
      }, 1); 

      return () => clearTimeout(timeoutId);
    }
  }, [typingIndex, formattedResponse]);


  const handleDelete = (id) => {
    const filterItems = prevPrompts.filter((item, index) => index !== id)
    setPrevPrompts(filterItems)
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    handleDelete
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
