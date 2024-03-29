import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  CenteredDiv,
  StyledExpandedMeetingCard,
  StyledMeetingCardButton,
  StyledInput,
  InputHeader,
  StyledTextArea
} from "../StyleComponents/styledComponents";
import { useUser } from "@auth0/nextjs-auth0/client";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0px 10px; */
  width: 90%;
`;
interface UserData {
  authID: string;
  firstName: string;
  lastName: string;
}

export default function CreateMeeting(props: {
  setShowCreate: (arg0: boolean) => void;
}) {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [topic, setTopic] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [meetingStart, setMeetingStart] = useState<string>("");
  const [meetingEnd, setMeetingEnd] = useState<string>("");
  const [creatorName, setCreatorName] = useState<string>();
  const [userData, setUserData] = useState<UserData[]>([]);

  function handleExit() {
    props.setShowCreate(false);
  }

  useEffect(() => {
    if (user?.sub != undefined || null) {
      fetch(process.env.NEXT_PUBLIC_API_ROUTE+`/api/user/${user?.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    }
  }, [user]);

  useEffect(() => {
    userData.map((data) => {
      setCreatorName(data.firstName);
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
    fetch(process.env.NEXT_PUBLIC_API_ROUTE+"/api/Meeting", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log(error);
    });
    handleExit();
  }

  return (
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
                console.log(meetingStart);
                console.log(meetingEnd);
              }}
            />
          </InputWrapper>
        </CenteredDiv>
      </div>
      <span>
        <StyledMeetingCardButton onClick={handleExit}>
          Close
        </StyledMeetingCardButton>
        <StyledMeetingCardButton onClick={saveData}>
          Create
        </StyledMeetingCardButton>
      </span>
    </StyledExpandedMeetingCard>
  );
}
