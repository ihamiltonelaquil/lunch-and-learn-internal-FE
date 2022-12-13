import styles from "../styles/Landingpage.module.css";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <div className={styles.landingPage}>
        <div className={styles.login}>
          <div>
            <h1 className={styles.heading}>Welcome to Lunch and Learn</h1>
            <button
              type="button"
              className={styles.loginButton}
              onClick={() => router.push("/api/auth/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
