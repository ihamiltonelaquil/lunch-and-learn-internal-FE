import Navbar from "./Navigation/Navbar";
import CardSlider from "./Cards/CardSlider";
import GreetingCard from "./Cards/GreetingCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import ListView from "./Cards/ListView";

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
      <CardSlider />
      <ListView />
    </>
  );
};

export default MainPage;
