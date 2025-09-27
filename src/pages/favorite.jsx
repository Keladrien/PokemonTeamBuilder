import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { modifierNomEquipe, supprimerPokemon } from "../store/favSlice";

const Favorite = () => {
  const team = useSelector((state) => state.team.liste);
  const teamName = useSelector((state) => state.team.nomEquipe);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handleNameClick = () => {
    let teamNamePrompt = prompt("Entrez le nouveau nom de l'équipe");
    dispatch(modifierNomEquipe(teamNamePrompt));
  };

  const removeTeam = (index) => {
    dispatch(supprimerPokemon(index));
  };

  if (team.length == 0) {
    return (
      <>
        <h1>Votre équipe est vide</h1>
      </>
    );
  }
  return (
    <>
      <h1 onClick={() => handleNameClick()}>{teamName}</h1>
      <div className="homeCardDisplay">
        {team.map((pokemon, index) => (
          <div key={index} className="homeCard">
            <div id={index} onClick={() => handleClick(pokemon.id)}>
              <h2>{capitalize(pokemon.name)}</h2>
              <p>
                Type : {capitalize(pokemon.types[0].type.name)}
                {pokemon.types[1]
                  ? " / " + capitalize(pokemon.types[1].type.name)
                  : ""}
              </p>
              <img
                src={pokemon.sprites.other.home.front_default}
                alt="Random Pokemon"
              />
            </div>
            <button onClick={() => removeTeam(index)} className="deleteBtn">
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default Favorite;
