import { Container } from "./style";
import { Profile } from "../../components/Profile"

export function Header() {
    return (
        <Container>
            <h1>CashGuard</h1>
            <Profile />
        </Container>
    )
}