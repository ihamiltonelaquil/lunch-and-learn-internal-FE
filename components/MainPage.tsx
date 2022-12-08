import styles from "../styles/Mainpage.module.css";
import Navbar from "./Navigation/Navbar";
const MainPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div></div>
      </div>
    </>
  );
};

export default MainPage;
