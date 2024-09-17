import "./styles.css";

import logo from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/icons/study.svg";
import giveClassesIcon from "../../assets/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/icons/purple-heart.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export const Landig = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api
      .get("/connections")
      .then((response) => setTotalConnections(response.data.total));
  }, []);

  return (
    <main id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy logotipo" />
          <h2>Conectamos você aos melhores proffys do Brasil.</h2>
        </div>
        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{" "}
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </main>
  );
};
