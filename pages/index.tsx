import { useUser } from "@auth0/nextjs-auth0/client";
import LandingPage from "../components/LandingPage";

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
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>

          <a href="/api/auth/logout">Logout</a>
        </>
      )}
    </>
  );
};

export default Index;
