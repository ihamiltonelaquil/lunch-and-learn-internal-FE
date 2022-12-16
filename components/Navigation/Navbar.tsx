import { useUser } from "@auth0/nextjs-auth0/client";
import { AiOutlineUser } from "react-icons/ai";

export default function Navbar() {
  const { user } = useUser();
  const pic = null;
  return (
    <>
      <AiOutlineUser size={35} />
        <img src={typeof user?.picture === "string" ? user.picture: "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"} alt="Profile Image" className="profileImage"></img>
      <nav>
        <a href="/api/auth/logout">Logout</a>
      </nav>
    </>
  );
}
