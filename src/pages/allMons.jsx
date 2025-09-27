import React, { useState, useEffect, useContext } from "react";
import { RegionContext } from "../context/regionContext";
import Region from "../composant/region";

const AllMons = () => {
  const [regions, setRegions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { selectedRegion, setSelectedRegion } = useContext(RegionContext);
  const [regionName, setRegionName] = useState("Selectioné une region");

  useEffect(() => {
    const fetchMultipleApis = async () => {
      try {
        const urls = [
          `https://pokeapi.co/api/v2/region/1/`,
          `https://pokeapi.co/api/v2/region/2/`,
          `https://pokeapi.co/api/v2/region/3/`,
          `https://pokeapi.co/api/v2/region/4/`,
          `https://pokeapi.co/api/v2/region/5/`,
          `https://pokeapi.co/api/v2/region/6/`,
          `https://pokeapi.co/api/v2/region/7/`,
          `https://pokeapi.co/api/v2/region/8/`,
          `https://pokeapi.co/api/v2/region/9/`,
          `https://pokeapi.co/api/v2/region/10/`,
        ];

        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );

        setRegions(responses);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMultipleApis();
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  const handleClick = (index, name) => {
    setSelectedRegion(index);
    setRegionName(capitalize(name));
  };

  return (
    <>
      {<h1 className="region">{regionName}</h1>}
      <div className="regionSelectorDiv">
        {regions.map((regions, index) => (
          <button
            key={regions.name}
            className="regionSelector"
            onClick={() => handleClick(index, regions.name)}
          >
            {capitalize(regions.name)}
          </button>
        ))}
      </div>
      <Region />
    </>
  );
};
export default AllMons;
