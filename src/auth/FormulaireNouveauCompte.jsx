import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const FormulaireNouveauCompte = () => {
  const [user, setUser] = useState({});
  const [donnees, setDonnees] = useState({
    nom: "",
    email: "",
    mdp: "",
  });
  const [erreurs, setErreurs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonnees({ ...donnees, [name]: value });
  };

  const valider = (e) => {
    let lesErreurs = {};
    let nom = e.target.nom.value.trim();
    let email = e.target.email.value;
    let mdp = e.target.mdp.value;

    if (nom == "") {
      lesErreurs.nom = "Le nom est obligatoire";
    } else if (nom.length < 2 || nom.length > 20) {
      lesErreurs.nom = "Le nom doit contenir entre 2 et 20 caractères";
    }

    let emailRegex =
      /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;
    if (!emailRegex.test(email)) {
      lesErreurs.email = "Entrez un email valide";
    } else if (email == "") {
      lesErreurs.email = "Entrez un email";
    }

    if (mdp == "") {
      lesErreurs.mdp = "Mot de passe obligatoire";
    } else if (mdp.length < 6) {
      lesErreurs.mdp = "Le mot de passe doit contenir au moins 6 character ";
    }

    setErreurs(lesErreurs);
    return Object.keys(lesErreurs).length === 0;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valider(e)) {
      try {
        const resultat = await createUserWithEmailAndPassword(
          auth,
          donnees.email,
          donnees.mdp
        );
        await updateProfile(resultat.user, {
          displayName: donnees.nom,
        });

        alert("Compte créé avec succès");
        setUser(resultat.user);
        console.log(resultat.user);
        navigate("/");
      } catch (erreur) {
        console.error(erreur);
      }
    }
  };

  return (
    <>
      <h1>Créez un compte</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nom">Nom d'utilisateur</label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={donnees.nom}
            onChange={handleChange}
          />
        </div>
        {erreurs.nom && <span>{erreurs.nom}</span>}

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
        {erreurs.email && <span>{erreurs.email}</span>}

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
        {erreurs.mdp && <span>{erreurs.mdp}</span>}

        <button type="submit">Créer le compte</button>
      </form>
      {user?.displayName && <h2>Bienvenue {user.displayName}</h2>}
    </>
  );
};

export default FormulaireNouveauCompte;
