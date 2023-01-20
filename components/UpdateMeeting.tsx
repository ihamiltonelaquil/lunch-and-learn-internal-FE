import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { StyledCard } from "./styledComponents";

import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 100%;
  align-items: center;
  margin-top: 5%;
  justify-content: center;
  outline: none;
  border: none;
  &:focus {
  }
`;

interface MeetingData {
  meetingID: string;
  authID: string;
  currentName: string;
  currentTopic: string;
  currentDesc: string;
}

const UpdateMeeting: React.FC<MeetingData> = ({
  meetingID,
  authID,
  currentName,
  currentTopic,
  currentDesc,
}) => {
  //for PUT

  const [creatorName, setCreatorName] = useState<any>(currentName);
  const [topic, setTopic] = useState<any>(currentTopic);
  const [description, setDescription] = useState<any>(currentDesc);

  const [response, setResponse] = useState<any>();

  function saveData() {
    let data = {
      creatorName,
      topic,
      description,
    };

    fetch(`https://localhost:555/api/Meeting/${meetingID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => setResponse(response));
  }

  return (
    <>
      <StyledCard>
        <div className="mainContent">
          <h1>Update details for {currentName}</h1>
          <div className="container w-50">
            <InputWrapper>
              <StyledInput
                id="testInput"
                placeholder="Update creator name"
                onChange={(e) => {
                  if (e.target.value) {
                    setCreatorName(e.target.value);
                  }
                }}
              />

              <StyledInput
                placeholder="Update topic"
                onChange={(e) => {
                  if (e.target.value) {
                    setTopic(e.target.value);
                  }
                }}
              />

              <StyledInput
                placeholder="Update description"
                onChange={(e) => {
                  if (e.target.value) {
                    setDescription(e.target.value);
                  }
                }}
              />
            </InputWrapper>

            <div>
              <button onClick={saveData}>Update</button>
            </div>
          </div>
        </div>
      </StyledCard>
    </>
  );
};

export default UpdateMeeting;
