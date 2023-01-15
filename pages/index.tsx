import { useUser } from "@auth0/nextjs-auth0/client";
import LandingPage from "../components/LandingPage";
import MainPage from "../components/MainPage";

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
        <div>
          <MainPage />
        </div>
      )}
    </>
  );
};

export default Index;
