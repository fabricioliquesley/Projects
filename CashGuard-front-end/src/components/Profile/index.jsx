import { Container } from "./style";
import { FiUser } from "react-icons/fi";

export function Profile() {
    return (
        <Container to={"/profile"}>
            <FiUser/>
        </Container>
    )
}