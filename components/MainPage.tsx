import Navbar from "./Navigation/Navbar";
import GreetingCard from "./Cards/GreetingCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import CardOrList from "./Cards/CardOrList";
import { useState, useEffect } from "react";

const MainPage = () => {
  const { user } = useUser();
  const [isTrue, setIsTrue] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsTrue(false);
    }, 1);
  }, []);

  return (
    <>
      <Navbar />
      {isTrue ? (
        <GreetingCard
          name={
            typeof user?.nickname == "string"
              ? user.nickname.replaceAll(".", " ").toString()
              : "No nickname found"
          }
        />
      ) : (
        <CardOrList />
      )}
    </>
  );
};

export default MainPage;
