export function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}

export const isLoggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
}