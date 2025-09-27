import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [randomMons, setRandomMons] = useState([]);
  const { currentUser } = useAuth();

  const randomNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    const fetchMultipleApis = async () => {
      try {
        const urls = [
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
          `https://pokeapi.co/api/v2/pokemon/${randomNum(1025)}`,
        ];

        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );

        setRandomMons(responses);
      } catch (err) {
        setError(err);
      }
    };

    fetchMultipleApis();
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      <h1>Pokémon Planificateur d'équipe</h1>
      {currentUser ? (
        <p>Cliquez sur une carte pour commencer.</p>
      ) : (
        <p>
          Bienvenue sur Pokemon Team Builder, ici vous trouverez les
          informations pertinentes pour faire votre équipe. Une fois connecté
          vous pourrez sélectionnez les Pokémons de vous souhaiter utiliser.
        </p>
      )}

      <div className="homeCardDisplay">
        {randomMons.map((randomMon, index) => (
          <div
            key={index}
            className="homeCard"
            onClick={() => handleClick(randomMon.id)}
          >
            <h2>{capitalize(randomMon.name)}</h2>
            <p>Pokedex Number : {randomMon.id}</p>
            <p>
              Type : {capitalize(randomMon.types[0].type.name)}
              {randomMon.types[1]
                ? " / " + capitalize(randomMon.types[1].type.name)
                : ""}
            </p>

            <img
              src={randomMon.sprites.other.home.front_default}
              alt="Random Pokemon"
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
