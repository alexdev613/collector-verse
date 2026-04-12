import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";

import Home from "./pages/home";
import FiguresDashboard from "./pages/dashboard/figures";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/dashboard/figures",
        element: <FiguresDashboard />,
      },
      {
        path: "/characters/:id",
        element: <div className="text-white p-6">Character Page (mock)</div>
      }
    ]
  }
])

export { router }
