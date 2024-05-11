import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoSearch } from "react-icons/io5";
import { getUsers } from '../api_requests/getData';
const Search = () => {
    const [people, setPeople] = useState([])
    const id = "663e2b332236f25055953dcd";
    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await getUsers(id);

                setPeople(response);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchPeople();
    }, [])
    console.log("People", people);
    return (
        <Container>
            <PeopleList>
                <ListHeader>
                    <IoSearch size={20} color="#000" />
                    <SearchInput placeholder="Search for people" />

                </ListHeader>
            </PeopleList>
            <PeopleDetails>
            </PeopleDetails>
        </Container>
    )
}

export default Search

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 16px;
    
`
const PeopleList = styled.div`
    display: flex;
    height: 100%;
    width: 25%;
   
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