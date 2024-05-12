import React, { useContext } from 'react'
import styled from 'styled-components'
import { ChatContext } from '../context/contextProvider'
import { updateStatus } from '../api_requests/sendData'
const Profile = () => {
    const { user } = useContext(ChatContext)
    const changeStatus = async (status) => {
        const data = {
            status: status,
            id: user._id
        }
        try {
            const response = await updateStatus(data);
            if (response) {
                alert("Operation Successful")

            }

        }
        catch (error) {
            console.log(error);
        }

    };
    return (
        <Container>
            <ProfileContainer>

                <Image src={user.avatar} alt="profile" />
                <Conten>
                    <Name>{user.name}</Name>
                    <Email>{user.email}</Email>
                    <Friends>No of Friends : {user.friends.length}</Friends>
                    <ButtonContainer>
                        <AvaliableButton onClick={() => changeStatus("Avaliable")}>Change Status to Available</AvaliableButton>
                        <BusyButton onClick={() => changeStatus("Busy")}>Change Status to Busy</BusyButton>
                    </ButtonContainer>
                </Conten>
            </ProfileContainer>
        </Container>
    )
}

export default Profile

const Container = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    border-radius: 16px;
    `;
const ProfileContainer = styled.div`

    display: flex;
    padding: 10px;
    /* justify-content: center; */
    align-items: center;
    height: 70%;
    width: 80%;
    border: 1px solid #000;
    background-color: #f9f9f9;
    border-radius: 16px;
    `;
const Image = styled.img`
    height: 400px;
    width: 400px;
    
    border-radius: 200px;
    `;

const Conten = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 200px;
    `;
const Name = styled.h1`
    margin: 10px;
    `;
const Email = styled.h2`
    margin: 10px;
    `;
const Friends = styled.h2`
    margin: 10px;
    `;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    `;
const AvaliableButton = styled.button`
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: green;
    color: white;
    `;
const BusyButton = styled.button`
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: red;
    color: white;
    `;
