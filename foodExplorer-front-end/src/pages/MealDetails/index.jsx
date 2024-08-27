import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { Container, Content, Tags, Left, Right } from "./style";
import { IoIosArrowBack } from "react-icons/io";
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";
import { PiReceipt } from "react-icons/pi";

import { ACCOUNT_TYPE } from "../../utils/accountType";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../hook/auth";

import { api } from "../../services/api";

export function MealDetails() {
    const [statusMenu, setStatusMenu] = useState("close");
    const [width, setWidth] = useState(window.document.defaultView.innerWidth);
    const [meal, setMeal] = useState(null);
    const [mealQuantity, setMealQuantity] = useState("0");

    window.addEventListener("resize", () => {
        setWidth(window.document.defaultView.innerWidth);
    })

    function toggleMenu() {
        if (statusMenu == "open") {
            return setStatusMenu("close");
        }

        return setStatusMenu("open");
    }

    const [orderItems, setOrderItems] = useState(JSON.parse(localStorage.getItem("@foodExplorer:orderItems")) ?? []);

    function fetchForOrderItem(name) {
        if (!orderItems) return [false, null];

        let result = false;
        let index;

        orderItems.map((orderItem, i) => {
            if (orderItem.name == name) {
                result = true;
                index = i;
            }
        })

        if (result) return [true, index];

        return [false, null];
    }

    function incrementItemAmount() {
        const mealImgPath = document.querySelector(".mealImg").src;
        const mealAmount = document.querySelector(".amount");

        const [thereIsThisItemInTheOrder, index] = fetchForOrderItem(meal.name);

        if (!thereIsThisItemInTheOrder) {
            mealAmount.textContent++;

            setOrderItems(prev => [...prev, {
                name: meal.name,
                img: mealImgPath,
                price: meal.price,
                amount: Number(mealAmount.textContent),
            }])

            return;
        }

        mealAmount.textContent++;
        orderItems[index].amount = Number(mealAmount.textContent);

        return;
    }

    function decreaseItemQuantity() {
        const mealAmount = document.querySelector(".amount");

        const [thereIsThisItemInTheOrder, index] = fetchForOrderItem(meal.name);

        if (!thereIsThisItemInTheOrder) {
            return
        }

        if (orderItems[index].amount > 0) {
            mealAmount.textContent--;
            orderItems[index].amount = Number(mealAmount.textContent);

            if (orderItems[index].amount == 0) {
                setOrderItems(orderItems.filter(orderItem => orderItem.name != meal.name));
            }
        }
    }

    function addItemToOrder() {
        return localStorage.setItem("@foodExplorer:orderItems", JSON.stringify(orderItems));
    }

    const { user } = useAuth();

    const params = useParams();

    async function fetchMeal() {
        const { data: meal } = await api.get(`/meals/${params.id}`);

        meal.image_path = `${api.defaults.baseURL}/files/${meal.image_path}`;

        setMeal(meal);
    }

    useEffect(() => {
        fetchMeal();
    }, [])

    useEffect(() => {
        if (meal == null) return;

        const [current] = orderItems.filter((p) => p.name == meal.name);

        if (!current) return;

        setMealQuantity(current.amount)
    }, [meal])

    return (
        <Container $statusMenu={statusMenu}>
            <Header
                menuStatus={statusMenu}
                orderAmount={orderItems.length}
                onClick={() => toggleMenu()}
                variant={user.accountType}
            />
            <main>
                {
                    width < 1024 &&
                    <Menu
                        status={statusMenu}
                        variant={user.accountType}
                    />
                }
                <Content>
                    <Left>
                        <Link to={-1} className="poppins-medium">
                            <IoIosArrowBack />
                            voltar
                        </Link>
                        {
                            meal &&
                            <img
                                className="mealImg"
                                src={meal.image_path}
                                alt="Imagem ilustrativa do prato"
                            />
                        }
                    </Left>
                    {
                        meal &&
                        <Right>
                            <div className="mealDetails">
                                <h3 className="poppins-medium">{meal.name}</h3>
                                <p className="poppins-light">
                                    {meal.description}
                                </p>
                                <div className="ingredientsContainer">
                                    {
                                        meal.ingredients.map((ingredient, index) => (
                                            <Tags key={index}>{ingredient.name}</Tags>
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                [ACCOUNT_TYPE.ADMIN].includes(user.accountType) ?
                                    <Link
                                        to={`/edit/${meal.id}`}
                                        className="editBtn"
                                    >
                                        Editar prato
                                    </Link>
                                    :
                                    <div className="amountControls">
                                        <div>
                                            <button
                                                onClick={() => decreaseItemQuantity()}
                                            >
                                                <HiMiniMinus size={20} />
                                            </button>
                                            <span className='roboto-regular amount'>
                                                {mealQuantity}
                                            </span>
                                            <button
                                                onClick={() => incrementItemAmount()}
                                            >
                                                <HiMiniPlus size={20} />
                                            </button>
                                        </div>
                                        <button onClick={addItemToOrder}>
                                            <PiReceipt size={20} />
                                            pedir ∙
                                            R$ {String(meal.price).replace(".", ",")}
                                        </button>
                                    </div>
                            }
                        </Right>
                    }
                </Content>
            </main>
            <Footer />
        </Container>
    )
}