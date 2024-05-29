import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_IMAGE_BASE_URL = "https://cataas.com/cat/says/";

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [factError, setFactError] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((response) => {
        if (!response.ok) {
          setFactError("No se ha podido recuperar la cita");
        }
        return response.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);

        

        const threeFirstWords = fact.split(" ").slice(0, 3).join(" ");
        console.log("Three first words:", threeFirstWords);

        
        const encodedWords = encodeURIComponent(threeFirstWords);
        const imageUrl = `${CAT_IMAGE_BASE_URL}${encodedWords}?size=50&color=red`;
        console.log("Image URL:", imageUrl);
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching cat fact:", error);
      });
  }, []); // El array vacío [] asegura que el useEffect solo se ejecute una vez



const handleclick = () => {

    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((response) => {
        if (!response.ok) {
          setFactError("No se ha podido recuperar la cita");
        }
        return response.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      })
    }


  return (
    <main>
      <h1>App de Gatitos</h1>

      <button onClick={handleclick}>Nuevos Datos</button>
      <section>
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
