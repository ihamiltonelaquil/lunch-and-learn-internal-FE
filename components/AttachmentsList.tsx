import React, { useEffect, useState } from "react";

interface Attachment {
  attachmentId: string;
  fileName: string;
  blobName: string;
  publicUri: string;
  meetingId: string;
  fileType: string;
  uploadDate: string;
}

const AttachmentsList: React.FC<{
  meetingId: string;
}> = ({ meetingId }) => {
  const [attachmentData, setAttachmentData] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:555/api/LunchAndLearn/attachments/${meetingId}`)
      .then((res) => res.json())
      .then((data) => {
        setAttachmentData(data);
      });
  }, [attachmentData, meetingId]);

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
        <ul>
          {attachmentData.map((attachment: Attachment) => (
            <li key={attachment.attachmentId}>
              <a href={attachment.publicUri}>{attachment.fileName}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default AttachmentsList;
