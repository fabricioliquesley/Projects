import { Container } from "./style";

export function Select({ label, className, children, selectStatus, action }) {
    return (
        <Container
            $selectStatus={selectStatus}
            onClick={action}
            className={className}
        >
            <label htmlFor="">{label}</label>
            {children}
        </Container>
    )
}