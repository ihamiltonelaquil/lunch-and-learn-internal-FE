import styles from "../styles/Mainpage.module.css";
import Navbar from "./Navigation/Navbar";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import MainPageCard from "./Cards/MainCard";
import { StyledContainer } from "./styledComponents";
import Link from "next/link";
import { convertToDate } from "../lib/dateHelper";
import MeetingCard from "./Cards/MeetingCard";

const MainPage = () => {
  const [landingData, setLandingData] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchText, setSearchText] = useState("");

  //refactor into sep file
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
        setLandingData(data);
      });
  }, [landingData]);

  if (!Array.isArray(landingData))
    return (
      <>
        <div>Need to do error message here</div>
      </>
    );

  return (
    <>
      <div className={styles.container}>
        <Navbar />

        <div className="inputForm">
          <form onSubmit={handleSubmit}>
            <label>
              Type a name
              <input value={searchName} onChange={handleChange}></input>
            </label>
            <button type="submit" value="Submit">
              Submit
            </button>

            <Link className="btn btn-dark" href="/CRUD/deleteMeeting">
              Delete
            </Link>

            <Link className="btn btn-dark" href="/CRUD/createMeeting">
              Create
            </Link>

            <Link className="btn btn-dark" href="/CRUD/updateMeeting">
              Update
            </Link>
          </form>
        </div>

        <div>
          {landingData.map((data) => {
            {
              const parsedDate = convertToDate(data.meetingTime);
              return (
                <>
                  <MeetingCard meetingData={data} />
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default MainPage;
