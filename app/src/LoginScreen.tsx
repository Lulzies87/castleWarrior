import { FormEvent } from "react";
import styles from "./LoginScreen.module.scss";

export function LoginScreen() {

    const login = (e: FormEvent<HTMLFormElement>) => {
        console.log("login");
        e.preventDefault();

        return;
    }
  return (
    <>
      <h1 className={styles.title}>Castle Warrior</h1>
      <form onSubmit={login} noValidate>
        <div className="form-field">
          <label htmlFor="nickname">Nickname:</label>
          <Input id="nickname" name="nickname" type="text" autoFocus required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <Input id="password" name="password" type="text" required />
        </div>
        <button>
          Login
        </button>
      </form>
    </>
  );
}

function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}
