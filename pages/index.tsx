import { useUser } from "@auth0/nextjs-auth0/client";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navigation/Navbar";
import MainPage from "../components/MainPage";

const Index = () => {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <p>Loading login info...</p>}

      {!isLoading && !user && (
        <>
          <LandingPage />
        </>
      )}

      {user && (
        <>
          <MainPage />
        </>
      )}
    </>
  );
};

export default Index;
