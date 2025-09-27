import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ajouterPokemon } from "../store/favSlice";
import { useAuth } from "../context/AuthContext";

const Details = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [chooseMons, setChooseMons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [variant, setVariant] = useState(id);
  const team = useSelector((state) => state.team.liste);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMultipleApis = async () => {
      try {
        const urls = [
          `https://pokeapi.co/api/v2/pokemon/${variant}`,
          `https://pokeapi.co/api/v2/pokemon-species/${id}`,
        ];

        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );

        setChooseMons(responses);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMultipleApis();
  });

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const numberOnly = (url) => {
    const urlToModifiy = url.toString();
    return urlToModifiy.replace(/\D/g, "").slice(1);
  };

  const addToFavorite = (pokemon) => {
    dispatch(ajouterPokemon(pokemon));
  };

  const handlePrevoClick = () => {
    const newId = numberOnly(chooseMons[1].evolves_from_species.url);
    navigate(`/details/${newId}`);
    setVariant(newId);
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <div className="Info">
        <h1>{capitalize(chooseMons[0].name)}</h1>
        <div className="Detail">
          <img src={chooseMons[0].sprites.other.home.front_default} alt="" />
          <div>
            <table>
              <tbody>
                <tr>
                  <td>National №</td>
                  <td>{chooseMons[1].id}</td>
                </tr>
                <tr>
                  <td>Type </td>
                  <td>
                    {capitalize(chooseMons[0].types[0].type.name)}
                    {chooseMons[0].types[1]
                      ? " / " + capitalize(chooseMons[0].types[1].type.name)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{chooseMons[0].weight}g</td>
                </tr>
                <tr>
                  <td>Evolve form of </td>
                  <td>
                    {chooseMons[1].evolves_from_species ? (
                      <button
                        onClick={() => {
                          handlePrevoClick();
                        }}
                      >
                        {capitalize(chooseMons[1].evolves_from_species.name)}
                      </button>
                    ) : (
                      <p>None</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Variant</td>
                  <td>
                    {chooseMons[1].varieties[1] ? (
                      <ul>
                        {chooseMons[1].varieties.map((varietie, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setVariant(numberOnly(varietie.pokemon.url));
                            }}
                          >
                            <button>{capitalize(varietie.pokemon.name)}</button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>None</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Abilities</td>
                  <td>
                    <ul>
                      {chooseMons[0].abilities.map((ability, index) => (
                        <li key={index}>
                          {capitalize(ability.ability.name)}{" "}
                          {ability.is_hidden === false
                            ? ""
                            : "(Hidden Ability)"}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            {currentUser ? (
              team.length != 6 ? (
                <button
                  onClick={() => addToFavorite(chooseMons[0])}
                  className="addBtn"
                >
                  Ajouter a l'équipe
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
        </div>
        <div className="stats">
          <h2>Base stats</h2>
          <table className="statDisplay">
            <tbody>
              {chooseMons[0].stats.map((stat, index) => (
                <tr key={index}>
                  <td>{capitalize(stat.stat.name)}</td>
                  <td>{stat.base_stat}</td>
                  <td>
                    <input
                      type="range"
                      max="256"
                      readOnly
                      value={stat.base_stat}
                      className={
                        stat.base_stat >= 90
                          ? "green"
                          : stat.base_stat > 50
                          ? "yellow"
                          : "red"
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Details;
