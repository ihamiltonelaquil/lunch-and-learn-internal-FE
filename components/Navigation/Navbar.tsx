import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import styled from "styled-components";
import DropDownNav from "./DropDownNav";

const NavContainer = styled.div`
  padding-top: 2%;
  padding-right: 5%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: helvetica;
  font-size: 18px;

  .raa {
    margin-left: 4.4%;
    position: absolute;
    left: 0px;
    width: 100px;
  }
  a {
    color: black;
    text-decoration: none;
    margin: 0 1rem;
  }
  a:hover {
    color: gray;
  }
`;
export default function Navbar() {
  return (
    <>
      <NavContainer>
        <img
          className="original-logo-do-not-steal raa"
          src="https://lunchandlearnblob.blob.core.windows.net/attachments/LNL-logo2.png"
          alt="logo"
        />
        <DropDownNav />
      </NavContainer>
    </>
  );
}
