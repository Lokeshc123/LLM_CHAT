import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoSearch } from "react-icons/io5";
import { getUsers } from '../api_requests/getData';
import People from './People';
import { ChatContext } from '../context/contextProvider';

const Search = () => {
    const [people, setPeople] = useState([])
    const [searchText, setSearchText] = useState("");
    const { user } = useContext(ChatContext);
    console.log(user);
    const data = {
        id: user._id,
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
                {/* Details section goes here */}
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
   
    
`
const PeopleList = styled.div`
padding: 20px;
    display: flex;
    height: 100%;
    width: 25%;
    flex-direction: column;
   
`
const PeopleDetails = styled.div`
    display: flex;
    height: 100%;
    width: 75%;
 
`
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
`
const SearchInput = styled.input`
    height: 40px;
    width: 80%;
 outline: none;
    border:none;
    
    padding: 0 20px;
    font-size: 1rem;
`