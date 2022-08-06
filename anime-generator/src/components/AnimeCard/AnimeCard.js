import React from "react";
import Navbar from "../Navbar/SiteNavbar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AnimeImage from "../../shared/img/overlord.jpeg";
import "./AnimeCard.css";

function AnimeCard() {
  return (
    <div className="anime-container ">
      <Navbar />
      <Card className="anime-card-container mt-3">
        <Card.Img variant="top" src={AnimeImage} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AnimeCard;
