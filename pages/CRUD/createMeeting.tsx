import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const createMeeting = () => {
  //used for POST
  const [creatorName, setCreatorName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [linkToSlides, setLinkToSlides] = useState("");
  const [teamsLink, setTeamsLink] = useState("");

  const [status, setStatus] = useState<any>();
  const { user } = useUser();

  function saveData() {
    let data = {
      authID: user?.sub || "fail",
      creatorName,
      meetingTime,
      topic,
      description,
      linkToSlides,
      teamsLink,
    };
    fetch("https://localhost:555/api/Meeting", {
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
        console.error(error);
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
        <form>
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
        </form>
      </div>
    </>
  );
};

export default createMeeting;
