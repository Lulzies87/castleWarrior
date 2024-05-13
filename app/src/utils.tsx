import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}

export async function getPlayerData() {
  try {
    const res = await server.get("/playerData", {
      withCredentials: true,
    });

    return res;
  } catch (err: any) {
    console.error(err.response.data);
  }
}

export function isLoggedIn() {
  if (!Cookies.get("token")) {
    return false;
  }
  return true;
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}

export const server: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});
