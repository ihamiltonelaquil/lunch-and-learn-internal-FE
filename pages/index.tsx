import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
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
      fetch(`https://localhost:555/api/user/${user?.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setBusy(false);
        });
    }
  }, [user]);

  if (isLoading) {
    return "loading";
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
