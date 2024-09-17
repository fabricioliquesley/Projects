import { createBrowserRouter } from "react-router-dom";
import { Landig } from "./pages/Landing";
import { TeacherList } from "./pages/TeacherList";
import { TeacherForm } from "./pages/TeacherForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landig />,
  },
  {
    path: "/study",
    element: <TeacherList />,
  },
  {
    path: "/give-classes",
    element: <TeacherForm />,
  },
  {
    path: "*",
    element: (
      <div className="contianer" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <h2>Página não encontrada</h2>
      </div>
    ),
  },
]);
