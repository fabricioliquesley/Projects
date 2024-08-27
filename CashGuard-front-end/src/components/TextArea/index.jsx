import { Container } from "./style";

export function TextArea({ editable, ...rest }) {
    return (
        <Container {...rest} readOnly={editable}>

        </Container>
    )
}