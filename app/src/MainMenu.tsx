import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "./MainMenu.module.scss";

export function MainMenu() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handlePlay = () => {
    navigate("/play");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

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
