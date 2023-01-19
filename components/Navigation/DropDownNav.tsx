import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";
import styled, { ThemedStyledProps } from "styled-components";
import Link from "next/link";

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
  background-color: #fdfdfd;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: ${(props: ThemedStyledProps<DropdownMenuProps, any>) =>
    props.isVisible ? "3rem" : "0rem"};
  transition: all 0.15s ease-out;
  overflow: hidden;
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
    background-color: #e6e6e6;
  }
  >a{
    font-size: small;
  }
`;

const DropDownNav = () => {
  const { user } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <>
      <ImageContainer>
        <Image
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
              <Link href="/api/">Update Details</Link>
            </MenuItem>
          </WhiteBackgroundContainer>
        </DropdownMenu>
      </ImageContainer>
    </>
  );
};

export default DropDownNav;
