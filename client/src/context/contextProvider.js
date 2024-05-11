import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [option, selectedOption] = useState("All Chats");

  return (
    <ChatContext.Provider value={{ user, setUser, option, selectedOption }}>
      {children}
    </ChatContext.Provider>
  );
};
