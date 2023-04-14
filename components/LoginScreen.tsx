import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { RoundedButton, StyledInput } from "./StyleComponents/styledComponents";

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
  z-index: 10;
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
  background-color: var(--colour-bg);
  padding: 2em;
  box-shadow: 
          inset -2px -2px 6px rgba(255, 255, 255, .7), 
          inset -2px -2px 4px rgba(255, 255, 255, .5), 
          inset 2px 2px 2px rgba(255, 255, 255, .075), 
          inset 2px 2px 4px rgba(0, 0, 0, .15);

  @media (max-width: 600px) {
    width: 100%;
    padding: 1em;
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

  async function saveData(event : any) {
    event.preventDefault();
    let data = {
      authID: userAuthID,
      firstName,
      lastName,
    };
    await fetch(process.env.NEXT_PUBLIC_API_ROUTE+"/api/User", {
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
    window.location.reload();
  }

  return (
    <LoginWrapper>
      <LoginBox>
        <LoginContainer>
          <WelcomeText>Set Details</WelcomeText>
          <LoginForm onSubmit={saveData}>
            <StyledInput
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <StyledInput
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br></br>
            <RoundedButton type="submit" style={{margin: "20px 0px"}}>
              Submit
            </RoundedButton>
          </LoginForm>
        </LoginContainer>
      </LoginBox>
    </LoginWrapper>
  );
};

export default Login;
