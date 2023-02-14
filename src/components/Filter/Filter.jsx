import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import RegionContext from "../../RegionContext";
import "./Filter.scss";

const regionNames = [
  {
    id: 0,
    region: "all",
  },
  {
    id: 1,
    region: "Africa",
  },
  {
    id: 2,
    region: "America",
  },
  {
    id: 3,
    region: "Asia",
  },
  {
    id: 4,
    region: "Europe",
  },
  {
    id: 5,
    region: "Oceania",
  },
];

const Filter = () => {
  const { region, setRegion } = useContext(RegionContext);
  const [active, setActive] = useState(false);
  const [select, setSelect] = useState("all");

  const showSelection = () => {
    if (active == false) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    if (select == "all") {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((Data) => {
          setRegion(Data);
        });
    } else {
      fetch(`https://restcountries.com/v3.1/region/${select}`)
        .then((response) => response.json())
        .then((Data) => {
          setRegion(Data);
        });
    }
  }, [select]);

  return (
    <div className="filter-container">
      <div
        className="filter-header"
        onClick={() => {
          showSelection();
        }}
      >
        <p className="filter_text">{select}</p>
        <BiChevronDown className="filter-icon" />
      </div>
      <div className={`filter-selection ${active ? "show-selection" : ""}`}>
        {regionNames.map((li) => {
          return (
            <div
              className="region"
              key={li.id}
              onClick={() => {
                setSelect(li.region);
                localStorage.setItem("Region", JSON.stringify(region));
              }}
            >
              <Link to="/">{li.region}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
