import { useEffect, useState } from "react";
import { convertToDate } from "../lib/dateHelper";

export default function Attachments() {

    const [file, setFile] = useState<File | null>(null)
    const [attachments, setAttachments] = useState<any[]>([]);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData();
        const meetingId = "4a996676-19b6-4e87-3623-08daf1d1fcce";
        if (file) {
            data.append("file", file);
            const res = await fetch(`https://localhost:555/api/LunchAndLearn/upload?meetingId=${meetingId}`, {
                method: "POST",
                body: data,
            });
        }

    }

    useEffect(() => {
        fetch(`https://localhost:555/api/LunchAndLearn/attachments/`)
            .then((res) => res.json())
            .then((data) => {
                setAttachments(data);
            });
    }, [attachments]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <br></br>
            <h2>Attachments</h2>
            {attachments.map((data) => {
                {
                    return (
                        <>
                            <p>{data.fileName} - <a href={data.publicURI}>Download</a></p>
                        </>
                    );
                }
            })}
        </>
    )
}