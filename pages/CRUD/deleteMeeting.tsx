import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

const deleteMeeting = () => {
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
    const meetingID = event.currentTarget.getAttribute("data-meetingid");
    if (meetingID != null) {
      fetch(`https://localhost:555/api/Meeting/${meetingID}`, {
        method: "DELETE",
        mode: "cors",
      });
    }
  };

  useEffect(() => {
    fetch(`https://localhost:555/api/Meeting/${searchText}`)
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
            <Link className="btn btn-dark" href="/">
              Home
            </Link>
          </form>
        </div>
      </div>
      <div>
        {resultData.map((data) => {
          {
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
