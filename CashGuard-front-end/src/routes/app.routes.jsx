import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Transactions } from "../pages/Transactions";
import { Create } from "../pages/Create";
import { UpdateProfile } from "../pages/UpdateProfile";
import { Details } from "../pages/Details";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="/details" element={<Details />} />
        </Routes>
    )
}