import { Container } from "./style";

export function Input({ icon: Icon, editable, ...rest }) {
    return (
        <Container>
            {Icon && <Icon />}
            <input type="text" {...rest} autoComplete="none" readOnly={editable}/>
        </Container>
    )
}