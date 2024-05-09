import { useNavigate } from "react-router";
import { useEffect } from "react";
import styles from "./MainMenu.module.scss";
import { isLoggedIn } from "./utils";

export function MainMenu() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handlePlay = () => {
    navigate("/play");
  };


  return (
    <main className={styles.mainMenuContainer}>
      <h1 className={styles.title}>Castle Warrior</h1>
      <ul className={styles.menuOptions}>
        <li onClick={handlePlay}>Start</li>
        <li onClick={handleLogout}>Log Out</li>
      </ul>
    </main>
  );
}
