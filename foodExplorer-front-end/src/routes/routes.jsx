import { BrowserRouter } from "react-router-dom";

import { useAuth } from "../hook/auth";

import { UserRoutes } from "./user.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            {user ? <AppRoutes /> : <UserRoutes />}
        </BrowserRouter>
    )
}