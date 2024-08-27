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

import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { useAuth } from "../../hook/auth";
import { useEffect, useState } from "react";

import { api } from "../../services/api";

export function EditMeal() {
    const mealOptions = [
        "Prato Principal",
        "Bebida",
        "Sobremesa"
    ]

    const [statusMenu, setStatusMenu] = useState("close");
    const [mealDetail, setMealDetail] = useState({});
    const [isReadyToSend, setIsReadyToSend] = useState(false);

    const [image_file, setImage_file] = useState("");
    const [name, setName] = useState("");
    const [selected, setSelected] = useState(mealOptions[0]);
    const [inputValue, setInputValue] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [selectStatus, setSelectStatus] = useState("close");

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

    function toggleMenu() {
        if (statusMenu == "open") {
            return setStatusMenu("close");
        }

        return setStatusMenu("open");
    }

    function addIngredientTag() {
        if (!inputValue) {
            return
        }

        setIngredients(prevState => [...prevState, { name: inputValue }]);
        setInputValue("");
    }

    function removeIngredientTag(tagToDelete) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient.name !== tagToDelete));
    }

    function handleChangeMealImg(e) {
        const fileImage = e.target.files[0];

        setImage_file(fileImage);
    }

    async function saveMealChanges() {
        try {
            const mealUpdate = {
                name,
                category: selected,
                ingredients: ingredients.map(ingredient => ingredient.name),
                price,
                description,
            }

            await api.put(`/meals/${mealDetail.id}`, mealUpdate);

            if (image_file !== mealDetail.image_path) {
                const fileUploadForm = new FormData();
                fileUploadForm.append("mealImage", image_file);

                await api.patch(`/meals/image/${mealDetail.id}`, fileUploadForm);
            }

            return navigate("/");

        } catch (error) {
            if (error.response) {
                return alert(error.response.data.message);
            }

            return alert("Não foi possível atualizar o prato");
        }
    }

    const navigate = useNavigate();

    async function deleteMeal() {
        try {
            const answer = confirm("Tem certeza que deseja deletar esse prato?");

            if (answer){
                await api.delete(`/meals/${mealDetail.id}`);

                return navigate("/");
            } 

            return;
        } catch {
            alert("Não foi possível deletar o prato");
        }
    }

    const { user } = useAuth();
    const params = useParams();

    async function fetchMeal() {
        const { data: meal } = await api.get(`/meals/${params.id}`);

        setMealDetail(meal);
    }

    useEffect(() => {
        fetchMeal();
    }, [])

    useEffect(() => {
        if (mealDetail && Array.isArray(mealDetail.ingredients)) {
            setImage_file(mealDetail.image_path);
            setName(mealDetail.name);
            setIngredients(mealDetail.ingredients);
            setPrice(mealDetail.price);
            setDescription(mealDetail.description);
            setSelected(mealDetail.category);
        }
    }, [mealDetail])

    useEffect(() => {
        function checkIngredients() {
            const hasDifferences = ingredients.some(ingredient => {
                return !mealDetail.ingredients.some(mealIngredient => mealIngredient.name === ingredient.name);
            });

            let ingredientHasExcluded = false;

            if (mealDetail && Array.isArray(mealDetail.ingredients)) {
                ingredientHasExcluded = ingredients.length != mealDetail.ingredients.length;
            }

            return hasDifferences || ingredientHasExcluded
        }

        const changesInIngredients = checkIngredients();

        if (
            image_file !== mealDetail.image_path ||
            name !== mealDetail.name ||
            selected !== mealDetail.category ||
            price !== mealDetail.price ||
            description !== mealDetail.description ||
            changesInIngredients
        ) {
            return setIsReadyToSend(true);
        }

        return setIsReadyToSend(false);
    }, [image_file, name, selected, ingredients, price, description])

    return (
        <Container $statusMenu={statusMenu}>
            <Header
                menuStatus={statusMenu}
                orderAmount={0}
                onClick={toggleMenu}
                variant={user.accountType}
            />
            <main>
                <Menu status={statusMenu} variant={user.accountType} />
                <Content>
                    <Link to={-1} className="link">
                        <IoIosArrowBack />
                        voltar
                    </Link>
                    <h2 className="title">Editar prato</h2>
                    <FormInput
                        label={"Imagem do prato"}
                        variant={"file"}
                        text={image_file.name || image_file}
                        type={"file"}
                        className={"imageInput"}
                        onChange={e => handleChangeMealImg(e)}
                    />
                    <FormInput
                        label={"Nome"}
                        type={"text"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Ex.: Salada Ceasar"}
                        className={"inputName"}
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
                            ingredients.length > 0 &&
                            ingredients.map((ingredient, index) => (
                                <Tag key={index}>
                                    <p>{ingredient.name}</p>
                                    <button onClick={() => removeIngredientTag(ingredient.name)}>
                                        <IoCloseOutline size={20} />
                                    </button>
                                </Tag>
                            ))
                        }
                    </Tags>
                    <FormInput
                        label={"Preço"}
                        type={"number"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={"R$ 00,00"}
                        className={"inputPreco"}
                    />
                    <TextArea
                        label={"Descrição"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"Fale brevemente sobre o prato, seus ingredientes e composição"}
                        className={"textArea"}
                    />
                    <div className="buttonsContainer">
                        <button 
                            className="deleteMeal"
                            onClick={deleteMeal}
                        >
                            Excluir prato
                        </button>
                        <Button
                            title={"Salvar alterações"}
                            variant={!isReadyToSend}
                            onClick={saveMealChanges}
                            className={"saveButton"}
                        />
                    </div>
                </Content>
            </main>
            <Footer />
        </Container>
    );
}