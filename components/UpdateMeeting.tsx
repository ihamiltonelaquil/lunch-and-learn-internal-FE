import { useState, useEffect, ChangeEvent, FormEvent, Dispatch, SetStateAction, useCallback } from "react";
import Link from "next/link";
import { CenteredDiv, RoundedButton, StyledCard, StyledMeetingCardButton } from "./styledComponents";

import styled from "styled-components";
import ReactLoading from "react-loading";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import React from "react";

const InputHeader = styled.p`
  text-align: left;
  font-weight: 600;
  margin: 5px 0px 0px 10px !important;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0px 10px; */
  width: 100%;
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
  }`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
`
const AttachmentContainer = styled.div`
  margin-top: 5px;
`;
interface MeetingData {
  meetingID: string;
  authID: string;
  currentName: string;
  currentTopic: string;
  currentDesc: string;
  currentStart: string;
  currentEnd: string;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateMeeting: React.FC<MeetingData> = ({
  meetingID,
  authID,
  currentName,
  currentTopic,
  currentDesc,
  currentStart,
  currentEnd,
  toggleOpen
}) => {

    const handleToggleOpen = useCallback(
      (event: any) => {
        toggleOpen(event.target.value);
      },
      [toggleOpen]
    );

  const [topic, setTopic] = useState<string>(currentTopic);
  const [description, setDescription] = useState<string>(currentDesc);
  const [meetingStart, setMeetingStart] = useState<string>(currentStart);
  const [meetingEnd, setMeetingEnd] = useState<string>(currentEnd);

  const [response, setResponse] = useState<Response>();

  const [file, setFile] = useState<File | null>(null);
  const [uploadResponseData, setUploadResponseData] = useState<Response>();
  const [isSubmittingAttachment, setIsSubmittingAttachment] = useState(false);

  const [linkAddress, setLinkAddress] = useState<string>();
  const [linkName, setLinkName] = useState<string>();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
      const fileList = event.target.files;
      if (fileList) {
          setFile(fileList[0]);
      }
  }

  async function handleAttachmentUpload(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setIsSubmittingAttachment(true);
      const data = new FormData();
      if (file) {
          data.append("file", file);
          const res = await fetch(`https://localhost:555/api/LunchAndLearn/upload?meetingId=${meetingID}`, {
              method: "POST",
              body: data,
          });
          setUploadResponseData(res);
          setFile(null);
      }
      setIsSubmittingAttachment(false);
      let cssClass = "";
      setTimeout(() => {
        const fileSelector = document.getElementById("fileSelector");
        const fileSubmit = document.getElementById("fileSubmit");
        if(uploadResponseData?.status === 200)
          cssClass = "upload-success";
        else
          cssClass = "upload-failure";
        fileSelector?.classList.add(cssClass);
        fileSubmit?.classList.add(cssClass);
        setTimeout(() => {
          fileSelector?.classList.remove(cssClass);
          fileSubmit?.classList.remove(cssClass);
        }, 5000);
      }, 100);
  }

  function saveData() {
    let data = {
      topic,
      description,
      meetingStart,
      meetingEnd,
    };
    fetch(`https://localhost:555/api/Meeting/${meetingID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => setResponse(response));
    toggleOpen(false);
  }

  const fileInput = React.useRef<HTMLInputElement>(null);

  const redirectClick = (event: any) => {
    event.preventDefault();
    fileInput.current?.click();
  }

  return (
    <>
      <StyledCard>
        <div className="mainContent">
          <h1>Update Meeting</h1>
            <GridWrapper>
              <InputWrapper>
                <InputHeader>Topic Name</InputHeader>
                <StyledInput
                  placeholder="Update topic"
                  // value={topic}
                  onChange={(e) => {
                    if (e.target.value) {
                      setTopic(e.target.value);
                    }
                  }}
                />
                <InputHeader>Description</InputHeader>
                <StyledTextArea
                  placeholder="Update description"
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
                  <input type="datetime-local" id="meeting-time" name="meeting-time" min="1970-01-01T00:00" max="2100-12-31T00:00"
                  onChange={(e) => {
                    const newMeetingEnd = (e.target.value).slice(0, 11) + (Number((e.target.value).slice(11, 13))+1) + (e.target.value).slice(13, 16);
                    if (e.target.value) {
                      setMeetingStart(e.target.value);
                      setMeetingEnd(newMeetingEnd);
                    }
                  }}
                  />
                </InputWrapper>
                <InputWrapper>
                  <InputHeader>Add Attachments</InputHeader>
                  <AttachmentContainer>
                    {!isSubmittingAttachment ?
                        <form onSubmit={handleAttachmentUpload}>
                            <input type="file" onChange={handleFileChange} ref={fileInput} style={{display:'none'}}/>
                            <RoundedButton id="fileSelector" width={170} onClick={redirectClick}>{file == null ? 'Select a File' : file.name}</RoundedButton>
                            <RoundedButton id="fileSubmit" width={110} type="submit">Upload</RoundedButton>
                        </form>
                        :
                        <CenteredDiv>
                          <ReactLoading type="cylon" color={getComputedStyle(document.body).getPropertyValue('--colour-accent')} height={35} width={35}/>
                        </CenteredDiv>
                      }
                  <RoundedButton width={290} onClick={() => {}}>Manage Attachments</RoundedButton>
                  </AttachmentContainer>

                  <InputHeader>Add Links</InputHeader>
                  <form>
                    <StyledInput
                    placeholder="Website Address"
                    // value={topic}
                    pattern="^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$"
                    onChange={(e) => {
                      if (e.target.value) {
                        setLinkAddress(e.target.value);
                      }
                    }}
                    />
                    <span>
                      <StyledInput
                      style={{width: '70%', marginRight: '10px'}}
                      placeholder="Link Name"
                      // value={topic}
                      onChange={(e) => {
                        if (e.target.value) {
                          setLinkName(e.target.value);
                        }
                      }}
                      />
                      <RoundedButton width={70} type='submit'>Add</RoundedButton>
                    </span>
                    <RoundedButton width={290} onClick={() => {}}>Manage Links</RoundedButton>
                  </form>
                </InputWrapper>
            </GridWrapper>
          </div>
        <span>
          <StyledMeetingCardButton onClick={handleToggleOpen}>
            Close
          </StyledMeetingCardButton>
          <StyledMeetingCardButton onClick={saveData}>
            Save
          </StyledMeetingCardButton>
        </span>
      </StyledCard>
    </>
  );
};

export default UpdateMeeting;
