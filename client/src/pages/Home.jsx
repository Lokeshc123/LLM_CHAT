import React, { useContext } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { ChatContext } from '../context/contextProvider'
import Chats from '../components/Chats'
import Search from '../components/Search'
import Friends from '../components/Friends'
import Notifications from '../components/Notifications'
import Profile from '../components/Profile'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { option } = useContext(ChatContext)
    const renderComponent = () => {
        switch (option) {
            case "All chats":
                return <Chats />
            case "Search":
                return <Search />
            case "Friends":
                return <Friends />
            case "Notifications":
                return <Notifications />
            case "Profile":
                return <Profile />
            case "Logout":
                cookies.remove('token_auth');
                localStorage.removeItem('user');
                navigate("/");

                break;
            default:
                return <Chats />;
        }
    }

    return (
        <Container>

            <Header />
            <Content>
                {renderComponent()}
            </Content>
        </Container>
    )
}

export default Home

const Container = styled.div`
    display: flex;
 
    
    height: 100vh;
    background-color: #202022;

`
const Content = styled.div`
    display: flex;
   height : 97%;
   border-radius: 16px;
   margin-left: -50px;
    width : 93%;
    align-self: center;
    background-color: #fff;
   
    
    justify-content: center;
    align-items: center;
    flex-direction: column;
`