import styles from "../styles/Landingpage.module.css";

export default function LandingPage() {
  return (
    <>
      <div className={styles.landingpage}>
        <div className={styles.login}>
          <div>
            <h1 className={styles.heading}>Welcome to Lunch and Learn</h1>
            <a href="/api/auth/login">Login</a>
          </div>
        </div>
      </div>
    </>
  );
}
