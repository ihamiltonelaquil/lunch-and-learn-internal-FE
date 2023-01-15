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
  top: calc(150%);
  left: calc(-100%);

  z-index: 1;
  display: ${(props: ThemedStyledProps<DropdownMenuProps, any>) =>
    props.isVisible ? "block" : "none"};
`;

const WhiteBackgroundContainer = styled.div`
  background-color: #fdfdfd;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 10rem;
`;

const MenuItem = styled.div`
  text-align: center;
  &:hover {
    background-color: #e6e6e6;
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
          <WhiteBackgroundContainer>
            <MenuItem>
              <Link href="/api/auth/logout">Logout</Link>
            </MenuItem>
          </WhiteBackgroundContainer>
        </DropdownMenu>
      </ImageContainer>
    </>
  );
};

export default DropDownNav;
