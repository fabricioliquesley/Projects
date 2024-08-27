import { Container } from "./style";
import { Header } from '../../components/Header';
import { Footer } from "../../components/Footer";
import { Menu } from "../../components/Menu";
import { Banner } from "../../components/Banner";
import { Slider } from "../../components/Slider";

import { useEffect, useState } from "react";
import { useAuth } from "../../hook/auth";
import { api } from "../../services/api";

export function Home() {
    const [statusMenu, setStatusMenu] = useState("close");

    const [width, setWidth] = useState(window.document.defaultView.innerWidth);

    window.addEventListener("resize", () => {
        setWidth(window.document.defaultView.innerWidth);
    })

    const [itemsQuantity, setItemsQuantity] = useState(0)

    function toggleMenu() {
        if (statusMenu == "open") {
            return setStatusMenu("close");
        }

        return setStatusMenu("open");
    }

    function fetchOrderItems() {
        setItemsQuantity(JSON.parse(localStorage.getItem("@foodExplorer:orderItems"))?.length || 0)
    }

    const [search, setSearch] = useState("");
    const [mainCourse, setMainCourse] = useState([]);
    const [dessert, setDessert] = useState([]);
    const [drink, setDrink] = useState([]);

    async function fetchMealData() {
        const response = await api.get(`/meals?search=${search}`);

        // return console.log(response);

        response.data.forEach(meal => {
            const img_url = `${api.defaults.baseURL}/files/${meal.image_path}`;

            meal.image_path = img_url;
        })

        response.data.forEach(meal => {
            if (meal.category == "Prato Principal") {
                setMainCourse(prev => [...prev, meal])
            }

            if (meal.category == "Bebida") {
                setDrink(prev => [...prev, meal])
            }

            if (meal.category == "Sobremesa") {
                setDessert(prev => [...prev, meal])
            }
        })
    }

    const { user } = useAuth();

    useEffect(() => {
        fetchOrderItems();
        fetchMealData();

        setInterval(fetchOrderItems, 5000);
    }, [])

    useEffect(() => {
        if (search != "") {
            setMainCourse([]);
            setDrink([]);
            setDessert([]);

            fetchMealData();
        }
    }, [search])

    return (
        <Container $statusMenu={statusMenu}>
            <Header
                menuStatus={statusMenu}
                orderAmount={itemsQuantity}
                onClick={() => toggleMenu()}
                variant={user.accountType}
                search={(e) => setSearch(e.target.value)}
            />
            <main>
                {
                    width < 1024 &&
                    <Menu 
                        status={statusMenu} 
                        variant={user.accountType}
                        action={(e) => setSearch(e.target.value)}
                    />
                }
                <Banner />
                {
                    mainCourse.length > 0 &&
                    <Slider
                        title={"Pratos principais"}
                        data={mainCourse}
                        variant={user.accountType}
                    />
                }
                {
                    dessert.length > 0 &&
                    <Slider
                        title={"Sobremesas"}
                        data={dessert}
                        variant={user.accountType}
                    />
                }
                {
                    drink.length > 0 &&
                    <Slider
                        title={"Bebidas"}
                        data={drink}
                        variant={user.accountType}
                    />
                }
            </main>
            <Footer />
        </Container>
    );
}