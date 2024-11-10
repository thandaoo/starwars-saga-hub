import { APIS, Movie } from '../../utils/constants'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useFilterContext } from '../../utils/MovieFilterContext'

interface Props {
  onSelect: (movie: Movie) => void
}

const MovieList = ({ onSelect }: Props) => {
  const { sortBy, searchFilter } = useFilterContext()
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const response = await fetch(APIS.SW_FILMS_URL, { method: 'GET' })
        if (!response.ok) throw new Error('Failed to retrieve data')
        const data = await response.json()
        if (isMounted) setMovies(data.results)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchMovies()
    return () => {
      isMounted = false
    }
  }, [])

  const sortMovies = (movies: Movie[], sortBy: string): Movie[] => {
    return movies.slice().sort((a, b) => {
      if (sortBy === 'episode') return a.episode_id - b.episode_id
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return (
        new Date(a.release_date).getFullYear() -
        new Date(b.release_date).getFullYear()
      )
    })
  }

  const filteredMovies = useMemo(() => {
    return sortMovies(
      movies.filter(movie =>
        movie.title.toLowerCase().includes(searchFilter.toLowerCase())
      ),
      sortBy
    )
  }, [movies, searchFilter, sortBy])

  const handleSelectMovie = useCallback(
    (movie: Movie) => {
      onSelect(movie)
      setSelectedMovie(movie)
    },
    [onSelect]
  )

  if (loading) {
    return (
      <div className='p-4 flex flex-col gap-3'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='skeleton h-6 w-full'></div>
        ))}
      </div>
    )
  }

  return (
    <ul className='menu w-full leading-loose'>
      {filteredMovies.length ? (
        filteredMovies.map(movie => (
          <li
            key={movie.episode_id}
            onClick={() => handleSelectMovie(movie)}
            className='border-b border-b-slate-300 cursor-pointer'
          >
            <div
              className={`inline-flex justify-between gap-2 flex-row hover:bg-primary/80 hover:text-slate-100 ${
                selectedMovie === movie
                  ? 'bg-primary text-slate-100 shadow shadow-secondary/60'
                  : ''
              }`}
            >
              <div className='flex gap-4'>
                <div className='uppercase inline-flex'>
                  <span className='hidden lg:inline'>Episode</span>
                  <span className='lg:hidden inline'>Ep</span>&nbsp;
                  {movie.episode_id}
                </div>
                <span className='line-clamp-1 tracking-tighter md:tracking-normal'>
                  {movie.title}
                </span>
              </div>
              <div>{movie.release_date}</div>
            </div>
          </li>
        ))
      ) : (
        <div className='text-center mt-2'>No results found.</div>
      )}
    </ul>
  )
}

export default MovieList
