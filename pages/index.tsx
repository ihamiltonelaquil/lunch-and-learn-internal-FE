import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import InitLoginPage from "../components/InitLoginPage";
import LandingPage from "../components/LandingPage";
import MainPage from "../components/MainPage";

const Index = () => {
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`https://localhost:555/api/user/${user?.sub}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [userData]);

  if (Object.keys(userData).length != 1) {
    return <InitLoginPage />;
  }

  return (
    <>
      {isLoading && <>Loading login info...</>}

      {!isLoading && !user && (
        <div>
          <LandingPage />
        </div>
      )}
      {user && (
        <div>
          <MainPage />
        </div>
      )}
    </>
  );
};

export default Index;
