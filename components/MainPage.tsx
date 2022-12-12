import styles from "../styles/Mainpage.module.css";
import Navbar from "./Navigation/Navbar";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

const MainPage = () => {
  const [landingData, setLandingData] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchText, setsearchText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setsearchText(searchName);
    setSearchName("");
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  useEffect(() => {
    fetch(`https://localhost:7115/api/LunchAndLearn/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setLandingData(data);
      });
  }, [landingData]);

  if (!landingData) return <div>No data</div>;

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
          </form>
        </div>

        <div>
          {landingData.map((data) => {
            {
              return (
                <div key={data.meetingID}>
                  <img src=""></img>
                  <p>{data.creatorName}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default MainPage;
