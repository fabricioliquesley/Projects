import axios from "axios";

export const api = axios.create({
    baseURL: "https://foodexplorer-api-gz0c.onrender.com",
    // baseURL: "http://localhost:3333"
})