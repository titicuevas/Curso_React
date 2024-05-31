import { useEffect, useState } from "react";
import "./App.css";
import { useCatImage } from "./hooks/useCatImage";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export function App() {
  const [fact, setFact] = useState();
  const [factError, setFactError] = useState();

  const imageUrl = useCatImage(fact);

  const fetchCatFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se ha podido recuperar la cita");
        }
        return response.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      })
      .catch((error) => {
        setFactError(error.message);
        console.error("Error fetching cat fact:", error);
      });
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  const handleClick = () => {
    fetchCatFact();
  };

  return (
    <main>
      <h1>App de Gatitos</h1>
      <button onClick={handleClick}>Nuevos Datos</button>
      <section>
        {factError && <p>{factError}</p>}
        {fact && <p>{fact}</p>}
        {imageUrl ? (
          <img src={imageUrl} alt={`imagen de un gato ${fact}`} />
        ) : (
          <p>Cargando imagen...</p>
        )}
      </section>
    </main>
  );
}
