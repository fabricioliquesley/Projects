import "./dialog.css";

import { FiCheckCircle } from "react-icons/fi";

interface DialogProps {
  isOpen: boolean;
  onClick: () => void;
}

export function Dialog({ isOpen, onClick }: DialogProps) {
  if (!isOpen) {
    return null;
  }

  let scrollPosition = window.scrollY;

  return (
    <div
      id="dialog-container"
      onClick={onClick}
      style={{ top: scrollPosition }}
    >
      <FiCheckCircle id="check" />
      <h1 id="dialog-title">Cadastro concluído</h1>
    </div>
  );
}
