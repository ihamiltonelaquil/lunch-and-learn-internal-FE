import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

const updateMeeting = () => {
  //for PUT
  const [creatorName, setCreatorName] = useState<any>();
  const [meetingTime, setMeetingTime] = useState<any>();
  const [topic, setTopic] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [linkToSlides, setLinkToSlides] = useState<any>();
  const [teamsLink, setTeamsLink] = useState<any>();

  const [meetingID, setMeetingID] = useState<any>();
  const [response, setResponse] = useState<any>();

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
    setMeetingID(event.currentTarget.getAttribute("data-meetingid"));
    setCreatorName(event.currentTarget.getAttribute("data-creatorname"));
    setMeetingTime(event.currentTarget.getAttribute("data-meetingtime"));
    setTopic(event.currentTarget.getAttribute("data-topic"));
    setDescription(event.currentTarget.getAttribute("data-description"));
    setLinkToSlides(event.currentTarget.getAttribute("data-linktoslides"));
    setTeamsLink(event.currentTarget.getAttribute("data-linkteams"));
  };

  function saveData() {
    let data = {
      creatorName,
      meetingTime,
      topic,
      description,
      linkToSlides,
      teamsLink,
    };
    fetch(`https://localhost:555/api/LunchAndLearn/${meetingID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => setResponse(response));
  }

  if (meetingID == undefined) {
    return (
      <>
        <div className="inputForm">
          <form onSubmit={handleSubmit}>
            <label>
              Type a name
              <input value={searchName} onChange={handleChange}></input>
            </label>
            <button type="submit" value="Submit">
              Submit
            </button>

            <Link className="btn btn-dark" href="/">
              Home
            </Link>
          </form>
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
                      data-creatorname={data.creatorName}
                      data-meetingtime={data.meetingTime}
                      data-topic={data.topic}
                      data-description={data.description}
                      data-linktoslides={data.linkToSlides}
                      data-linkteams={data.teamsLink}
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
      </>
    );
  }
  return (
    <>
      <div className="inputForm">
        <form onSubmit={handleSubmit}>
          <label>
            Type a name
            <input value={searchName} onChange={handleChange}></input>
          </label>
          <button type="submit" value="Submit">
            Submit
          </button>

          <Link className="btn btn-dark" href="/">
            Home
          </Link>
        </form>
      </div>

      <div className="container w-50">
        <h5>Update meeting details for {creatorName}</h5>
        <form>
          <div className="container w-50 float-start">
            <div className="form-group">
              <input
                id="testInput"
                className="form-control"
                placeholder="Update creator name"
                onChange={(e) => {
                  if (e.target.value) {
                    setCreatorName(e.target.value);
                  }
                }}
              />
              <input
                placeholder="Update meeting time"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value) {
                    setMeetingTime(e.target.value);
                  }
                }}
              />

              <input
                placeholder="Update topic"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value) {
                    setTopic(e.target.value);
                  }
                }}
              />

              <input
                placeholder="Update description"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value) {
                    setDescription(e.target.value);
                  }
                }}
              />

              <input
                placeholder="Update link to slides"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value) {
                    setLinkToSlides(e.target.value);
                  }
                }}
              />

              <input
                placeholder="Update link to teams"
                className="form-control"
                onChange={(e) => {
                  if (e.target.value) {
                    setTeamsLink(e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="input-group-append">
            <button className="btn btn-dark btn-sm" onClick={saveData}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default updateMeeting;
