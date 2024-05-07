import styles from "./MainMenu.module.scss";

export function MainMenu() {
    return (
      <main className={styles.mainMenuContainer}>
        <h1 className={styles.title}>Castle Warrior</h1>
        <ul className={styles.menuOptions}>
          <li>Start</li>
          <li>Exit</li>
        </ul>
      </main>
    );
  }