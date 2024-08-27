import { Container } from "./style";
import { FiUpload } from "react-icons/fi";

export function FormInput({ label, variant, text, className, ...res }) {
    return (
        <Container $variant={variant} className={className}>
            <label htmlFor="inputLabel">{label}</label>
            <div>
                {
                    variant == "file" &&
                    <>
                        <FiUpload size={24} />
                        {
                            text ? <p>{text}</p> : <p>Selecione imagem</p>
                        }
                    </>
                }
                <input type="text" id="inputLabel" {...res} />

            </div>
        </Container>
    );
}