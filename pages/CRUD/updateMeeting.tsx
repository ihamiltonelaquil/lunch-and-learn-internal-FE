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
    const currentID = event.currentTarget.getAttribute("data-meetingid");
    setMeetingID(currentID);
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
        <p>{meetingID}</p>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default updateMeeting;
