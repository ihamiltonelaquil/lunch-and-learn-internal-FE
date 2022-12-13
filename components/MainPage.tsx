import styles from "../styles/Mainpage.module.css";
import Navbar from "./Navigation/Navbar";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import MainPageCard from "./Cards/MainCard";
import Link from "next/link";

const MainPage = () => {
  const [landingData, setLandingData] = useState<any[]>([]);
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

            <Link className="btn btn-dark" href="/deleteMeeting">
              Delete
            </Link>
          </form>
        </div>

        <div>
          {landingData.map((data) => {
            {
              return (
                <>
                  <div key={data.meetingID} className="container">
                    <div key={data.meetingID}>
                      <p>{data.creatorName}</p>
                    </div>
                  </div>
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
