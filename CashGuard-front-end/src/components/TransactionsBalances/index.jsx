import { Container } from "./style";

export function TransactionsBalances({ icon: Icon, title, value, type = false }) {
    return (
        <Container $type={type}>
            <Icon />
            <div>
                <span>{title}</span>
                <p>R$ {value}</p>
            </div>
        </Container>
    )
}