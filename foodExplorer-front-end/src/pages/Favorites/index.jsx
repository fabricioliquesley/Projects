import { Container, FavoritesContainer } from "./style";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Menu } from "../../components/Menu";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

export function Favorites() {
    const [statusMenu, setStatusMenu] = useState("close");

    const [width, setWidth] = useState(window.document.defaultView.innerWidth);

    const orderItemsQuantity = JSON.parse(localStorage.getItem("@foodExplorer:orderItems")) ?? 0;

    window.addEventListener("resize", () => {
        setWidth(window.document.defaultView.innerWidth);
    })

    function toggleMenu() {
        if (statusMenu == "open") {
            return setStatusMenu("close");
        }

        return setStatusMenu("open");
    }

    const user = {
        accountType: "common"
    }

    const navigate = useNavigate();

    const [favorites, setFavorites] = useState([]);

    async function fetchFavorites() {
        const { data } = await api.get("/favorites");

        data.forEach(meal => {
            const img_url = `${api.defaults.baseURL}/files/${meal.image_path}`;

            meal.image_path = img_url;
        })

        setFavorites(data);
    }

    function navigateToMealDetail(id) {
        return navigate(`/meal/${id}`);
    }

    async function removeFavorite(id) {
        try {
            return await api.delete(`/favorites/${id}`);

        } catch (error) {
            if (error.response) {
                return alert(error.response.data.message);
            }

            return alert("Não foi possível deletar o favorito");
        }
    }

    useEffect(() => {
        fetchFavorites()
    }, [favorites])

    return (
        <Container $statusMenu={statusMenu}>
            <Header
                menuStatus={statusMenu}
                onClick={toggleMenu}
                variant={user.accountType}
                orderAmount={orderItemsQuantity.length}
            />
            <main>
                {
                    width < 1024 &&
                    <Menu status={statusMenu} variant={user.accountType} />
                }
                <h2 className="poppins-medium">Meus favoritos</h2>
                <FavoritesContainer>
                    {
                        favorites.map((favorite, index) => (
                            <div key={index}
                                onClick={() => navigateToMealDetail(favorite.meal_id)}
                            >
                                <img
                                    src={favorite.image_path}
                                    alt="Imagem ilustrativa do prato"
                                />
                                <div>
                                    <p className="poppins-medium">
                                        {favorite.meal_name}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFavorite(favorite.id)
                                        }}
                                    >
                                        Remover dos Favoritos
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </FavoritesContainer>
            </main>
            <Footer />
        </Container>
    )
}