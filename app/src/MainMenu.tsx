import styles from "./MainMenu.module.scss";

export function MainMenu() {
    return (
      <main className={styles.mainMenuContainer}>
        <h1>Casle Warrior</h1>
        <ul>
          <li>Start</li>
          <li>Exit</li>
        </ul>
      </main>
    );
  }