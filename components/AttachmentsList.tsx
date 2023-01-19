import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconLookup } from "../lib/utils";
import { AttachmentContainer } from "./styledComponents";

interface Attachment {
  attachmentId: string;
  fileName: string;
  blobName: string;
  publicURI: string;
  meetingId: string;
  fileType: string;
  uploadDate: string;
}

const AttachmentsList: React.FC<{
  meetingId: string;
}> = ({ meetingId }) => {
  const [attachmentData, setAttachmentData] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:555/api/attachment/${meetingId}`)
      .then((res) => res.json())
      .then((data) => {
        setAttachmentData(data);
      });
  }, [attachmentData, meetingId]);

  console.log(attachmentData);

  if (!attachmentData.keys) {
    return (
      <div>
        <h3>No Attachments Found</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Attachments</h3>
        <ul className="listStyle1">
          {attachmentData.map((attachment: Attachment) => (
            <li key={attachment.attachmentId}>
              <AttachmentContainer>
                <FontAwesomeIcon
                  icon={iconLookup(attachment.fileType)}
                  size="2x"
                />
                <p> {attachment.fileName}</p>
                <a href={attachment.publicURI} target="_blank" rel="noreferrer">
                  Download
                </a>
              </AttachmentContainer>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default AttachmentsList;
