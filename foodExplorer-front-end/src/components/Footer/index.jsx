import { Container } from "./style";
import { Logo } from "../Logo";

export function Footer() {
    return (
        <Container>
            <Logo variant={"footer"}/>
            <p>© 2023 - Todos os direitos reservados.</p>
        </Container>
    );
}