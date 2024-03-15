import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>İş Takip</h2>

      <nav className="navbar">
        <NavLink style={{ textDecoration: "none" }} to={"/"}>
          İş Listesi
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to={"/add"}>
          İş Ekle
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
