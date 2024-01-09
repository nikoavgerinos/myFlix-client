import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import "../movie-card/movie-card.scss";

// export const MovieCard = ({ movie, onMovieClick }) => {
//   return (
//     <Card className="h-100" onClick={() => onMovieClick(movie)}>
//       <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
//       <Card.Body>
//         <Card.Title>{movie.Title}</Card.Title>
//         <Card.Text>Description: {movie.Description}</Card.Text>
//         <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
//         <Card.Text>Director: {movie.Director.Name}</Card.Text>
//         {/* Add other movie information as needed */}
//       </Card.Body>
//     </Card>
//   );
// };

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        {/* <Card.Text>Description: {movie.Description}</Card.Text> */}
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

// Define PropTypes for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    // Add other PropTypes for movie information as needed
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
