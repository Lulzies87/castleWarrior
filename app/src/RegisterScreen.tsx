import { FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Input } from "./utils";
import styles from "./RegisterScreen.module.scss";

export function RegisterScreen() {
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
  
        localStorage.setItem("token", res.data);
        navigate("/");
      } catch (err) {
        console.error("Couldn't login, please check nickname & password");
      }
    };
    return (
      <main className={styles.registerContainer}>
        <h1 className={styles.title}>Castle Warrior</h1>
        <form className={styles.registerForm} onSubmit={login} noValidate>
          <div className="form-field">
            <label htmlFor="nickname">Nickname </label>
            <Input id="nickname" name="nickname" type="text" autoFocus required />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password </label>
            <Input id="password" name="password" type="text" required />
          </div>
          <button>Register</button>
        </form>
        <a href="/login">Login</a>
      </main>
    );
  }