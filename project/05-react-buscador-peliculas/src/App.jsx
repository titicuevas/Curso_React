import { useState, useEffect } from 'react'
import './App.css'
import { translateText } from './assets/components/deepLTranslate'

function App () {
  const [consulta, setConsulta] = useState('')
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const apiKeyTMDB = import.meta.env.VITE_TMDB_API_KEY

  const traducirDescripcion = async (overview) => {
    try {
      return await translateText(overview, 'ES')
    } catch (err) {
      console.error('Error translating overview:', err)
      return overview
    }
  }

  const buscarPeliculas = async (query) => {
    if (query.length < 3) {
      setPeliculas([])
      setMensaje('Debe introducir al menos 3 letras para realizar la búsqueda.')
      return
    }

    if (!apiKeyTMDB) {
      setError('Falta VITE_TMDB_API_KEY en el archivo .env')
      return
    }

    setMensaje('')
    setCargando(true)
    setError(null)

    try {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTMDB}&query=${encodeURIComponent(query)}`
      )

      if (!respuesta.ok) {
        throw new Error(`Error de la API (${respuesta.status})`)
      }

      const datos = await respuesta.json()

      if (datos.results) {
        const peliculasConTraduccion = await Promise.all(
          datos.results.map(async (pelicula) => {
            const descripcionTraducida = await traducirDescripcion(pelicula.overview)
            return { ...pelicula, overview: descripcionTraducida }
          })
        )

        setPeliculas(peliculasConTraduccion)
      } else {
        setPeliculas([])
      }
    } catch (err) {
      console.error(err)
      setError('Algo salió mal. Por favor, inténtalo de nuevo más tarde.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    if (consulta.length >= 3) {
      const delayDebounceFn = setTimeout(() => {
        buscarPeliculas(consulta)
      }, 300)

      return () => clearTimeout(delayDebounceFn)
    }

    setPeliculas([])
    setMensaje('')
  }, [consulta])

  return (
    <div className='page'>
      <h1>Buscador de Películas</h1>
      <header>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder='Avengers, Matrix, Spiderman'
            type='text'
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
          />
        </form>
        {mensaje && <p className='warning-message'>{mensaje}</p>}
      </header>
      <main>
        {error && <p className='error-message'>{error}</p>}
        {cargando && <p className='loading-message'>Buscando...</p>}
        <div className='movies'>
          {peliculas.length > 0
            ? (
                peliculas.map((pelicula) => (
                  <div key={pelicula.id} className='movie'>
                    {pelicula.poster_path
                      ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
                          alt={pelicula.title}
                          className='poster'
                        />
                        )
                      : (
                        <p>No hay imagen disponible</p>
                        )}
                    <div className='movie-info'>
                      <h2>
                        {pelicula.title}
                        {pelicula.release_date
                          ? ` (${new Date(pelicula.release_date).getFullYear()})`
                          : ''}
                      </h2>
                      <p>{pelicula.overview}</p>
                    </div>
                  </div>
                ))
              )
            : consulta.length >= 3 && !cargando
              ? (
                <p className='loading-message'>No se encontraron películas</p>
                )
              : null}
        </div>
      </main>
    </div>
  )
}

export default App
