import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../movie-card/movie-card.scss";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
  const handleCardClick = (e) => {
    // Prevent the card click event from propagating when the "Add to Favorite" button is clicked
    if (e.target.tagName !== "BUTTON") {
      // Navigate to the movie details page when the card is clicked
      window.location.href = `/movies/${encodeURIComponent(movie._id)}`;
    }
  };

  return (
    <Card className="h-100 mt-5 card-shadow" onClick={handleCardClick}>
      <Card.Img variant="top card-img" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <div>
          {isFavorite ? (
            <Button className="my-2 me-2" onClick={() => removeFav(movie._id)}>
              <i className="fas fa-thumbs-down"></i> Remove from Favorite
            </Button>
          ) : (
            <Button className="my-2 me-2" onClick={() => addFav(movie._id)}>
              <i className="fas fa-thumbs-up"></i> Add to Favorite
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
