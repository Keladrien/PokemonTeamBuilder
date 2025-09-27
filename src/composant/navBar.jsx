import { Link } from "react-router-dom";
import Deconnexion from "../auth/deconnexion";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { currentUser } = useAuth();
  const team = useSelector((state) => state.team.liste);

  return (
    <nav className="navigation">
      <div>
        {currentUser ? (
          <>
            <Link to={"/"}>Accueil</Link>
            <Link to={"/pokemons"}>Liste des Pokemons</Link>
            <Link to={"/favorite"}>
              Mon Équipe{" "}
              {team.length === 0 ? (
                ""
              ) : team.length === 6 ? (
                <span className="teamFull">{team.length}</span>
              ) : (
                <span className="numberInTeam">{team.length}</span>
              )}
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"}>Accueil</Link>
            <Link to={"/pokemons"}>Liste des Pokemons</Link>
          </>
        )}
      </div>

      <div>
        {currentUser ? (
          <>
            <span>Bonjour, {currentUser.displayName || "Utilisateur"}</span>
            <Deconnexion />
          </>
        ) : (
          <>
            <Link to={"/connexion"}>Se connecter</Link>
            <Link to={"/newAccount"}>Créer un compte</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
