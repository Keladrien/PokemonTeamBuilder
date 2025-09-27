import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const FormulaireAuthentification = () => {
  const navigate = useNavigate();
  const [donnees, setDonnees] = useState({ email: "", mdp: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonnees({ ...donnees, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultat = await signInWithEmailAndPassword(
        auth,
        donnees.email,
        donnees.mdp
      );
      navigate("/");
      console.log(resultat);
    } catch (erreur) {
      window.alert("Mot de passe ou courielle invalide");
    }
  };
  return (
    <>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={donnees.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mdp">Mot de passe</label>
          <input
            type="password"
            name="mdp"
            id="mdp"
            value={donnees.mdp}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </>
  );
};
export default FormulaireAuthentification;
