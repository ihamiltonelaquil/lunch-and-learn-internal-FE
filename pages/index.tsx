import { useUser } from "@auth0/nextjs-auth0/client";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navigation/Navbar";
import MainPage from "../components/MainPage";
import MainCard from "../components/Cards/MainCard";

const Index = () => {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <>Loading login info...</>}

      {!isLoading && !user && (
        <div>
          <LandingPage />
        </div>
      )}

      {user && (
        <>
          {/* <MainCard /> */}
          <MainPage />
        </>
      )}
    </>
  );
};

export default Index;
