import { Container } from "./style";
import { Logo } from "../../components/Logo";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../../hook/auth";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    async function executeSignIn(e) {
        e.preventDefault();

        if (!email || !password) {
            return alert("Preencha todos os campos");
        }

        if (password.length < 6){
            return alert("A senha deve ser de no mínimo 6 caracteres");
        }

        signIn({email, password});
    }

    return (
        <Container>
            <Logo />
            <Form>
                <h2 className="poppins-medium">
                    Faça login
                </h2>
                <fieldset>
                    <label htmlFor="email" className="roboto-regular">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password" className="roboto-regular">Senha</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="No mínimo 6 caracteres"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <Button title={"Entrar"} onClick={(e) => executeSignIn(e)} />
                <Link
                    className="poppins-medium"
                    to={"/register"}
                >
                    Criar uma conta
                </Link>
            </Form>
        </Container>
    )
}