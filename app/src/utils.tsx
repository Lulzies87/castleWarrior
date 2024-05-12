import axios from "axios";
import Cookies from "js-cookie";

export function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}

export async function getPlayerData() {
  try {
    const res = await axios.get("http://localhost:3000/playerData", {
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
