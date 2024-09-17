import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreatePoint } from "./pages/CreatPoint";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastro/",
    element: <CreatePoint />,
  },
  {
    path: "*",
    element: <h1>404</h1>
  }
]);
