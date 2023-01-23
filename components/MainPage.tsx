import Navbar from "./Navigation/Navbar";
import GreetingCard from "./Cards/GreetingCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import CardOrList from "./Cards/CardOrList";

const MainPage = () => {
  const { user } = useUser();

  return (
    <>
      <Navbar />
      <GreetingCard
        name={
          typeof user?.nickname == "string"
            ? user.nickname.replaceAll(".", " ").toString()
            : "No nickname found"
        }
      />
      <CardOrList />
    </>
  );
};

export default MainPage;
