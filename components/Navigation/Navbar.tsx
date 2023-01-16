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
          className="raa"
          src="https://www.previewindustries.com.au/wp-content/uploads/2021/06/raa-logo.png"
        />
        <Link href="/CRUD/deleteMeeting">Delete</Link>

        <Link href="/CRUD/createMeeting">Create</Link>

        <Link href="/CRUD/updateMeeting">Update</Link>

        <DropDownNav />
      </NavContainer>
    </>
  );
}
