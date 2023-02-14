import { Outlet, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import CountryName from "../../nameContext";
import { RiArrowLeftFill } from "react-icons/ri";
import "./Country.scss";

const Country = () => {
  const { country, setCountry } = useContext(CountryName);
  const [countryBorder, setCountryBorder] = useState([]);
  const [caruncies, setCaruncies] = useState("");
  const [allData, setAllData] = useState([]);
  const [symbol, setSymbol] = useState("");

  const countryData = JSON.parse(localStorage.getItem("items"));

  useEffect(() => {
    const countNme = JSON.parse(localStorage.getItem("items"));
    setCountry(countNme.name.common);
  }, [country]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((Data) => {
        setAllData(Data);
      });
  }, [allData]);

  // INITAIL VALUES
  const f = new Intl.NumberFormat("en-us");
  const flag = countryData.flags.png;
  const name = countryData.name.common;
  const population = f.format(countryData.population);
  const region = countryData.region;
  const subregion = countryData.subregion;
  const capital = countryData.capital;
  const countryCode =
    countryData.idd.root.toString() + countryData.idd.suffixes.toString();
  console.log(countryCode);
  const code =
    countryCode.length > 7
      ? countryData.idd.root.toString() + countryData.idd.suffixes[1].toString()
      : countryCode;
  const languages = Object.values(countryData.languages)
    .toString()
    .split(",")
    .join(",");
  const topLevelDomain = countryData.tld[0];

  // ==================  ======================

  useEffect(() => {
    const borders = countryData.borders;
    setCountryBorder(borders);
  }, [countryBorder]);

  useEffect(() => {
    const curr =
      countryData.currencies[Object.keys(countryData.currencies)].name;
    if (curr != undefined) {
      setCaruncies(curr);
    }
    
  }, [caruncies]);

  useEffect(() => {
    const carrunciesSymbol =
      countryData.currencies[Object.keys(countryData.currencies)].symbol;
    carrunciesSymbol ? setSymbol(carrunciesSymbol) : false;
  }, [symbol]);

  return (
    <div className="singleCountry">
      <div className="countryDetail">
        <div className="country_flag">
          <div className="">
            <Link to="/">
              <button
                className="back"
                onClick={() => {
                  localStorage.setItem("Region", JSON.stringify(allData));
                }}
              >
                <RiArrowLeftFill className="back-icon" />
                <p>Back</p>
              </button>
            </Link>
          </div>
          <img src={flag} />
        </div>
        <div className="country_info">
          <h1 className="country_Name">{name}</h1>
          <div className="info_cols">
            <div className="col1">
              <p>
                Nativa Name: <span>{name}</span>
              </p>
              <p>
                Population: <span>{population}</span>
              </p>
              <p>
                Region: <span>{region}</span>
              </p>
              <p>
                Sub Region: <span>{subregion}</span>
              </p>
              <p>
                Capital: <span>{capital}</span>
              </p>
            </div>
            <div className="col2">
              <p>
                Top Level Domain: <span>{topLevelDomain}</span>
              </p>
              <p>
                Currencies:{" "}
                <span>
                  {caruncies} ({symbol})
                </span>
              </p>
              <p>
                Languages: <span>{languages}</span>
              </p>
              <p>
                Code: <span>{code}</span>
              </p>
            </div>
          </div>
          <div className="borders">
            <p>Border Countries: </p>
            {countryBorder
              ? countryBorder.map((border) => {
                  const resVal = border.split(",").join(",");
                  return <span>{border}</span>;
                })
              : false}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Country;
