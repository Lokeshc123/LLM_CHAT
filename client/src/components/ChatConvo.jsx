import React from 'react'
import styled from 'styled-components'
const ChatConvo = ({ messages, loggedInUserId }) => {
  return (
    <ChatContainer>
      {messages.map((msg) => (
        <MessageContainer key={msg._id} sentByUser={msg.senderId === loggedInUserId}>
          <MessageBubble sentByUser={msg.senderId === loggedInUserId}>
            {msg.senderId !== loggedInUserId && <SenderName>{msg.senderName} </SenderName>}
            {msg.message}
          </MessageBubble>
        </MessageContainer>
      ))}
    </ChatContainer>
  );
}

export default ChatConvo
const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.sentByUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.sentByUser ? '#DCF8C6' : '#E5E5EA')};
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
`;

const SenderName = styled.span`
  font-weight: bold;
`;