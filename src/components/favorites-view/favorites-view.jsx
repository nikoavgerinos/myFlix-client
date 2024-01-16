import React from "react";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoritesView = ({ user, movies, removeFav, addFav }) => {
  // Check if the user object is defined and contains FavoriteMovies
  if (!user || !user.FavoriteMovies) {
    return (
      <Row>
        <Col className="text-center">
          <p>No user data or favorite movies found.</p>
        </Col>
      </Row>
    );
  }

  // Return list of favorite Movies
  const favoriteMovieList = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  return (
    <Row>
      <Col>
        <h2 className="text-center">My Favorite Movies</h2>
        <Row className="justify-content-center">
          {favoriteMovieList.length !== 0 ? (
            favoriteMovieList.map((movie) => (
              <Col
                sm={7}
                md={5}
                lg={3}
                xl={2}
                className="mx-2 mt-2 mb-5 col-6 similar-movies-img"
                key={movie._id}
              >
                <MovieCard
                  movie={movie}
                  removeFav={removeFav}
                  addFav={addFav}
                  isFavorite={user.FavoriteMovies.includes(movie._id)}
                />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>There are no favorite movies.</p>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};
