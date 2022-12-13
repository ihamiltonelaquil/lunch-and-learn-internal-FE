import { useUser } from "@auth0/nextjs-auth0/client";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navigation/Navbar";
import MainPage from "../components/MainPage";
import MainCard from "../components/Cards/MainCard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

const deleteMeeting = () => {
  const [allData, setAllData] = useState<any[]>([]);
  const [resultData, setResultData] = useState<any[]>([]);
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

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const appMode = event.currentTarget.getAttribute("data-meetingID");
    console.log(appMode);
  };

  useEffect(() => {
    fetch(`https://localhost:555/api/LunchAndLearn/get/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setResultData(data);
      });
  }, [resultData]);

  if (!Array.isArray(resultData))
    return (
      <>
        <div>Need to do error message here</div>
      </>
    );

  return (
    <>
      <div className="inputForm">
        <form onSubmit={handleSubmit}>
          <label>
            Search for a name
            <input value={searchName} onChange={handleChange}></input>
          </label>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
      <div>
        {resultData.map((data) => {
          {
            return (
              <>
                <div className="container">
                  <div key={data.meetingID}>
                    <p>{data.creatorName}</p>
                    <button
                      data-meetingID={data.meetingID}
                      onClick={buttonHandler}
                    >
                      a
                    </button>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default deleteMeeting;
