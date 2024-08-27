import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState("");

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password });

            const { user, token } = response.data;

            localStorage.setItem("@cashGuard:user", JSON.stringify(user));
            localStorage.setItem("@cashGuard:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({ user, token });
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível fazer login");
            }
        }
    }

    async function signOut() {
        localStorage.removeItem("@cashGuard:user");
        localStorage.removeItem("@cashGuard:token");
        localStorage.removeItem("@cashGuard");

        setData({});
    }

    async function updateProfile({ user }) {
        try {
            await api.put("/users", user);

            localStorage.setItem("@cashGuard:user", JSON.stringify(user));

            setData({ user, token: data.token });
            alert("Perfil atualizado!");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível atualizar o perfil!");
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@cashGuard:user");
        const token = localStorage.getItem("@cashGuard:token");

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                user: JSON.parse(user),
                token
            })
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                updateProfile,
                user: data.user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };