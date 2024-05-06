import styles from "./App.module.scss";
import { GameScreen } from "./GameScreen";
import { LoginScreen } from "./LoginScreen";

function App() {
  return (
    <div className={styles.gameContainer}>
      <LoginScreen />
      {/* <GameScreen /> */}
    </div>
  );
}

export default App;
