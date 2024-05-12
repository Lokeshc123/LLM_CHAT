import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import Image1 from "../assets/Images/1.png"
import { FiMessageSquare } from "react-icons/fi";
import { FaUserFriends, FaSearch, FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { jwtDecode } from 'jwt-decode';
import { CiLogout } from "react-icons/ci";
import { ChatContext } from '../context/contextProvider';
import Cookies from 'universal-cookie';
import { getUserDetails } from '../api_requests/getData';

const Header = () => {
    const { option, selectedOption, setUser } = useContext(ChatContext);

    const cookies = new Cookies();
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = cookies.get('token_auth');
                console.log('Token:', token);
                if (token) {
                    const decoded = jwtDecode(token);
                    const response = await getUserDetails(decoded.id);


                    setUser(response);
                }
            } catch (error) {
                console.error('Token not found:', error);
            }
        };
        fetchDetails();
    }, []);
    return (
        <Container>
            <Logo>
                <img src={Image1} alt="logo" style={{ width: 130, height: 130 }} />
            </Logo>
            <IconsContainer>
                <Icons onClick={() => selectedOption("All chats")}>
                    <FiMessageSquare size={25} />
                    <span style={{ margin: 2 }}>All chats</span>
                </Icons>
                <Icons onClick={() => selectedOption("Search")}>
                    <FaSearch size={25} />
                    <span style={{ margin: 2 }}>Search</span>
                </Icons>
                <Icons onClick={() => selectedOption("Friends")}>
                    <FaUserFriends size={25} />
                    <span style={{ margin: 2 }}>Friends</span>
                </Icons>
                <Icons onClick={() => selectedOption("Notifications")}>
                    <IoIosNotifications size={25} />
                    <span >Notifications</span>
                </Icons>
            </IconsContainer>
            <BottomContainer>
                <Icons onClick={() => selectedOption("Profile")}>
                    <FaUser size={25} />
                    <span >Profile</span>
                </Icons>
                <Icons onClick={() => selectedOption("Logout")}>
                    <CiLogout size={25} />
                    <span >Logout</span>
                </Icons>
            </BottomContainer>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem 2rem;
    height : 100%;
    width :5%;
    background-color: #202022;
    color: white;
    flex-direction: column;
   
    
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-left: -50px;
    margin-top: -20px;
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
   
    height : 60%;
    width : 100%;
   
    margin-left: -50px;
    padding: 5px;
`;

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    height : 30%;
    width : 100%;
    margin-left: -50px;
    flex-direction: column;
    justify-content: space-evenly;
`;

const Icons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: gray;
    height: 25%;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    span {
        font-size: 12px;
        margin-top: 5px;
    }
    &:hover {
        color: white;
        background-color: gray;
    }

    
`;
