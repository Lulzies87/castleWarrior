import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { MainMenu } from "./MainMenu";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";
import { GameScreen } from "./GameScreen";
import axios from "axios";

export const server = axios.create({
  baseURL: "https://castlewarrior-api.lulzies.top",
});

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: MainMenu,
      },
      {
        path: "/login",
        Component: LoginScreen,
      },
      {
        path: "/register",
        Component: RegisterScreen,
      },
      {
        path: "/play",
        Component: GameScreen,
      },
    ],
  },
]);
