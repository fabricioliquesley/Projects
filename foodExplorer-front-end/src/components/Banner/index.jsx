import { Container } from "./style";
import bannerImg from "../../assets/banner_image.png";

export function Banner() {
    return (
        <Container>
            <div className="imgContainer">
                <img src={bannerImg} alt="Imagem ilustrativa de frutas e biscoitos" />
            </div>
            <div className="text">
                <h2>Sabores inigualáveis</h2>
                <p>Sinta o cuidado do preparo com ingredientes selecionados.</p>
            </div>
        </Container>
    )
}