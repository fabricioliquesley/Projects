import { Container, Content, Options } from "./style";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { FormInput } from "../../components/FormInput";
import { TextArea } from "../../components/TextArea";
import { Select } from "../../components/Select";
import { Tags } from "../../components/Tags";
import { Tag } from "../../components/Tag";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../hook/auth";

import { api } from "../../services/api";

export function CreateMeal() {
    const mealOptions = [
        "Prato Principal",
        "Bebida",
        "Sobremesa"
    ]

    const [statusMenu, setStatusMenu] = useState("close");
    const [isReadyToSend, setIsReadyToSend] = useState(false);

    const [imageFile, setImageFile] = useState({});

    const [name, setName] = useState("");
    const [selected, setSelected] = useState(mealOptions[0]);
    const [inputValue, setInputValue] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [selectStatus, setSelectStatus] = useState("close");

    const navigate = useNavigate();

    function toggleMenu() {
        if (statusMenu == "open") {
            return setStatusMenu("close");
        }

        return setStatusMenu("open");
    }

    function toggleSelectStatus(target) {
        let container;

        if (target.tagName == "LI") {
            container = target.parentNode.parentNode;
        } else {
            container = target.parentNode;
        }

        const options = container.querySelector("ul");

        if (selectStatus == "open") {
            options.style.display = "none";
            return setSelectStatus("close");
        }

        options.style.display = "flex";

        return setSelectStatus("open");
    }

    function addIngredientTag() {
        if (!inputValue) {
            return
        }

        setIngredients(prevState => [...prevState, inputValue]);
        setInputValue("");
    }

    function removeIngredientTag(tagToDelete) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== tagToDelete));
    }

    function handleChangeMealImg(event) {
        const fileImage = event.target.files[0];

        setImageFile(fileImage);
    }

    async function saveMeal() {
        try {
            const meal = {
                name,
                category: selected,
                ingredients,
                price,
                description
            }

            const { data: meal_id } = await api.post("/meals", meal);

            const fileUploadForm = new FormData();
            fileUploadForm.append("mealImage", imageFile);

            await api.patch(`/meals/image/${meal_id}`, fileUploadForm);

            return navigate("/");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível criar um novo prato")
            }
        }
    }

    const { user } = useAuth();

    useEffect(() => {
        if (!name 
            || inputValue 
            || !price 
            || !description 
            || ingredients.length == 0 
            || imageFile.name == undefined
        ) {
            return setIsReadyToSend(false);
        }

        return setIsReadyToSend(true);
    }, [name, inputValue, ingredients, price, description, imageFile])

    return (
        <Container $statusMenu={statusMenu}>
            <Header
                menuStatus={statusMenu}
                onClick={toggleMenu}
                variant={user.accountType}
            />
            <main>
                <Menu status={statusMenu} variant={user.accountType}/>
                <Content>
                    <Link to={-1} className="link">
                        <IoIosArrowBack />
                        voltar
                    </Link>
                    <h2 className="title">Novo prato</h2>
                    <FormInput
                        label={"Imagem do prato"}
                        variant={"file"}
                        type={"file"}
                        text={imageFile.name}
                        className={"imageInput"}
                        onChange={handleChangeMealImg}
                    />
                    <FormInput
                        label={"Nome"}
                        type={"text"}
                        placeholder={"Ex.: Salada Ceasar"}
                        className={"inputName"}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Select
                        label={"Categoria"}
                        className={"inputCategory"}
                        selectStatus={selectStatus}
                    >
                        <div
                            className="select"
                            onClick={e => toggleSelectStatus(e.currentTarget)}
                        >
                            <p>{selected}</p>
                            <IoIosArrowDown size={24} />
                        </div>
                        <Options>
                            {
                                mealOptions.map((mealOption, index) => (
                                    <li
                                        key={index}
                                        data-value={mealOption}
                                        onClick={(e) => {
                                            setSelected(e.target.dataset.value);
                                            toggleSelectStatus(e.target);
                                        }}
                                    >
                                        {mealOption}
                                    </li>
                                ))
                            }
                        </Options>
                    </Select>
                    <Tags
                        label={"Ingredientes"}
                        addClick={addIngredientTag}
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        className={"ingredientsTag"}
                    >
                        {
                            ingredients.map((tag, index) => (
                                <Tag key={index}>
                                    <p>{tag}</p>
                                    <button onClick={() => removeIngredientTag(tag)}>
                                        <IoCloseOutline size={20} />
                                    </button>
                                </Tag>
                            ))
                        }
                    </Tags>
                    <FormInput
                        label={"Preço"}
                        type={"number"}
                        placeholder={"R$ 00,00"}
                        className={"inputPreco"}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextArea
                        label={"Descrição"}
                        placeholder={"Fale brevemente sobre o prato, seus ingredientes e composição"}
                        className={"textArea"}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        title={"Salvar alterações"}
                        variant={!isReadyToSend}
                        onClick={saveMeal}
                        className={"saveButton"}
                    />
                </Content>
            </main>
            <Footer />
        </Container>
    );
}