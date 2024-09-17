import { TextareaHTMLAttributes } from "react";
import "./styles.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

export const Textarea = ({ id, label, ...props }: TextareaProps) => {
  return (
    <div className="textarea-block">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...props} />
    </div>
  );
};
