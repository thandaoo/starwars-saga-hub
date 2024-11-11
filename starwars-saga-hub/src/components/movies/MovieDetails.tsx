import { APIS, Movie, MovieDetailsInfo, Rating } from '../../utils/constants'
import { memo, useCallback, useEffect, useState } from 'react'

import AverageRating from './AverageRating'

interface Props {
  movie: Movie | undefined
}

const MovieDetails = memo(({ movie }: Props) => {
  const [movieDetails, setMovieDetails] = useState<
    MovieDetailsInfo | undefined
  >(undefined)
  const [poster, setPoster] = useState<string>('')
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  const fetchMovieData = useCallback(async () => {
    if (!movie) return

    setLoading(true)
    setPoster('')
    setRatings([])

    try {
      const response = await fetch(
        `${APIS.OMDB_URL}?apikey=${
          process.env.REACT_APP_OMDB_API_KEY
        }&t=${encodeURIComponent(movie.title)}`
      )
      if (!response.ok) throw new Error('Failed to fetch OMDB data')

      const data: MovieDetailsInfo = await response.json()
      setPoster(data.Poster)
      setRatings(data.Ratings)
      setMovieDetails(data)
    } catch (error) {
      console.error('Error fetching movie details:', error)
    } finally {
      setLoading(false)
    }
  }, [movie])

  useEffect(() => {
    fetchMovieData()
  }, [fetchMovieData])

  if (!movie)
    return (
      <div className='flex h-1/3 items-center justify-center text-xl text-neutral-700 font-semibold tracking-wide capitalize'>
        <span className='text-nowrap'>
          Select a movie to start exploring...
        </span>
        <span className='ml-2'>💫</span>
      </div>
    )
  return (
    <div className='flex flex-col gap-5 md:flex-row items-start w-full my-4'>
      {/* movie poster container */}
      <div className='flex sm:min-w-60 w-full justify-center md:justify-start'>
        {poster ? (
          <img
            src={poster}
            alt={movie?.title}
            className='sm:h-80 h-60 w-auto object-contain mb-2 sm:mb-0 rounded-xl drop-shadow-xl'
            loading='lazy'
          />
        ) : (
          <div className='skeleton w-full h-80' />
        )}
      </div>
      {/* movie details container */}
      <div className='whitespace-normal text-balance mb-4'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>
            {movie.title}
            <span className='text-gray-500 text-xs flex font-light gap-3'>
              Director: {movie.director} <span>Producer: {movie.producer}</span>
            </span>
          </h1>
          <div className='flex gap-4 text-sm font-semibold'>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>
              {movieDetails?.Runtime !== 'N/A' ? movieDetails?.Runtime : ''}
            </span>
            <span>
              {movieDetails?.Rated !== 'N/A' ? movieDetails?.Rated : ''}
            </span>
          </div>
          <div className='flex gap-2'>
            {movieDetails?.Genre &&
              movieDetails.Genre.split(', ').map((genre, index) => (
                <span
                  key={index}
                  className='badge badge-sm badge-primary text-slate-100 tracking-wide py-2 shadow'
                >
                  {genre.trim()}
                </span>
              ))}
          </div>
        </div>
        <p className='break-words text-wrap mt-6 tracking-tight'>
          {movie.opening_crawl}
        </p>
        {/* Ratings container */}
        <div className='flex flex-col flex-wrap gap-4 mt-4'>
          <span className='inline-flex items-center flex-wrap font-medium text-nowrap text-xs gap-2'>
            Average Rating:{' '}
            {!loading ? (
              <AverageRating ratings={ratings} />
            ) : (
              <div className='skeleton w-32 h-4' />
            )}
          </span>
          <div className='flex flex-col flex-wrap sm:flex-row gap-3'>
            {!loading ? (
              ratings?.map((rating, index) => (
                <div
                  key={index}
                  className='badge badge-accent text-slate-700 md:badge-sm badge-xs p-3 rounded-full whitespace-nowrap tracking-tighter shadow-xl'
                >
                  {rating.Source}: {rating.Value}
                </div>
              ))
            ) : (
              <div className='flex sm:flex-col gap-3'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className='skeleton w-1/3 h-4' />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
export default MovieDetails
