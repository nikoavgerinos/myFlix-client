import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  // Create a state for movies using the useState hook
  const [movies, setMovies] = useState([
    {
      id: 1,
      image: "https://m.media-amazon.com/images/I/51Yym21h0TL._AC_.jpg",
      title: "Gladiator",
      description:
        "A former Roman General sets out exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      genre: "Adventure",
      director: "Ridley Scott",
    },
    {
      id: 2,
      image: "https://i.ebayimg.com/images/g/ag4AAOSw4CFY3NZF/s-l500.jpg",
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      genre: "Drama",
      director: "Frank Darabont",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/originals/a0/c0/50/a0c050d68a619f501fb3f3a44e4aeba8.jpg",
      title: "The Godfather",
      description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      genre: "Crime, Drama",
      director: "Francis Ford Coppola",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
