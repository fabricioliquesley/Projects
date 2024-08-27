import { Container } from "./style";
import { Link } from "react-router-dom";

import remy from "../../assets/remy_bravo3.png";

export function NotFound() {
    function showMessage() {
        const threat = document.querySelector(".threat");

        threat.style.display = "block";
    }

    return (
        <Container>
            <img src={remy} alt="" />
            <div className="text">
                <h1>404 - Pare imediatamente</h1>
                <p className="message" onMouseEnter={showMessage}>
                    Parece que você está tentando se aventurar por locais de acesso
                    restrito <Link to={"/"}>volte imediatemente</Link>.
                </p>
            </div>
        </Container>
    )
}