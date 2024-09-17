import { RouterProvider } from "react-router-dom";
import "./assets/styles/globals.css";
import { router } from "./router";

export const App = () => {
  return <RouterProvider router={router} />;
};
