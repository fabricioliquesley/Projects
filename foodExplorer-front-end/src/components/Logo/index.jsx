import { Container } from "./style";
import explorerLogo from "/explorer.svg"

import { useNavigate } from "react-router-dom";

export function Logo({ variant = false }) {
    const navigate = useNavigate();

    function navigateToHome(){
        return navigate("/"); 
    }

    return (
        <Container $variant={variant} onClick={navigateToHome}>
            <div>
                <img src={explorerLogo} alt="Logo do food explorer" />
                <h1 className="roboto-bold">food explorer</h1>
            </div>
            {
                variant == "admin" &&
                <span className="roboto-regular">admin</span>
            }
        </Container>
    )
}