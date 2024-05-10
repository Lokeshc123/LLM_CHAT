import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { register } from '../api_requests/sendData';

const Register = () => {
    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        // Add your registration logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const data = {
            name,
            email,
            password
        }
        try {
            const response = await register(data);
            console.log(response);
            if (response.success) {
                alert("Registration successful");
            }
            else {
                alert(response.msg);
            }
        }
        catch (error) {
            alert("An error occurred");
        }
    }

    return (
        <Container>
            <RegisterContainer>
                <h2 style={{ alignSelf: "center" }}>Register for an account</h2>
                <Form>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <Button onClick={handleRegister}>Register</Button>
                </Form>
                <span style={{ alignSelf: 'flex-end' }} onClick={() => navigation("/login")}>Already have an account? Sign In</span>
            </RegisterContainer>
        </Container>
    );
};

export default Register;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
`;

const RegisterContainer = styled.div`
  width: 350px;
  padding: 40px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 15px 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px 20px;
  background-color: #007bff; 
  color: #fff; 
  border: none;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0069d9;
  }
`;
