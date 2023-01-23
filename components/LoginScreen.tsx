import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1);
  }
`;
const LoginWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  height: 50vh;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled.input`
  padding: 1em 0.5em;
  margin: 0.5em;
  color: #475fb1;
  background: #e9e7e7;
  border: none;
  border-radius: 3px;
  outline: none;
  transition: all 0.3s ease-in-out;
  position: relative;

  &::placeholder {
    position: absolute;
    top: 50%;
    left: 0.5em;
    transform: translateY(-50%);
    transition: all 0.3s ease-in-out;
    opacity: 1;
  }

  &:focus {
    &::placeholder {
      opacity: 1;
      top: 0.7em;
      font-size: 0.8em;
    }
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const LoginBox = styled.div`
  border-radius: 20px;
  width: 50%;
  margin: 0 auto;
  background-color: white;
  padding: 2em;
  box-shadow: 2px 2px 10px #888888;

  @media (max-width: 600px) {
    width: 100%;
    padding: 1em;
  }
`;

const LoginButton = styled.button`
  padding: 0.5em;
  margin: 0.5em;
  color: white;
  background: gray;
  border: none;
  border-radius: 3px;
  :hover {
    animation: ${bounce} 0.5s ease-in-out;
    will-change: transform;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
`;
const WelcomeText = styled.h1`
  padding-bottom: 20px;
  font-size: 2em;
  color: black;
  text-align: center;
`;
const Login = () => {
  const { user, isLoading } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userAuthID, setUserAuthID] = useState(undefined || String);

  useEffect(() => {
    if (user?.sub != undefined) {
      setUserAuthID(user.sub);
    }
  }, [user?.sub, userAuthID]);

  function saveData() {
    let data = {
      authID: userAuthID,
      firstName,
      lastName,
    };

    fetch("https://localhost:555/api/User", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <LoginWrapper>
      <LoginBox>
        <LoginContainer>
          <WelcomeText>Welcome</WelcomeText>
          <LoginForm>
            <LoginInput
              placeholder="First Name"
              className="form-control mb-2"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <LoginInput
              placeholder="Last Name"
              className="form-control mb-2"
              onChange={(e) => setLastName(e.target.value)}
            />
            <LoginButton type="submit" onClick={saveData}>
              Log In
            </LoginButton>
          </LoginForm>
        </LoginContainer>
      </LoginBox>
    </LoginWrapper>
  );
};

export default Login;
