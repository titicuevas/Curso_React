// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";
import { translateText } from "./assets/componets/libreTranslate"; // Asegúrate de que la ruta sea correcta

function App() {
  const [consulta, setConsulta] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const apiKeyTMDB = "7c10606307e4a10be78f9959d3065ef3";

  const traducirDescripcion = async (overview) => {
    try {
      const descripcionTraducida = await translateText(overview, "ES");
      return descripcionTraducida;
    } catch (error) {
      console.error("Error translating overview:", error);
      return overview; // Devuelve la descripción original en caso de error
    }
  };

  const buscarPeliculas = async (query) => {
    if (query.length < 3) {
      setPeliculas([]);
      setMensaje("Debe introducir al menos 3 letras para realizar la búsqueda.");
      return;
    } else {
      setMensaje("");
    }

    setCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTMDB}&query=${query}`
      );
      const datos = await respuesta.json();

      if (datos.results) {
        const peliculasConTraduccion = await Promise.all(
          datos.results.map(async (pelicula) => {
            const descripcionTraducida = await traducirDescripcion(pelicula.overview);
            return { ...pelicula, overview: descripcionTraducida };
          })
        );

        setPeliculas(peliculasConTraduccion);
      } else {
        setPeliculas([]);
      }
    } catch (err) {
      setError("Algo salió mal. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (consulta.length >= 3) {
      const delayDebounceFn = setTimeout(() => {
        buscarPeliculas(consulta);
      }, 300); // Espera 300ms antes de realizar la búsqueda

      return () => clearTimeout(delayDebounceFn);
    } else {
      setPeliculas([]);
      setMensaje("");
    }
  }, [consulta]);

  return (
    <div className="page">
      <h1>Buscador de Películas</h1>
      <header>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Avengers, Matrix, Spiderman"
            type="text"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
          />

        </form>
        {mensaje && <p className="warning-message">{mensaje}</p>}
      </header>
      <main>
        {error && <p className="error-message">{error}</p>}
        <div className="movies">
          {peliculas.length > 0 ? (
            peliculas.map((pelicula) => (
              <div key={pelicula.id} className="movie">
                {pelicula.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
                    alt={pelicula.title}
                    className="poster"
                  />
                ) : (
                  <p>No hay imagen disponible</p>
                )}
                <div className="movie-info">
                  <h2>{pelicula.title} ({new Date(pelicula.release_date).getFullYear()})</h2>
                  <p>{pelicula.overview}</p>
                </div>
              </div>
            ))
          ) : consulta.length >= 3 && !cargando ? (
            <p className="loading-message">No se encontraron películas</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
