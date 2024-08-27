import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "../pages/signIn";
import { SignUp } from "../pages/signUp";

export function UserRoutes() {
    const user = localStorage.getItem("@rocketnotes:user");

    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            {!user && <Route path="*" element={<Navigate to="/"/>}/>}
        </Routes>
    );
}