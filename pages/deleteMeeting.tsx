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
  const [deleteID, setDeleteID] = useState("");

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
    const meetingID = event.currentTarget.getAttribute("data-meetingID");
    console.log(meetingID);
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
      <div className="container w-50 mb-3">
        <div className="input-group">
          <form onSubmit={handleSubmit}>
            <label>
              Search for a name
              <input
                className="mt-2 form-control"
                value={searchName}
                onChange={handleChange}
              />
            </label>
            <button className="btn-dark btn" type="submit" value="Submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        {resultData.map((data) => {
          {
            return (
              <>
                <div className="container w-50">
                  <div className="input-group m-2">
                    <div className="" key={data.meetingID}></div>
                    <div className="form-control">{data.creatorName}</div>
                    <div className="input-group-append">
                      <button
                        className="btn btn-dark btn-sm"
                        data-meetingID={data.meetingID}
                        onClick={buttonHandler}
                      >
                        Delete
                      </button>
                    </div>
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
