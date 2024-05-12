import { useNavigate } from "react-router";
import { useEffect } from "react";
import { isLoggedIn, removeCookie } from "./utils";
import { useSelector } from "react-redux";
import styles from "./MainMenu.module.scss";
import { RootState } from "./redux/store";

export function MainMenu() {
  const navigate = useNavigate();
  const playerData = useSelector((state: RootState) => state.player);

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
      <p>
        Welcome <span className={styles.playerInfo}>{playerData.nickname}</span>
        !
      </p>
      {playerData.highscore > 0 && (
        <p>
          Your high score is:{" "}
          <span className={styles.playerInfo}>{playerData.highscore}</span>
        </p>
      )}
      <ul className={styles.menuOptions}>
        <li onClick={handlePlay}>Start</li>
        <li onClick={handleLogout}>Log Out</li>
      </ul>
    </main>
  );
}
