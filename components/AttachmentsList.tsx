import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconLookup } from "../lib/utils";
import { AttachmentContainer, RoundedButton } from "./styledComponents";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface Attachment {
  attachmentId: string;
  fileName: string;
  blobName: string;
  publicURI: string;
  meetingId: string;
  fileType: string;
  uploadDate: string;
}

interface Link {
  linkID: string;
  name: string;
  link: string;
}

const AttachmentsList: React.FC<{
  meetingId: string;
  editing?: boolean;
}> = ({ meetingId, editing = false }) => {
  const [attachmentData, setAttachmentData] = useState([]);
  const [linkData, setLinkData] = useState([]);
  const [responseData, setResponseData] = useState<Response>();

  useEffect(() => {
    fetch(`https://localhost:555/api/attachment/${meetingId}`)
      .then((res) => res.json())
      .then((data) => {
        setAttachmentData(data);
      });
    fetch(`https://localhost:555/api/link/${meetingId}`)
      .then((res) => res.json())
      .then((data) => {
        setLinkData(data);
      });
  }, [attachmentData, linkData, meetingId]);

  function deleteAttachment(attachmentId: string) {
    fetch(`https://localhost:555/api/attachment/${attachmentId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setResponseData(res);
      } else {
        console.log("Error occurred while deleting attachment");
      }
    });
  }

  function deleteLink(linkID: string) {
    fetch(`https://localhost:555/api/link/${linkID}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setResponseData(res);
      } else {
        console.log("Error occurred while deleting link");
      }
    });
  }

  if (attachmentData.length == 0 && linkData.length == 0) {
    return (
      <div>
        <h3>No Attachments Found</h3>
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%" }}>
        <h3>Attachments</h3>
        <ul className="listStyle1">
          {attachmentData.length > 0 &&
            attachmentData.map((attachment: Attachment) => (
              <li key={attachment.attachmentId}>
                <AttachmentContainer>
                  <FontAwesomeIcon
                    icon={iconLookup(attachment.fileType)}
                    size="2x"
                  />
                  <p> {attachment.fileName}</p>
                  {editing ? (
                    <RoundedButton
                      width={100}
                      onClick={() => deleteAttachment(attachment.attachmentId)}
                    >
                      Delete
                    </RoundedButton>
                  ) : (
                    <a
                      href={attachment.publicURI}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                  )}
                </AttachmentContainer>
              </li>
            ))}
          {linkData.length > 0 &&
            linkData.map((link: Link) => (
            <li key={link.linkID}>
              <AttachmentContainer>
                <FontAwesomeIcon icon={faLink} size="2x" className="fa-link" />
                <p> {link.name}</p>
                {editing ? (
                  <RoundedButton
                    width={100}
                    onClick={() => deleteLink(link.linkID)}
                  >
                    Delete
                  </RoundedButton>
                ) : (
                  <a href={link.link} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                )}
              </AttachmentContainer>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default AttachmentsList;
