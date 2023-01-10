import { useState } from "react";

export default function Attachments(){

    const [file, setFile] = useState<File | null>(null)

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    }
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData();
        if (file) {
            data.append("file", file);
            const res = await fetch("https://localhost:555/api/LunchAndLearn/upload", {
                method: "POST",
                body: data,
            });
        }
    
    }

    return(
    
    <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
    </form>
    
    )
}