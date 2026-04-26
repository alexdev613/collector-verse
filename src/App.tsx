import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";

import Home from "./pages/home";
import CharactersDashboard from "./pages/dashboard/characters";
import CharacterPage from "./pages/characters";

import FigurePage from "./pages/figures";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/dashboard/characters",
        element: <CharactersDashboard />,
      },
      {
        path: "/characters/:id",
        element: <CharacterPage />
      },
      {
        path: "/figures/:id",
        element: <FigurePage />
      }
    ]
  }
])

export { router }
