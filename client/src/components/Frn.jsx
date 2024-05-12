import React, { useContext } from 'react'
import styled from 'styled-components'
import { ChatContext } from '../context/contextProvider';

const Frn = ({ people }) => {
    const { frnDetails, setFrnDetails } = useContext(ChatContext);
    return (
        <Container onClick={() => setFrnDetails(people._id)}>
            <Image src={people.avatar} alt="Img" />
            <Content>
                <Name>{people.name}</Name>
                <Email>{people.email}</Email>
            </Content>
        </Container>
    )
}

export default Frn

const Container = styled.div`
    display: flex;
    height: 10%;
    width: 100%;
 
   align-items: center;
    border-radius: 16px;
    margin: 5px;
    &:hover {
        background-color: #f9f9f9;
    }

`
const Image = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`
const Name = styled.div`
    font-size: 16px;
    font-weight: 600;
`
const Email = styled.div`   
    font-size: 14px;
    font-weight: 400;
`
