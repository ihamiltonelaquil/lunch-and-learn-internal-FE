import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import LandingPage from "../components/LandingPage";
import LoginScreen from "../components/LoginScreen";
import MainPage from "../components/MainPage";

const Index = () => {
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState({ status: null });
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    if (user?.sub != undefined || null) {
      setBusy(true);
      fetch(process.env.API_ROUTE+`/api/user/${user?.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setBusy(false);
        });
    }
  }, [user]);

  if (isLoading) {
    return( 
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ReactLoading type="spin" color={typeof window !== 'undefined' ? window.getComputedStyle(document.body).getPropertyValue('--colour-primary-dark') : "#007a8a"}></ReactLoading>
        <div style={{margin: "20px"}}><b>Loading...</b></div>
      </div>
      );
  }

  if (!isLoading || !isBusy) {
    if (!user) {
      return <LandingPage />;
    } else if (user && userData.status === 404) {
      return <LoginScreen />;
    } else {
      return <MainPage />;
    }
  }
};

export default Index;
