import { Link } from "react-router-dom";
import { Container, Header, Content, List, Option } from "./style";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { DropDown } from "../../components/DropDown";
import { Button } from "../../components/Button";

import { FiArrowLeft, FiTrash } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { TbCurrencyReal } from "react-icons/tb";

import { IoHome, IoWineSharp, IoAirplaneSharp, IoStorefrontOutline, IoFastFoodOutline, IoBarChartOutline, IoEllipsisHorizontalSharp, IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";
import { GiReceiveMoney, GiPresent, GiPartyPopper } from "react-icons/gi";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export function Details() {
    const location = useLocation();

    const urlSearchParams = new URLSearchParams(location.search);

    const { type, id } = [...urlSearchParams].reduce((params, [key, value]) => {
        params[key] = value;
        return params;
    }, {});

    const [transactionData, setTransactionData] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [date, setDate] = useState("");

    const [statusEditorMode, setStatusEditorMode] = useState("off");

    function selectedValueCategory(selected) {
        setSelectedCategory(selected);
    }

    function selectedValueStatus(selected) {
        setSelectedStatus(selected);
    }

    const navigate = useNavigate();

    async function deleteTransaction() {
        const confirm = window.confirm("Tem certeza que quer deletar essa transação?");

        if (confirm) {
            await api.delete(`/transactions/${type}/${id}`)
                .then(() => {
                    alert("Transação deletada!");
                    navigate(-1);
                })
                .catch((erro) => {
                    if (erro.response){
                        console.error(erro.response.data.message);
                    } else {
                        alert("Não foi possível excluir a nota!");
                    }
                })
        }
    }

    function changeEditorMode() {
        if (statusEditorMode == "on") {
            setStatusEditorMode("off");
            return alert("editor mode off");
        }

        setStatusEditorMode("on");
        return alert("editor mode on");
    }

    function checkObjects(object1, object2) {
        const object1Keys = Object.keys(object1);

        for (let key of object1Keys) {
            if (object1[key] !== object2[key]) {
                return true;
            }
        }

        return false;
    }

    async function updateTransaction() {
        const updated_transaction = {
            transaction_id: id,
            type,
            title,
            description,
            value,
            date,
            category: selectedCategory,
            status: selectedStatus
        }

        const thereIsDifference = checkObjects(transactionData, updated_transaction);

        if (thereIsDifference) {
            if (title === "" || description === "" || value === "" || date === "") {
                return alert("Preencha todos os campos!");
            }
            
            await api.put("/transactions", updated_transaction);
            setStatusEditorMode("off");
        }
    }

    useEffect(() => {
        async function fetchTransaction() {
            const response = await api.get(`/transactions/${type}/${id}`);

            setTransactionData(response.data);
        }

        fetchTransaction();
    }, [statusEditorMode])

    useEffect(() => {
        setSelectedCategory(transactionData.category);
        setSelectedStatus(transactionData.status);
        setTitle(transactionData.title);
        setDescription(transactionData.description);
        setValue(transactionData.value);
        setDate(transactionData.date);
    }, [transactionData, statusEditorMode])

    return (
        <Container>
            <Header>
                <Link to={-1}>
                    <FiArrowLeft />
                    <p>Voltar</p>
                </Link>
                <div>
                    <button
                        onClick={deleteTransaction}
                    >
                        <FiTrash />
                    </button>
                    <button
                        onClick={changeEditorMode}
                    >
                        <FaPencilAlt />
                    </button>
                </div>
            </Header>
            <Content>
                <Input
                    icon={MdOutlineTitle}
                    placeholder={"Título"}
                    editable={statusEditorMode == "on" ? false : true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextArea
                    placeholder={"Descrição"}
                    editable={statusEditorMode == "on" ? false : true}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <DropDown
                    selected={selectedCategory}
                    editable={statusEditorMode == "on" ? false : true}
                >
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
                <Input
                    icon={TbCurrencyReal}
                    placeholder={"Valor"}
                    type="number"
                    editable={statusEditorMode == "on" ? false : true}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Input
                    placeholder={"Data"}
                    type="date"
                    editable={statusEditorMode == "on" ? false : true}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <DropDown
                    selected={selectedStatus}
                    editable={statusEditorMode == "on" ? false : true}
                >
                    {
                        type == "expenses" ?
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
                {
                    statusEditorMode == "on"
                        ?
                        <Button
                            title={"Salvar"}
                            type={"button"}
                            onClick={updateTransaction}
                        />
                        : <></>
                }

            </Content>
        </Container>
    );
}