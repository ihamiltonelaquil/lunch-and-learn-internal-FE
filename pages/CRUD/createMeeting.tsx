import { useState } from "react";
import Link from "next/link";

const createMeeting = () => {
  //used for POST
  const [creatorName, setCreatorName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [linkToSlides, setLinkToSlides] = useState("");
  const [teamsLink, setTeamsLink] = useState("");

  const [status, setStatus] = useState<any>();

  function saveData() {
    let data = {
      creatorName,
      meetingTime,
      topic,
      description,
      linkToSlides,
      teamsLink,
    };
    fetch("https://localhost:555/api/LunchAndLearn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setStatus(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container w-50 mb-3">
        <Link className="btn btn-dark" href="/">
          Home
        </Link>
      </div>

      <div className="container w-50">
        <div className="container w-50 float-start">
          <div className="form-group">
            <input
              placeholder="Name"
              className="form-control mb-2"
              onChange={(e) => setCreatorName(e.target.value)}
            />
            <input
              placeholder="Time"
              className="form-control mb-2"
              onChange={(e) => setMeetingTime(e.target.value)}
            />
            <input
              placeholder="Topic"
              className="form-control mb-2"
              onChange={(e) => setTopic(e.target.value)}
            />
            <input
              placeholder="Description"
              className="form-control mb-2"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              placeholder="Link to slides or something"
              className="form-control mb-2"
              onChange={(e) => setLinkToSlides(e.target.value)}
            />
            <input
              placeholder="Another link"
              className="form-control mb-2"
              onChange={(e) => setTeamsLink(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group-append">
          <button className="btn btn-dark btn-sm" onClick={saveData}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default createMeeting;
