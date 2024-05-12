import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getPlayerData, isLoggedIn, removeCookie } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setPlayerData } from "./redux/playerSlice";
import { AxiosResponse } from "axios";
import styles from "./MainMenu.module.scss";

export function MainMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerData = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn()) {
          const response = (await getPlayerData()) as AxiosResponse;
          if (response.status === 200) {
            dispatch(setPlayerData(response.data));
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        navigate("/login");
      }
    };

    fetchData();
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
