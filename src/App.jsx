import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home/Home";
import Country from "./components/Country/Country";
import NavBar from "./components/NavBar/NavBar";
import CountryName from "./nameContext";
import RegionContext from "./RegionContext";

import "./components/Container/Container.scss";

const App = () => {
  const [country, setCountry] = useState([]);
  const [region, setRegion] = useState([]);

  return (
    <CountryName.Provider value={{ country, setCountry }}>
      <RegionContext.Provider value={{ region, setRegion }}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />}></Route>
            <Route path="country" element={<Country />}></Route>
          </Route>
        </Routes>
      </RegionContext.Provider>
    </CountryName.Provider>
  );
};

export default App;
