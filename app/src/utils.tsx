export function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}