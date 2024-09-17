import "./styles.css";
import { Link } from "react-router-dom";

import leftArrowIcon from "../../assets/icons/back.svg";
import logo from "../../assets/images/logo.svg";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
  title: string;
}

export const Header = ({ children, title }: HeaderProps) => {
  return (
    <header className="page-header">
      <div className="top-barcontainer">
        <Link to={"/"}>
          <img src={leftArrowIcon} alt="Voltar" />
        </Link>
        <img src={logo} alt="Proffy logotipo" />
      </div>
      <div className="header-content">
        <strong>{title}</strong>
        {children}
      </div>
    </header>
  );
};
