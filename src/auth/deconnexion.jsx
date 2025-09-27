import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Deconnexion = () => {
  const navigate = useNavigate();
  const handleDeconnexion = async () => {
    try {
      await signOut(auth);
      console.log("Déconnexion réussie");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };
  return (
    <>
      <button onClick={handleDeconnexion}>Se déconnecter</button>
    </>
  );
};
export default Deconnexion;
