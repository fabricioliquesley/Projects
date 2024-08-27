import { Container, Header, Content } from "./style";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

import { FiArrowLeft, FiUser, FiMail, FiKey } from "react-icons/fi";
import { RxExit } from "react-icons/rx";

import { useAuth } from "../../hook/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function UpdateProfile() {
    const { user, signOut, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [old_password, setOld_password] = useState("");
    const [password, setPassword] = useState("");

    function logOut() {
        navigate("/");

        signOut();
    }

    async function update(){
        const user = {
            name,
            email,
            old_password,
            password
        }

        await updateProfile({user: user})
            .then((response) => {
                if(response.status === 201) alert("Perfil atualizado!");
            }).catch((erro) => {
                if(erro.response){
                    alert(erro.response.data.message);
                }
            })

    }

    return (
        <Container>
            <Header>
                <Link to={-1}>
                    <FiArrowLeft />
                    <h3>Voltar</h3>
                </Link>
                <button onClick={logOut}>
                    <RxExit />
                </button>
            </Header>
            <div>
                <h1>Perfil</h1>
            </div>
            <Content>
                <fieldset>
                    <Input
                        icon={FiUser}
                        placeholder={"Nome"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={FiMail}
                        placeholder={"E-mail"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        icon={FiKey}
                        placeholder={"Senha antiga"}
                        value={old_password}
                        onChange={(e) => setOld_password(e.target.value)}
                    />
                    <Input
                        type="password"
                        icon={FiKey}
                        placeholder={"Nova senha"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <Button
                    title={"salvar"}
                    onClick={update}
                />
            </Content>
        </Container>
    )
}