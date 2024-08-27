import { Container, Form } from "./style";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { FiUser, FiMail, FiKey } from "react-icons/fi";

import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function registerUser(){
        if(!name || !email || !password) return alert("Preencha todos os campos!");

        api.post("/users", {name, email, password})
            .then(() => {
                navigate("/");

                alert("Usuário cadastrado!");
            })
            .catch((error) => {
                if(error.response){
                    alert(error.response.data.message);
                } else {
                    alert("Não foi possível cadastrar o usuário!");
                }
            });
    }   

    return (
        <Container>
            <Form>
                <Input
                    icon={FiUser}
                    placeholder={"Nome"}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    icon={FiMail}
                    placeholder={"E-mail"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    icon={FiKey}
                    placeholder={"Senha"}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    title={"Cadastrar"}
                    type="button"
                    onClick={registerUser}
                />
                <Link to={"/"}>
                    Já tem uma conta? faça login
                </Link>
            </Form>
        </Container>
    )
}