import { useUser } from "@auth0/nextjs-auth0/client";
import LandingPage from "../../components/LandingPage";
import Navbar from "../../components/Navigation/Navbar";
import MainPage from "../../components/MainPage";
import MainCard from "../../components/Cards/MainCard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { stat } from "fs";
import Link from "next/link";

const createMeeting = () => {
  const [resultData, setResultData] = useState<any[]>([]);

  const [creatorName, setCreatorName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [linkToSlides, setLinkToSlides] = useState("");
  const [teamsLink, setTeamsLink] = useState("");

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
    }).then((response) => console.warn("resp", response));
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
                id="testInput"
                className="form-control"
                onChange={(e) => setCreatorName(e.target.value)}
              />
              <input
                className="form-control"
                onChange={(e) => setMeetingTime(e.target.value)}
              />
              <input
                className="form-control"
                onChange={(e) => setTopic(e.target.value)}
              />
              <input
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="form-control"
                onChange={(e) => setLinkToSlides(e.target.value)}
              />
              <input
                className="form-control"
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
