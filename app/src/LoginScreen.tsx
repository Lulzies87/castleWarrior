import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { Input, getPlayerData, isLoggedIn } from "./utils";
import { useDispatch } from "react-redux";
import { setPlayerData } from "./redux/playerSlice";
import { server } from "./router";
import styles from "./LoginScreen.module.scss";

export function LoginScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname") as string;
    const password = formData.get("password");

    try {
      await server.post(
        "/login",
        {
          nickname,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const playerData = await getPlayerData();
      if (playerData) {
        dispatch(setPlayerData(playerData.data));
        return navigate("/");
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Castle Warrior</h1>
      <form className={styles.loginForm} onSubmit={login} noValidate>
        <h2 className={styles.subTitle}>Login</h2>
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
        <button className={styles.button}>Login</button>
      </form>
      <a className={styles.button} href="/register">Register</a>
    </main>
  );
}
