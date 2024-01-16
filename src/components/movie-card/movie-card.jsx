import React from "react";

import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../movie-card/movie-card.scss";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
  const handleCardClick = (e) => {
    // Check if the clicked element is a button or a link,
    // and prevent navigation in those cases
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "A" ||
      e.target.closest("button") ||
      e.target.closest("a")
    ) {
      return;
    }

    // Navigate to the movie details page when the card is clicked
    window.location.href = `/movies/${encodeURIComponent(movie._id)}`;
  };

  return (
    <div className="movie-card-wrapper">
      <Card className="h-100 mt-5 card-shadow" onClick={handleCardClick}>
        <Card.Img variant="top card-img" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <div>
            {isFavorite ? (
              <Button
                className="my-2 me-2 remove-fav-button"
                onClick={() => removeFav(movie._id)}
              >
                Remove from Favorite
              </Button>
            ) : (
              <Button
                className="my-2 me-2 add-fav-button"
                onClick={() => addFav(movie._id)}
              >
                Add to Favorite
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
