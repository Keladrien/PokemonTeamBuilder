import { createContext, useEffect, useState } from "react";

export const RegionContext = createContext();

export function RegionContextProvider({ children }) {
  const [selectedRegion, setSelectedRegion] = useState();

  return (
    <RegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
    </RegionContext.Provider>
  );
}
