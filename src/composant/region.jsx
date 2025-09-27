import React, { useState, useEffect, useContext } from "react";
import { RegionContext } from "../context/regionContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ajouterPokemon } from "../store/favSlice";
import { useAuth } from "../context/AuthContext";

function Region() {
  const { selectedRegion, setSelectedRegion } = useContext(RegionContext);
  const [selectedRegionRange, setSelectedRegionRange] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const { currentUser } = useAuth();
  const team = useSelector((state) => state.team.liste);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const regionRange = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
  };

  useEffect(() => {
    if (selectedRegion === 0) setSelectedRegionRange(regionRange(1, 151));
    else if (selectedRegion === 1)
      setSelectedRegionRange(regionRange(152, 251));
    else if (selectedRegion === 2)
      setSelectedRegionRange(regionRange(252, 386));
    else if (selectedRegion === 3)
      setSelectedRegionRange(regionRange(387, 493));
    else if (selectedRegion === 4)
      setSelectedRegionRange(regionRange(494, 649));
    else if (selectedRegion === 5)
      setSelectedRegionRange(regionRange(650, 721));
    else if (selectedRegion === 6)
      setSelectedRegionRange(regionRange(722, 809));
    else if (selectedRegion === 7)
      setSelectedRegionRange(regionRange(810, 898));
    else if (selectedRegion === 8)
      setSelectedRegionRange(regionRange(899, 905));
    else if (selectedRegion === 9)
      setSelectedRegionRange(regionRange(906, 1025));
  }, [selectedRegion]);

  useEffect(() => {
    const fetchMultipleApis = async () => {
      try {
        const urls = selectedRegionRange.map(
          (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );

        setPokemons(responses);
        setSelectedRegion([]);
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedRegionRange.length > 0) {
      fetchMultipleApis();
    }
  }, [selectedRegionRange]);

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const addToFavorite = (pokemon) => {
    dispatch(ajouterPokemon(pokemon));
  };

  return (
    <>
      <div className="homeCardDisplay">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="homeCard">
            <div id={index} onClick={() => handleClick(pokemon.id)}>
              <h2>{capitalize(pokemon.name)}</h2>
              <p>Pokedex Number : {pokemon.id}</p>
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
            {currentUser ? (
              team.length != 6 ? (
                <button
                  onClick={() => addToFavorite(pokemon)}
                  className="addBtn"
                >
                  Ajouter à l'équipe
                </button>
              ) : (
                <button className="deleteBtn" disabled>
                  Equipe Pleine
                </button>
              )
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Region;
