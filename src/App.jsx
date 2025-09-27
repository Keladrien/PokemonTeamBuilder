import "./App.css";
import NavBar from "./composant/navBar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RegionContextProvider } from "./context/regionContext";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <main>
          <RegionContextProvider>
            <Outlet />
          </RegionContextProvider>
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
