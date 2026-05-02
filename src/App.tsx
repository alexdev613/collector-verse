import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";

import Home from "./pages/home";
import CharactersDashboard from "./pages/dashboard/characters";
import CharacterPage from "./pages/characters";
import NewCharacterPage from "./pages/characters/new";
import EditCharacterPage from "./pages/characters/edit";

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
        path: "/characters/new",
        element: <NewCharacterPage />
      },
      {
        path: "/characters/:id",
        element: <CharacterPage />
      },
      {
        path: "/figures/:id",
        element: <FigurePage />
      },
      {
        path: "/characters/:id/edit",
        element: <EditCharacterPage />
      }
    ]
  }
])

export { router }
