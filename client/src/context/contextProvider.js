import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  const [option, selectedOption] = useState("All Chats");
  const [searchDetails, setSearchDetails] = useState(null);
  const [reqDetails, setReqDetails] = useState(null);
  const [frnDetails, setFrnDetails] = useState(null);
  const [chatDetails, setChatDetails] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        option,
        selectedOption,
        searchDetails,
        setSearchDetails,
        reqDetails,
        setReqDetails,
        frnDetails,
        setFrnDetails,
        chatDetails,
        setChatDetails,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
