import { Container } from "./style";
import { IoSearchOutline } from "react-icons/io5";

export function Input({ variant, ...res }) {
    return (
        <Container>
            {
                variant&&
                <IoSearchOutline />
            }
            <input {...res}/>
        </Container>
    )
}