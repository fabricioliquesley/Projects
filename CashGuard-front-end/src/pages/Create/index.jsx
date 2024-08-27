import { Container, Header, Content, Form, List, Option } from "./style";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { DropDown } from "../../components/DropDown";

import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineTitle } from "react-icons/md";
import { TbCurrencyReal } from "react-icons/tb";

import { IoTrendingUpOutline, IoTrendingDownOutline, IoHome, IoWineSharp, IoAirplaneSharp, IoStorefrontOutline, IoFastFoodOutline, IoBarChartOutline, IoEllipsisHorizontalSharp, IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";
import { GiReceiveMoney, GiPresent, GiPartyPopper } from "react-icons/gi";

import { useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Create() {
    const [selectedType, setSelectedType] = useState("Despesa");
    const [selectedCategory, setSelectedCategory] = useState("Casa");
    const [selectedStatus, setSelectedStatus] = useState("Não pago");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [date, setDate] = useState("");

    function selectedValueType(selected) {
        setSelectedType(selected);
    }

    function selectedValueCategory(selected) {
        setSelectedCategory(selected);
    }

    function selectedValueStatus(selected) {
        setSelectedStatus(selected);
    }

    const navigate = useNavigate();

    async function createTransaction() {
        if (!title || !description || !value || !date) {
            return alert("Preencha todos os campos para criar uma nova transação!");
        }

        await api.post("/transactions", {
            type: selectedType == "Despesa" ? "expenses" : "incomes",
            title,
            description,
            value,
            date,
            category: selectedCategory,
            status: selectedStatus
        })
            .then(() => {
                alert("Transação criada com sucesso!");
                navigate(-1);
            })
            .catch((erro) => {
                if (erro.response) {
                    console.error(erro.response.data.message);
                } else {
                    alert("Não foi possível criar a transação");
                }
            })
    }

    return (
        <Container>
            <Header to={-1}>
                <FiArrowLeft />
                <h3>Voltar</h3>
            </Header>
            <Content>
                <Form>
                    <label htmlFor="type">Tipo de transação</label>
                    <DropDown selected={selectedType} id={"type"}>
                        <List>
                            <Option
                                data-value={"Despesa"}
                                onClick={(e) => selectedValueType(e.target.dataset.value)}
                            >
                                <IoTrendingDownOutline />
                                Despesa
                            </Option>
                            <Option
                                data-value={"Receita"}
                                onClick={(e) => selectedValueType(e.target.dataset.value)}
                            >
                                <IoTrendingUpOutline />
                                Receita
                            </Option>
                        </List>
                    </DropDown>
                    <label htmlFor="title">Título</label>
                    <Input
                        icon={MdOutlineTitle}
                        placeholder={"Título"}
                        id={"title"}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="description">Descrição</label>
                    <TextArea
                        placeholder={"Descrição"}
                        id={"description"}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="category">Categoria</label>
                    <DropDown selected={selectedCategory} id={"category"}>
                        <List>
                            <Option
                                data-value={"Casa"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <IoHome />
                                Casa
                            </Option>
                            <Option
                                data-value={"Bar"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <IoWineSharp />
                                Bar
                            </Option>
                            <Option
                                data-value={"Viagem"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <IoAirplaneSharp />
                                Viagem
                            </Option>
                            <Option
                                data-value={"Compras"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <IoStorefrontOutline />
                                Compras
                            </Option>
                            <Option
                                data-value={"Alimentação"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <IoFastFoodOutline />
                                Alimentação
                            </Option>
                            <Option
                                data-value={"Diversao"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <GiPartyPopper />
                                Diversão
                            </Option>
                            <Option
                                data-value={"Investimentos"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <IoBarChartOutline />
                                Investimentos
                            </Option>
                            <Option
                                data-value={"Salario"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <GiReceiveMoney />
                                Salário
                            </Option>
                            <Option
                                data-value={"Presente"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <GiPresent />
                                Presente
                            </Option>
                            <Option
                                data-value={"Outros"}
                                onClick={(e) => selectedValueCategory(e.target.dataset.value)}
                            >
                                <IoEllipsisHorizontalSharp />
                                Outros
                            </Option>
                        </List>
                    </DropDown>
                    <label htmlFor="value">Valor</label>
                    <Input
                        icon={TbCurrencyReal}
                        placeholder={"Valor"}
                        type={"number"}
                        id={"value"}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <label htmlFor="date">Data</label>
                    <Input
                        type={"date"}
                        id={"date"}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <label htmlFor="status">Status</label>
                    <DropDown selected={selectedStatus} id={"status"}>
                        {
                            selectedType == "Despesa" ?
                                <List>
                                    <Option
                                        data-value={"Não pago"}
                                        onClick={(e) => selectedValueStatus(e.target.dataset.value)}
                                    >
                                        <IoCloseOutline />
                                        Não pago
                                    </Option>
                                    <Option
                                        data-value={"Pago"}
                                        onClick={(e) => selectedValueStatus(e.target.dataset.value)}
                                    >
                                        <IoCheckmarkSharp />
                                        Pago
                                    </Option>
                                </List>
                                :
                                <List>
                                    <Option
                                        data-value={"Não recebido"}
                                        onClick={(e) => selectedValueStatus(e.target.dataset.value)}
                                    >
                                        <IoCloseOutline />
                                        Não recebido
                                    </Option>
                                    <Option
                                        data-value={"Recebido"}
                                        onClick={(e) => selectedValueStatus(e.target.dataset.value)}
                                    >
                                        <IoCheckmarkSharp />
                                        Recebido
                                    </Option>
                                </List>
                        }
                    </DropDown>
                </Form>
                <Button title={"Criar"} onClick={createTransaction} />
            </Content>
        </Container>
    )
}