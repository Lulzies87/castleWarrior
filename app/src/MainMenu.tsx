import { useNavigate } from "react-router";
import { useEffect } from "react";
import { isLoggedIn, removeCookie } from "./utils";
import styles from "./MainMenu.module.scss";

export function MainMenu() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    removeCookie("token");
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
