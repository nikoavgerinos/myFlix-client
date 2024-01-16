import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { FavoritesView } from "../favorites-view/favorites-view.jsx";
import "./main-view.scss";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/actions";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.filter);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://nikolaos-myflix-f421700e5033.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          Description: movie.Description,
          Year: movie.Year,
          Genre: {
            Name: movie.Genre.Name,
          },
          Director: {
            Name: movie.Director.Name,
          },
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const addFav = (movieId) => {
    if (user) {
      const updatedUser = { ...user };

      if (!updatedUser.FavoriteMovies.includes(movieId)) {
        updatedUser.FavoriteMovies.push(movieId);
        setUser(updatedUser);
      }
    }
  };

  const removeFav = (movieId) => {
    if (user) {
      const updatedUser = { ...user };
      const index = updatedUser.FavoriteMovies.indexOf(movieId);

      if (index !== -1) {
        updatedUser.FavoriteMovies.splice(index, 1);
        setUser(updatedUser);
      }
    }
  };

  const handleFilterChange = (value) => {
    dispatch(setFilter(value));
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          // Clear user data and token from local storage
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          // Set user state to null (optional)
          setUser(null);

          // Redirect to the root path ("/")
          window.location.href = "/";

          // Show a logout alert
          alert("Successfully logged out");
        }}
      />
      <Row className="justify-content-center my-5">
        <Col md={12}></Col>
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupView />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieView
                movies={filteredMovies}
                addFav={addFav}
                removeFav={removeFav}
                user={user}
              />
            }
          />
          <Route
            path="/"
            element={
              <>
                {user ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) => handleFilterChange(e.target.value)}
                      value={filter}
                      placeholder="Filter movies..."
                      className="mb-3 form-control"
                    />
                    {filteredMovies.map((m) => (
                      <Col md={6} lg={4} xl={3} key={m._id}>
                        <MovieCard
                          movie={m}
                          removeFav={removeFav}
                          addFav={addFav}
                          isFavorite={
                            user && user.FavoriteMovies.includes(m._id)
                          }
                        />
                      </Col>
                    ))}
                  </>
                ) : null}
              </>
            }
          />

          <Route
            path="/profile"
            element={<ProfileView user={user} movies={movies} />}
          />
          <Route
            path="/favorites"
            element={
              <FavoritesView
                user={user}
                movies={movies}
                removeFav={removeFav}
                addFav={addFav}
              />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
