import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import RegionContext from "../../RegionContext";
import "../Container/Container.scss";

const Home = () => {
  const { region, setRegion } = useContext(RegionContext);
  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState(countries);
  const [searchField, setSearchField] = useState("");

  const f = new Intl.NumberFormat("en-us");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((Data) => {
        setCountries(Data);
      });
  }, []);

  useEffect(() => {
    const newFilteredCountry = countries.filter((country) => {
      return country.name.common.toLocaleLowerCase().includes(searchField);
    });

    setFilteredCountry(newFilteredCountry);
  }, [countries, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  //REGION SELECTION
  useEffect(() => {
    if (region) {
      setCountries(region);
    }
  }, [region]);

  return (
    <div className="Home">
      <div className="sub_header">
        <Search changeHandler={onSearchChange} />
        <Filter />
      </div>
      <div className="cardsContainer">
        {filteredCountry.map((count) => {
          return (
            <div
              className="card"
              onClick={() => {
                console.log(count);
                localStorage.setItem("items", JSON.stringify(count));
              }}
            >
              <Link to="/country">
                <img src={count.flags.png} alt="" className="flag" />
                <div className="country-desc">
                  <div className="country_name">{count.name.common}</div>
                  <div className="population">
                    Population: <span>{f.format(count.population)}</span>
                  </div>
                  <div className="region">
                    Region: <span>{count.region}</span>
                  </div>
                  <div className="capital">
                    Capital: <span>{count.capital}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
