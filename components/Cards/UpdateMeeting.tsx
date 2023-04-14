import { useState, Dispatch, SetStateAction, useCallback, useRef } from "react";
import {
  CenteredDiv,
  RoundedButton,
  StyledCard,
  StyledMeetingCardButton,
  StyledInput,
  StyledTextArea,
  InputHeader
} from "../StyleComponents/styledComponents";
import styled from "styled-components";
import ReactLoading from "react-loading";
import React from "react";
import AttachmentsList from "../AttachmentsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0px 10px; */
  width: 100%;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
`;
const AttachmentContainer = styled.div`
  margin-top: 5px;
`;

const ButtonWrapper = styled.span`
  margin-top: 15px;
  gap: 20px;
  display: flex;
  align-content: center;
  justify-content: center;
`
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
  toggleOpen,
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

  const [managingAttachments, setManagingAttachments] =
    useState<boolean>(false);

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList[0]);
    }
  }

  async function handleAttachmentUpload(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setIsSubmittingAttachment(true);
    const data = new FormData();
    if (file) {
      data.append("file", file);
      const res = await fetch(
        process.env.API_ROUTE+`/api/Attachment/upload?meetingId=${meetingID}`,
        {
          method: "POST",
          body: data,
        }
      );
      setUploadResponseData(res);
      setFile(null);
    }
    setIsSubmittingAttachment(false);
    // let cssClass = "";
    // setTimeout(() => {
    //   const fileSelector = document.getElementById("fileSelector");
    //   const fileSubmit = document.getElementById("fileSubmit");
    //   if (uploadResponseData?.status === 200) cssClass = "upload-success";
    //   else cssClass = "upload-failure";
    //   fileSelector?.classList.add(cssClass);
    //   fileSubmit?.classList.add(cssClass);
    //   setTimeout(() => {
    //     fileSelector?.classList.remove(cssClass);
    //     fileSubmit?.classList.remove(cssClass);
    //   }, 5000);
    // }, 100);
  }

  const formRef = useRef<HTMLFormElement>(null);

  async function handleAddLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(
      process.env.API_ROUTE+`/api/link/${meetingID}?linkURL=${linkAddress}&linkName=${linkName}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: "",
      }
    ).then((response) => setResponse(response));
    setLinkAddress("");
    setLinkName("");
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  async function handleDeleteMeeting() {
    fetch(process.env.API_ROUTE+`/api/Meeting/${meetingID}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: "",
    }).then((response) => setResponse(response));
    toggleOpen(false);
  }

  function saveData() {
    let data = {
      topic,
      description,
      meetingStart,
      meetingEnd,
    };
    fetch(process.env.API_ROUTE+`/api/Meeting/${meetingID}`, {
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
  };

  return (
    <>
      {managingAttachments ? (
        <StyledCard>
          <h1>Manage Attachments</h1>
          <AttachmentsList meetingId={meetingID} editing={true} />
          <StyledMeetingCardButton
            onClick={() => {
              setManagingAttachments(false);
            }}
          >
            Close
          </StyledMeetingCardButton>
        </StyledCard>
      ) : (
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
              <InputWrapper>
                <InputHeader>Add Attachments</InputHeader>
                <AttachmentContainer>
                  {!isSubmittingAttachment ? (
                    <form onSubmit={handleAttachmentUpload}>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInput}
                        style={{ display: "none" }}
                      />
                      <RoundedButton
                        id="fileSelector"
                        width={245}
                        onClick={redirectClick}
                      >
                        {file == null ? "Select a File" : file.name}
                      </RoundedButton>
                      <RoundedButton id="fileSubmit" width={40} type="submit">
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                      </RoundedButton>
                    </form>
                  ) : (
                    <CenteredDiv>
                      <ReactLoading
                        type="cylon"
                        color={typeof window !== 'undefined' ? window.getComputedStyle(document.body).getPropertyValue('--colour-primary-dark') : "#007a8a"}
                        height={35}
                        width={35}
                      />
                    </CenteredDiv>
                  )}
                </AttachmentContainer>

                <InputHeader>Add Links</InputHeader>
                <form onSubmit={handleAddLink} ref={formRef}>
                  <StyledInput
                    placeholder="Website Address"
                    // value={topic}
                    pattern="^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$"
                    onInvalid={(event: React.FormEvent<HTMLInputElement>) => {
                      const input = event.currentTarget;
                      if (!input.validity.valid) {
                        input.setCustomValidity(
                          "Please enter a valid URL, including http(s)://"
                        );
                      } else {
                        input.setCustomValidity("");
                      }
                    }}
                    onChange={(e) => {
                      e.currentTarget.setCustomValidity("");
                      if (e.target.value) {
                        setLinkAddress(e.target.value);
                      }
                    }}
                  />
                  <span>
                    <StyledInput
                      style={{ width: "70%", marginRight: "10px" }}
                      placeholder="Link Name"
                      // value={topic}
                      required
                      onChange={(e) => {
                        if (e.target.value) {
                          setLinkName(e.target.value);
                        }
                      }}
                    />
                    <RoundedButton width={70} type="submit">
                      Add
                    </RoundedButton>
                  </span>
                </form>
                <InputHeader>Manage Attachments/Links</InputHeader>
                <RoundedButton
                  width={300}
                  onClick={() => {
                    setManagingAttachments(true);
                  }}
                >
                  Manage Attachments/Links
                </RoundedButton>
                {!confirmDelete ? (
                  <>
                    <InputHeader>Delete Meeting</InputHeader>
                    <RoundedButton
                      width={300}
                      onClick={() => {
                        setConfirmDelete(true);
                      }}
                    >
                      Delete this Meeting
                    </RoundedButton>
                  </>
                ) : (
                  <>
                    <InputHeader>
                      Are you sure? (This cannot be undone)
                    </InputHeader>
                    <span>
                      <RoundedButton width={142} onClick={handleDeleteMeeting}>
                        Yes
                      </RoundedButton>
                      <RoundedButton
                        width={142}
                        onClick={() => {
                          setConfirmDelete(false);
                        }}
                      >
                        No
                      </RoundedButton>
                    </span>
                  </>
                )}
              </InputWrapper>
            </GridWrapper>
          </div>
          <ButtonWrapper>
            <StyledMeetingCardButton onClick={handleToggleOpen}>
              Close
            </StyledMeetingCardButton>
            <StyledMeetingCardButton onClick={saveData}>
              Save
            </StyledMeetingCardButton>
          </ButtonWrapper>
        </StyledCard>
      )}
    </>
  );
};

export default UpdateMeeting;
