import { Outlet, Link } from "react-router-dom";
import { Fragment, useState } from "react";
import "./NavBar.scss";
import { RiMoonLine } from "react-icons/ri";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const NavBar = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  // //TOGGLE DARK & LIGHT MODE
  const setDarkMd = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const seLightMd = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setDarkMode(false);
      seLightMd();
    } else {
      setDarkMode(true);
      setDarkMd();
    }
  };

  return (
    <Fragment>
      <div className="Navigation">
        <div className="logo">Where In the World?</div>
        <DarkModeSwitch
          onChange={toggleDarkMode}
          checked={isDarkMode}
          size={20}
        />
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
