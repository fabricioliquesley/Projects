import { Container } from "./style";

export function TextArea({label, className, ...res}){
    return (
        <Container className={className}>
            <label htmlFor="textAreaLabel">{label}</label>
            <textarea id="textAreaLabel" maxLength={225} {...res}></textarea>
        </Container>
    )
}