import { InputHTMLAttributes } from "react";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const Input = ({ id, label, ...props }: InputProps) => {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
};
