import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { MyContext } from "../context";

function Navbar() {
  const navigate = useNavigate();
  const { userRole, setUser, setIsAuthenticated } = useContext(MyContext);
  function Logout() {
    setUser("");
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <div className="navbar-head">
        <h2>Cooking Box</h2>
        <div>
          <ul>
            <li onClick={() => navigate("/home")}>Home</li>
            {userRole == "admin" ? (
              <li onClick={() => navigate("/create")}>Create</li>
            ) : (
              ""
            )}
            <li onClick={() => navigate("/list")}>Recipes</li>
            <li onClick={() => Logout()}>Logout</li>
          </ul>
          <div className="bar">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
