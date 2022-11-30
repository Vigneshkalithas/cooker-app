import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import React, { useState, useContext, useEffect } from "react";
import Carosuel from "../Components/Carosuel";
import { ReviewData } from "../Helper/ReviewData";
import { MyContext } from "../context";

function Home() {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(MyContext);
  useEffect(() => {
    if (!user) {
      if (localStorage.getItem("user")) {
        setUser(JSON.parse(localStorage.getItem("user")));
        setIsAuthenticated(true);
      } else navigate("/login");
    }
  }, []);

  return (
    <>
      <Carosuel />
      <div className="home-head">
        <div className="left-content">
          <h1>
            Learn to cook from <br />
            home like a chef
          </h1>
          <p className="p-w">
            Make the family kitchen like a restaurant kitchen more productive at{" "}
            home by cooking for the family or starting a culinary business. With
            our recipe recipes!
          </p>
        </div>
        <div className="right-images">
          <div className="card1">
            <img
              src="https://img.freepik.com/free-photo/vertical-shot-traditional-indian-paneer-butter-masala-cheese-cottage-curry-black-surface_181624-32001.jpg?w=360&t=st=1668938458~exp=1668939058~hmac=432b72061a5db08b88b80d1b2bddc67ef84646b78be0c4be9897ad8aa4001591"
              alt="sm-card-1"
            />
            <div className="sm-details-1">
              <h3>Special</h3>
              <h3>Recipes</h3>
            </div>
          </div>
          <div className="card2">
            <div className="sm-details-2">
              <h3>Recive a free</h3>
              <h3>Gift cards</h3>
            </div>
            <img
              src="https://img.freepik.com/free-photo/indian-chicken-biryani-served-terracotta-bowl-with-yogurt-white-background-selective-focus_466689-72551.jpg?w=360&t=st=1668939000~exp=1668939600~hmac=f2f37d455b1d962a54ffcf47829d2bb275cccb31cfb1c4a908d0aab506789172"
              alt="sm-card-2"
            />
          </div>
        </div>
      </div>

      <div className="review">
        <h4>Some Good Reviews</h4>
        <h2>What People Say</h2>

        <div className="review-card-head">
          {ReviewData.map((x, index) => {
            return (
              <div key={index}>
                <div className="r-card-1">
                  <img src={x.dp} alt={x.name} />
                  <p>{x.review}</p>
                  <h5>-{x.name}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
