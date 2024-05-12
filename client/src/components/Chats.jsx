import React, { useContext, useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import styled from 'styled-components'
import { getConvo, getFriends, getUserDetails } from '../api_requests/getData';
import { ChatContext } from '../context/contextProvider';
import ChatMsg from './ChatMsg';
import { sendMsg } from '../api_requests/sendData';
import ChatConvo from './ChatConvo';
import { SocketContext } from '../context/SocketContext';


const Chats = () => {
    const [searchText, setSearchText] = useState("");
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]); // Chats state
    const handleSearch = (event) => {
        setSearchText(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
    };

    const filteredPeople = chats.filter((ch) =>
        ch.name.toLowerCase().includes(searchText)
    );
    const { onlineUsers, socket } = useContext(SocketContext);
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setConvo(prevConvo => [...prevConvo, newMessage]);

        });

        return () => socket?.off("newMessage");
    }, [socket]);

    console.log("Online Users", onlineUsers);
    const { user, chatDetails } = useContext(ChatContext);
    const [details, setDetails] = useState(null);
    const [convo, setConvo] = useState([]);
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {


            setConvo([...convo, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, convo, setConvo]);
    useEffect(() => {
        if (chatDetails) {
            const fetchConversation = async () => {
                try {
                    const response = await getConvo(user._id, chatDetails);
                    console.log("Convo", response);
                    setConvo(response);
                }
                catch (error) {
                    console.log(error);
                }
            }
            fetchConversation();
        }
    }
        , [chatDetails])

    const sendMessage = async () => {
        if (message.length === 0) {
            alert("Message cannot be empty");
            return;
        }
        const data = {


            senderId: user._id,
            receiverId: chatDetails,
            message

        }
        try {
            const response = await sendMsg(data);
            console.log(response);
            if (response.err) {
                alert(response.err);
            }
            else {

                setMessage("");
            }

        }
        catch (error) {
            alert("An error occurred");
        }
    }
    useEffect(() => {
        if (chatDetails) {
            const fetchDetails = async () => {
                try {
                    const response = await getUserDetails(chatDetails);
                    console.log("Search response", response);
                    setDetails(response);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchDetails();
        }
    }
        , [chatDetails])
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await getFriends(user._id);
                setChats(response);

            }
            catch (error) {
                console.log(error);
            }

        }
        fetchFriends();
    }, [])
    return (
        <Container>
            <PeopleList>
                <ListHeader>
                    <IoSearch size={20} color="#000" />
                    <SearchInput
                        placeholder="Search for people"
                        onChange={handleSearch}
                        value={searchText}
                    />
                </ListHeader>
                {filteredPeople.map((req) => (
                    <ChatMsg key={req._id} people={req} />
                ))}
            </PeopleList>
            {
                chatDetails ? (
                    <ChatContainer>
                        <ChatHeader>
                            <Image src={details?.avatar} alt="Img" />
                            <Content>
                                <Name>{details?.name}</Name>
                                {onlineUsers.includes(chatDetails) ? <span style={{ color: "green" }}>Online</span> : <span style={{ color: "red" }}>Offline</span>
                                }
                            </Content>
                        </ChatHeader>
                        <ChatConversation >
                            <ChatConvo messages={convo} loggedInUserId={user._id} />
                        </ChatConversation>
                        <SendMessage>
                            <Input type="text" placeholder="Type a message" value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <IoIosSend size={25} style={{ marginRight: "10px" }} onClick={sendMessage} />
                        </SendMessage>

                    </ChatContainer>
                ) : (
                    <ChatContainer>

                    </ChatContainer>
                )
            }
        </Container>
    )
}

export default Chats

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 16px;
    `;
const PeopleList = styled.div`
    padding: 20px;
    display: flex;
    height: 100%;
    width: 25%;
    flex-direction: column;
    `;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8%;
  margin : 5px;
  width: 100%;
  border: 1px solid #000;
  border-radius: 12px;
  color: white;
`;

const SearchInput = styled.input`
  height: 40px;
  width: 80%;
  outline: none;
  border:none;
  padding: 0 20px;
  font-size: 1rem;
`;

const ChatContainer = styled.div`
display: flex;
height: 100%;
width: 75%;
flex-direction: column;
align-items: center;
background-color: #f9f9f9;
`;
const ChatHeader = styled.div`
display: flex;
height: 8%;
width: 100%;
padding: 15px;
color: white;
`;

const Image = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
`
const Content = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin-left: 10px;
`
const Name = styled.div`
font-size: 25px;
font-weight: 600;
color: #000;
`

const ChatConversation = styled.div`
display: flex;
height: 82%;
width: 100%;

`
const SendMessage = styled.div`
display: flex;
height: 10%;
width: 99%;
align-items: center;
justify-content: center;

background-color: #fff;
`
const Input = styled.input`
height: 40px;
width: 100%;
outline: none;
border:none;
padding: 0 20px;
font-size: 1rem;
`
