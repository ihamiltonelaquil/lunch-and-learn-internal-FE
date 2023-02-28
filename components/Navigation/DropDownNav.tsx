import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";
import styled, { ThemedStyledProps } from "styled-components";
import Link from "next/link";
import Login from "../LoginScreen";
import { DarkBG } from "../StyleComponents/styledComponents";

interface DropdownMenuProps {
  isVisible: boolean;
}

const ImageContainer = styled.div`
  position: relative;
`;
const Image = styled.img``;

const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: calc(120%);
  left: calc(-150%);

  z-index: 1;
  display: block;
  width: 120px;
`;

const WhiteBackgroundContainer = styled.div<DropdownMenuProps>`
  background-color: var(--colour-bg);
  box-shadow: 
              inset -2px -2px 6px rgba(255, 255, 255, .7),
              inset -2px -2px 4px rgba(255, 255, 255, .5),
              inset 2px 2px 2px rgba(255, 255, 255, .075),
              inset 2px 2px 4px rgba(0, 0, 0, .15);
  border-radius: 10px;
  height: ${(props: ThemedStyledProps<DropdownMenuProps, any>) =>
    props.isVisible ? "3rem" : "0rem"};
  transition: height 0.15s ease-out;
  overflow: hidden;
  margin-top: 5px;
`;

const MenuItem = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  padding-top: 2px;
  padding-bottom: 2px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  > a {
    font-size: small;
  }
`;

const StyledImage = styled(Image)`
    box-shadow: 
              -6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
`;

const DropDownNav = () => {
  const { user } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);

  return (
    <>
      {isUpdatingDetails && 
        <>
          <Login />
          <DarkBG 
            onClick={() => {
              setIsUpdatingDetails(false);
            }}
          />
        </>
      }
      <ImageContainer>
        <StyledImage
          src={
            typeof user?.picture === "string"
              ? user.picture
              : "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
          }
          alt="Profile Image"
          className="profileImage"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        />

        <DropdownMenu isVisible={dropdownVisible}>
          <WhiteBackgroundContainer isVisible={dropdownVisible}>
            <MenuItem>
              <Link href="/api/auth/logout">Logout</Link>
            </MenuItem>
            <MenuItem>
              <a onClick={
                () => {
                  setIsUpdatingDetails(true);
                }
              }>Update Details</a>
            </MenuItem>
          </WhiteBackgroundContainer>
        </DropdownMenu>
      </ImageContainer>
    </>
  );
};

export default DropDownNav;
