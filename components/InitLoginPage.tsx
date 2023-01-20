import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Props {
  userAuthID: string;
}

const InitLoginPage = () => {
  const { user, isLoading } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userAuthID, setUserAuthID] = useState(undefined || String);

  useEffect(() => {
    if (user?.sub != undefined) {
      setUserAuthID(user.sub);
    }
  }, [user?.sub, userAuthID]);

  function saveData() {
    let data = {
      authID: userAuthID,
      firstName,
      lastName,
    };

    fetch("https://localhost:555/api/User", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className="container w-50">
        <form>
          <div className="container w-50 float-start">
            <div className="form-group">
              <input
                placeholder="First Name"
                className="form-control mb-2"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                placeholder="Last Name"
                className="form-control mb-2"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group-append">
            <button className="btn btn-dark btn-sm" onClick={saveData}>
              Save Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InitLoginPage;
