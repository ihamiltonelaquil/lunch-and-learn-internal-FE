import { useUser } from "@auth0/nextjs-auth0/client";
import LandingPage from "../../components/LandingPage";
import Navbar from "../../components/Navigation/Navbar";
import MainPage from "../../components/MainPage";
import MainCard from "../../components/Cards/MainCard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

const updateMeeting = () => {
  //for PUT
  const [creatorName, setCreatorName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [linkToSlides, setLinkToSlides] = useState("");
  const [teamsLink, setTeamsLink] = useState("");
  const [meetingID, setMeetingID] = useState("");

  //search variables
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchText(searchName);
    setSearchName("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  useEffect(() => {
    fetch(`https://localhost:555/api/LunchAndLearn/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchData(data);
      });
  }, [searchData]);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const meetingID = event.currentTarget.getAttribute("data-meetingid");
    if (meetingID != null) {
      fetch(`https://localhost:555/api/LunchAndLearn/${meetingID}`, {
        method: "PUT",
        mode: "cors",
      });
    }
  };

  function saveData(event: React.MouseEvent<HTMLButtonElement>) {
    let data = {
      creatorName,
      meetingTime,
      topic,
      description,
      linkToSlides,
      teamsLink,
    };
    const meetingID = event.currentTarget.getAttribute("data-meetingid");
    fetch(`https://localhost:555/api/LunchAndLearn/${meetingID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => console.warn("resp", response));
  }
  if (meetingID == new String()) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label>
            Type a name
            <input value={searchText} onChange={handleChange}></input>
          </label>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
        <div className="container w-50 mb-3">
          <Link className="btn btn-dark" href="/">
            Home
          </Link>
        </div>

        {searchData.map((data) => {
          return (
            <>
              <div key={data.meetingID} className="container w-50">
                <div className="input-group m-2">
                  <div className=""></div>
                  <div className="form-control">{data.creatorName}</div>
                  <div className="input-group-append">
                    <button
                      className="btn btn-dark btn-sm"
                      data-meetingid={data.meetingID}
                      onClick={buttonHandler}
                    >
                      Update Meeting
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}

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
  }
  return <>Not empty</>;
};

export default updateMeeting;
