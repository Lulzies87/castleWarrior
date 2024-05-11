import { FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Input } from "./utils";
import styles from "./RegisterScreen.module.scss";

export function RegisterScreen() {
  const navigate = useNavigate();

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname");
    const password = formData.get("password");
    const validatePassword = formData.get("validatePassword");

    if (password !== validatePassword) {
      alert("Passwords don't match!");
      throw Error("Passwords don't match!");
    }

    try {
      const res = await axios.post("http://localhost:3000/register", {
        nickname,
        password,
      });

      // localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <main className={styles.registerContainer}>
      <h1 className={styles.title}>Castle Warrior</h1>
      <h2>Register</h2>
      <form className={styles.registerForm} onSubmit={register} noValidate>
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
        <div className="form-field">
          <Input
            id="validatePassword"
            name="validatePassword"
            type="password"
            placeholder="Repeat Password"
            required
          />
        </div>
        <button>Register</button>
      </form>
      <a href="/login">Login</a>
    </main>
  );
}
