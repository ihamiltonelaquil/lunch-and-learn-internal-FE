import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navbar() {
  const { user } = useUser();
  return (
    <>
      <nav></nav>
    </>
  );
}
