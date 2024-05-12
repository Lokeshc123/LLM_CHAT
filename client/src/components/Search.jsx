import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoSearch } from "react-icons/io5";
import { getUserDetails, getUsers } from '../api_requests/getData';
import People from './People';
import { ChatContext } from '../context/contextProvider';
import { sendFriendRequest } from '../api_requests/sendData';

const Search = () => {
  const [people, setPeople] = useState([])
  const [searchText, setSearchText] = useState("");
  const { user, searchDetails } = useContext(ChatContext);
  const [details, setDetails] = useState(null);

  console.log(user);
  const data = {
    id: user._id || "abc",
    name: user.name
  }
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await getUsers(data);
        setPeople(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPeople();
  }, []);

  console.log(searchDetails)
  console.log("Details ", details)
  const handleClick = async () => {
    const data = {
      id: user._id,
      friendId: searchDetails
    }
    try {
      const response = await sendFriendRequest(data);
      console.log(response);
      if (response.err) {
        alert(response.err);
      }
      else {
        alert("Friend request sent successfully");

      }
    }
    catch (error) {
      alert("An error occurred");
    }

  };
  useEffect(() => {
    if (searchDetails) {
      const fetchDetails = async () => {
        try {
          const response = await getUserDetails(searchDetails);
          console.log("Search response", response);
          setDetails(response);
        } catch (error) {
          console.log(error);
        }
      };

      fetchDetails();
    }
  }, [searchDetails]);

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchText)
  );

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
        {filteredPeople.map((person) => (
          <People key={person._id} people={person} />
        ))}
      </PeopleList>
      <PeopleDetails>
        {searchDetails ? (
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
            <Button onClick={handleClick}>Send Friend Request</Button>
          </DetailsContainer>
        ) : null}
      </PeopleDetails>
    </Container>
  );
};

export default Search;

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

const Button = styled.button`
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
