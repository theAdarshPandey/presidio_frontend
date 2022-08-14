import "./MovieCard.css";
import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ name, genre, date, imgURL, id }) {
  return (
    <Link to={"/book/" + id} className="movie-card-wrapper">
      <div className="movie-card">
        <h2>{name}</h2>
        <p>{genre}</p>
        <span>{date}</span>
        <div className="img-container">
          <img src={imgURL} alt={name + " movie poster"} />
        </div>
      </div>
    </Link>
  );
}
