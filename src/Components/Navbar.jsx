import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { MyContext } from "../context";
import Offcanvas from "react-bootstrap/Offcanvas";

function Navbar() {
  const navigate = useNavigate();
  const { userRole, setUser, setIsAuthenticated } = useContext(MyContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <div className="bar" onClick={handleShow}>
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} id="offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cooking Box</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ul className="offcanvas-ul">
              <li
                onClick={() => {
                  navigate("/home");
                  handleClose();
                }}
              >
                Home
              </li>
              {userRole == "admin" ? (
                <li
                  onClick={() => {
                    navigate("/create");
                    handleClose();
                  }}
                >
                  Create
                </li>
              ) : (
                ""
              )}
              <li
                onClick={() => {
                  navigate("/list");
                  handleClose();
                }}
              >
                Recipes
              </li>
              <li onClick={() => Logout()}>Logout</li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navbar;
