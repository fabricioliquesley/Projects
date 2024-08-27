import { Container } from "./style";

export function Button({ title, className, variant, ...res }) {
    return (
        <Container
            className={className}
            $variant={variant}
            {...res}
            disabled={variant}
        >
            {title}
        </Container>
    )
}