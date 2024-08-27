import { PHRASES } from "../../utils/phrases";

import { Container, Form, Message, BgEffect } from "./style";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { FiMail, FiKey } from "react-icons/fi";

import coin from "../../assets/coins-fill.svg";
import dollar from "../../assets/currency-circle-dollar-fill.svg";
import pig from "../../assets/piggy-bank-fill.svg";

import { useEffect, useState } from "react";
import { useAuth } from "../../hook/auth";

export function SignIn() {
    const [randomNumber, setRandomNumber] = useState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    function handleSigIn() {
        if (!email || !password) return alert("Preencha todos os campos!");

        signIn({ email, password });
    }

    useEffect(() => {
        function generateRandomNumber() {
            let random = Math.floor(Math.random() * 10)

            return random;
        }

        setRandomNumber(generateRandomNumber());
    }, [])

    return (
        <Container>
            <BgEffect src={coin} className="sprite1" />
            <Message>
                <h2>Frase do dia</h2>
                <q>
                    {PHRASES[randomNumber]}
                </q>
            </Message>
            <BgEffect src={pig} className="sprite2" />
            <Form>
                <Input
                    icon={FiMail}
                    placeholder={"E-mail"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    icon={FiKey}
                    placeholder={"Senha"}
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="button"
                    title={"Entrar"}
                    onClick={handleSigIn}
                />
                <Link to={"/register"}>
                    Não tem uma conta? cadastre-se agora.
                </Link>
            </Form>
            <BgEffect src={dollar} className="sprite3" />
        </Container>
    )
}