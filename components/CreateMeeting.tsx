import styled from "styled-components";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  CenteredDiv,
  RoundedButton,
  StyledExpandedMeetingCard,
  StyledMeetingCardButton,
} from "./styledComponents";
import CardOrList from "./Cards/CardOrList";
import { useUser } from "@auth0/nextjs-auth0/client";

const InputHeader = styled.p`
  text-align: left;
  font-weight: 600;
  margin: 5px 0px 0px 10px !important;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0px 10px; */
  width: 90%;
`;

const StyledInput = styled.input`
  width: 100%;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 2px solid white;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  border-radius: 20px;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out;
  &:focus {
    border: 2px solid var(--color-accent-dark);
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 2px solid white;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  border-radius: 20px;
  resize: none;
  &:focus {
    border: 2px solid var(--color-accent-dark);
  }
`;
interface UserData {
  authID: string;
  firstName: string;
  lastName: string;
}

export default function CreateMeeting() {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [topic, setTopic] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [meetingStart, setMeetingStart] = useState<string>("");
  const [meetingEnd, setMeetingEnd] = useState<string>("");
  const [creatorName, setCreatorName] = useState<string>();
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    if (user?.sub != undefined || null) {
      fetch(`https://localhost:555/api/user/${user?.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    }
  }, [user]);

  const handleClose = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    userData.map((data) => {
      setCreatorName(data.firstName.concat(" ", data.lastName));
    });
  }, [creatorName, userData]);

  function saveData() {
    let data = {
      authID: user?.sub || "fail",
      creatorName: creatorName,
      meetingStart: meetingStart,
      meetingEnd: meetingEnd,
      topic: topic,
      description: description,
    };
    console.log(data);
    fetch("https://localhost:555/api/Meeting", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      {isOpen ? (
        <CardOrList />
      ) : (
        <StyledExpandedMeetingCard>
          <div className="mainContent">
            <h1>Create Meeting</h1>
            <CenteredDiv>
              <InputWrapper>
                <InputHeader>Topic Name</InputHeader>
                <StyledInput
                  placeholder="Enter the topic"
                  // value={topic}
                  onChange={(e) => {
                    if (e.target.value) {
                      setTopic(e.target.value);
                    }
                  }}
                />
                <InputHeader>Description</InputHeader>
                <StyledTextArea
                  placeholder="Enter the description"
                  // value={description}
                  rows={4}
                  cols={50}
                  onChange={(e) => {
                    if (e.target.value) {
                      setDescription(e.target.value);
                    }
                  }}
                />
                <InputHeader>Date and Time</InputHeader>
                <input
                  type="datetime-local"
                  id="meeting-time"
                  name="meeting-time"
                  min="1970-01-01T00:00"
                  max="2100-12-31T00:00"
                  onChange={(e) => {
                    const newMeetingEnd =
                      e.target.value.slice(0, 11) +
                      (Number(e.target.value.slice(11, 13)) + 1) +
                      e.target.value.slice(13, 16);
                    if (e.target.value) {
                      setMeetingStart(e.target.value);
                      setMeetingEnd(newMeetingEnd);
                    }
                  }}
                />
              </InputWrapper>
            </CenteredDiv>
          </div>
          <span>
            <StyledMeetingCardButton onClick={handleClose}>
              Close
            </StyledMeetingCardButton>
            <StyledMeetingCardButton onClick={saveData}>
              Next
            </StyledMeetingCardButton>
          </span>
        </StyledExpandedMeetingCard>
      )}
    </>
  );
}