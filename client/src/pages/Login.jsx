import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../api_requests/sendData';
import Cookie from 'universal-cookie'
import { ChatContext } from '../context/contextProvider';
const Login = () => {
  const cookies = new Cookie();
  const { user, setUser } = useContext(ChatContext);
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = {
        email,
        password
      };
      const response = await login(data);
      console.log(response);
      if (response.success) {


        cookies.set('token_auth', response.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        console.log(response.user);
        setUser(response.user);
        navigation("/home");


      }
      else {
        alert(response.msg);
      }
    }
    catch (error) {
      alert("An error occurred");
    }
  }
  console.log("User", user);
  return (
    <Container>
      <LoginContainer>
        <h2 style={{ alignSelf: "center" }}>Sign in to your account</h2> {/* Updated title */}
        <Form>
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
          <ForgotPasswordLink to="/forgot-password">
            Forgot Password?
          </ForgotPasswordLink>
        </Form>
        <Button onClick={handleLogin}>Login</Button>
        <span style={{ alignSelf: 'flex-end' }} onClick={() => navigation("/register")}>Don't have an account? Register</span>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1; /* Light gray background */
`;

const LoginContainer = styled.div`
  width: 350px; /* Adjust width as needed */
  padding: 40px;
  background-color: #fff; /* White background */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 350px; /* Maintain the same height */
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
  margin-bottom: 15px; /* Adjusted margin-bottom */
  border: 1px solid #ddd; /* Light gray border */
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #999; /* Light blue border on focus */
  }
`;

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: #666; /* Light gray text color */
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  align-self: flex-end;
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
    background-color: #0069d9; /* Darker blue on hover */
  }
`;
