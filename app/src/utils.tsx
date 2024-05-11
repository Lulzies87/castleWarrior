import axios from "axios";
import Cookies from "js-cookie";

export function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}

export const getPlayerData = async () => {
  try {
    const res = await axios.get("/playerData");

    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export async function handleCheckIfUserIsconnected() {
  try {
    const { data } = await axios.get("/get-user-by-cookie");
    const { playerData } = data;

    console.log("user details:", playerData);
  } catch (error) {
    console.error(error);
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
