import styles from "../styles/Landingpage.module.css";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <div className="container">
        <h1 className="fw-bold text-center text-dark pt-5">
          Welcome to Lunch and Learn
        </h1>
        <button
          type="button"
          className={styles.loginButton}
          onClick={() => router.push("/api/auth/login")}
        >
          Login
        </button>
      </div>
    </>
  );
}
