import React, { useContext } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import { ChatContext } from '../context/contextProvider'
import Chats from '../components/Chats'
import Search from '../components/Search'
import Friends from '../components/Friends'
import Notifications from '../components/Notifications'
const Home = () => {
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
            default:
                return <Chats />
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