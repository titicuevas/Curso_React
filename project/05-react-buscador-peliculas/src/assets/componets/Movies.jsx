export function ListOfMovies() {
    const movies = []; // Assuming you have an array of movies
    return (
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    );
}

const renderMovies = () => {
    return null; // Placeholder for the renderMovies function
}

const renderNoResults = () => {
    return (
      <p>No se encontro ninguna pelicula en la busqueda</p>
    );
}