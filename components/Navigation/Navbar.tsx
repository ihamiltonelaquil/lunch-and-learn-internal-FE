import { useUser } from "@auth0/nextjs-auth0/client";
import { AiOutlineUser } from "react-icons/ai";

export default function Navbar() {
  const { user } = useUser();
  return (
    <>
      <AiOutlineUser size={35} />
      <nav>
        <a href="/api/auth/logout">Logout</a>
      </nav>
    </>
  );
}
