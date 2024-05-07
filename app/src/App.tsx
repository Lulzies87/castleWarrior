import { Outlet } from "react-router";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.gameContainer}>
      <Outlet />
    </div>
  );
}

export default App;
