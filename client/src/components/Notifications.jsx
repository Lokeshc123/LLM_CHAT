import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoSearch } from "react-icons/io5";
import { ChatContext } from '../context/contextProvider';
import { getFriendRequests, getUserDetails } from '../api_requests/getData';
import Request from './Request';
import { acceptReq, rejectReq } from '../api_requests/sendData';
const Notifications = () => {
    const [searchText, setSearchText] = useState("");
    const { user, reqDetails, setReqDetails } = useContext(ChatContext);
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        const getRequests = async () => {
            try {
                const response = await getFriendRequests(user._id);
                console.log(response);
                setRequests(response);
            } catch (error) {
                console.log(error);
            }
        }
        getRequests();
    }
        , [])
    const [details, setDetails] = useState(null);
    const handleSearch = (event) => {
        setSearchText(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
    };

    const filteredPeople = requests.filter((req) =>
        req.name.toLowerCase().includes(searchText)
    );
    useEffect(() => {
        if (reqDetails) {
            const fetchDetails = async () => {
                try {
                    const response = await getUserDetails(reqDetails);
                    console.log("Search response", response);
                    setDetails(response);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchDetails();
        }
    }
        , [reqDetails])
    const data = {
        id: user._id,
        friendId: reqDetails
    }
    const accept = async () => {
        try {
            const response = await acceptReq(data);
            console.log(response);
            if (response.err) {
                alert(response.err);
            }
            else {
                alert("Friend request accepted successfully");
                setRequests(requests.filter((req) => req._id !== reqDetails));
                setReqDetails(null);

            }

        }
        catch (error) {
            alert("An error occurred");
        }
    }

    const reject = async () => {
        try {
            const response = await rejectReq(data);
            console.log(response);
            if (response.err) {
                alert(response.err);
            }
            else {
                alert("Friend request rejected successfully");
                setRequests(requests.filter((req) => req._id !== reqDetails));
                setReqDetails(null);
            }

        }
        catch (error) {
            alert("An error occurred");
        }
    }
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
                    <Request key={req._id} people={req} />
                ))}
            </PeopleList>
            <PeopleDetails>
                {reqDetails ? (
                    <DetailsContainer>
                        <UserInfo>
                            <Image src={details?.avatar} alt="profile" />
                            <Content>
                                <Name>{details?.name}</Name>
                                <Email>{details?.email}</Email>
                                <Friends>No of Friends : {details?.friends.length}</Friends>
                                <Pending>No of pending friends request : {details?.recievedrequests.length}</Pending>
                            </Content>
                        </UserInfo>
                        <ButtonContainer>

                            <AcceptButton onClick={accept}>Accept</AcceptButton>
                            <RejectButton onClick={reject}>Reject</RejectButton>
                        </ButtonContainer>
                    </DetailsContainer>
                ) : null}
            </PeopleDetails>
        </Container>
    )
}

export default Notifications

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

const PeopleDetails = styled.div`
  display: flex;
  height: 100%;
  width: 75%;
  align-items: center;
  justify-content: center;
`;



const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  font-size: 22px; /* Increased font size */
  font-weight: 700; /* Increased font weight */
  margin-bottom: 10px; /* Increased margin bottom */
`;

const Email = styled.div`
  font-size: 16px; /* Increased font size */
  font-weight: 500; /* Increased font weight */
  color: #555; /* Slightly darker color */
  margin-bottom: 10px; /* Increased margin bottom */
`;

const Friends = styled.div`
  font-size: 16px; /* Increased font size */
  font-weight: 500; /* Increased font weight */
  color: #555; /* Slightly darker color */
  margin-bottom: 5px;
`;

const Pending = styled.div`
  font-size: 16px; /* Increased font size */
  font-weight: 500; /* Increased font weight */
  color: #555; /* Slightly darker color */
  margin-bottom: 20px; /* Increased margin bottom */
`;



const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const AcceptButton = styled.button`
  padding: 12px 24px; /* Increased padding */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px; /* Increased font size */
  font-weight: 600; /* Increased font weight */
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
const RejectButton = styled.button`
    padding: 12px 24px; /* Increased padding */
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px; /* Increased font size */
    font-weight: 600; /* Increased font weight */
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #a71d2a;
    }
    `;