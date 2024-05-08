import { FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Input } from "./utils";
import styles from "./LoginScreen.module.scss";

export function LoginScreen() {
  const navigate = useNavigate();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname");
    const password = formData.get("password");

    try {
      const res = await axios.post("http://localhost:3000/login", {
        nickname,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      alert(err.response.data.error);
    }
  };
  return (
    <main className={styles.loginContainer}>
      <h1 className={styles.title}>Castle Warrior</h1>
      <h2>Login</h2>
      <form className={styles.loginForm} onSubmit={login} noValidate>
        <div className="form-field">
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="Nickname"
            autoFocus
            required
          />
        </div>
        <div className="form-field">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button>Login</button>
      </form>
      <a href="/register">Register</a>
    </main>
  );
}
