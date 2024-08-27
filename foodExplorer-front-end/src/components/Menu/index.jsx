import { Container } from "./style";
import { Input } from "../Input";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../hook/auth";

export function Menu({ status, variant, action }) {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    function executeSignOut() {
        signOut();
        navigate("/")
    }

    return (
        <Container $status={status}>
            <Input
                variant
                placeholder="Busque por pratos ou ingredientes"
                type="text"
                onChange={action}
            />
            <div className="buttons">
                {
                    variant == "admin" ?
                        <>
                            <Link to={"/create"}>
                                Novo prato
                            </Link>
                            <Link to={"/orders/control"}>
                                Pedidos
                            </Link>
                        </>
                        :
                        <>
                            <Link to={"/favorites"}>
                                Meus favoritos
                            </Link>
                            <Link to={"/orders/history"}>
                                Histórico de pedidos
                            </Link>
                        </>
                }
                <button onClick={executeSignOut}>
                    Sair
                </button>
            </div>
        </Container>
    )
}