import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title} {/* Note the change here to match the data structure */}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired, // Corrected to match the data structure
    // Add other properties of movie you are using
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
