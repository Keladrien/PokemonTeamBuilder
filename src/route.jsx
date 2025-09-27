import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import AllMons from "./pages/allMons";
import FormulaireAuthentification from "./auth/FormulaireAuthentification";
import FormulaireNouveauCompte from "./auth/FormulaireNouveauCompte";
import NotFound from "./pages/notFound";
import App from "./App";
import Details from "./pages/details";
import Favorite from "./pages/favorite";

const roads = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pokemons",
        element: <AllMons />,
      },
      {
        path: "/connexion",
        element: <FormulaireAuthentification />,
      },
      {
        path: "/newAccount",
        element: <FormulaireNouveauCompte />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
    ],
  },
]);

export default roads;
