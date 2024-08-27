import { Container } from "./style";
import { Logo } from "../../components/Logo";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { useState } from "react";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function createUser(e) {
        e.preventDefault();
        
        if (!name || !email || !password) {
            return alert("Preencha todos os campos");
        }

        if (password.length < 6){
            return alert("A senha deve ser de no mínimo 6 caracteres");
        }

        try {
            await api.post("/users", {
                name,
                email,
                password
            })

            return navigate("/");
        }
        catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
            else {
                alert("Não foi possível criar a conta");
            }
        }
    }

    return (
        <Container>
            <Logo />
            <Form>
                <h2 className="poppins-medium">
                    Crie sua conta
                </h2>
                <fieldset>
                    <label htmlFor="name" className="roboto-regular">Nome</label>
                    <Input
                        id="name"
                        type="name"
                        placeholder="Exemplo: Maria da Silva"
                        onChange={e => setName(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email" className="roboto-regular">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                        onChange={e => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password" className="roboto-regular">Senha</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="No mínimo 6 caracteres"
                        onChange={e => setPassword(e.target.value)}
                    />
                </fieldset>
                <Button title={"Criar conta"} onClick={e => createUser(e)}/>
                <Link
                    to={"/"}
                    className="poppins-medium"
                >
                    Já tenho uma conta
                </Link>
            </Form>
        </Container>
    )
}