import { Container } from "./style";

export function ButtonFilter({name, isActive = false, onClick}){
    return (
        <Container $isActive={isActive} onClick={onClick}>
            {name}
        </Container>
    )
}