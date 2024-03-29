import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

export default function Attachments() {
  const [file, setFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<Response>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList[0]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    const meetingId = "4a996676-19b6-4e87-3623-08daf1d1fcce";
    if (file) {
      data.append("file", file);
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_ROUTE+`/api/Attachment/upload?meetingId=${meetingId}`,
        {
          method: "POST",
          body: data,
        }
      );
      setResponseData(res);
      setFile(null);
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_ROUTE+`/api/Attachment`)
      .then((res) => res.json())
      .then((data) => {
        setAttachments(data);
      });
  }, []);

  return (
    <>
      {!isSubmitting ? (
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      ) : (
        <ReactLoading type="cylon" color={typeof window !== 'undefined' ? window.getComputedStyle(document.body).getPropertyValue('--colour-primary-dark') : "#007a8a"} height={50} width={50} />
      )}
      {responseData == undefined ? <></> : <p>{responseData.statusText}</p>}
      <br></br>
      <h2>Attachments</h2>
      {attachments.map((data) => {
        {
          return (
            <>
              <p id={data.attachmentId}>
                {data.fileName} - <a href={data.publicURI}>Download</a>
              </p>
            </>
          );
        }
      })}
    </>
  );
}
