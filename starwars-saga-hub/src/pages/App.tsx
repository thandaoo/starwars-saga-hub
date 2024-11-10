import { useCallback, useEffect, useMemo, useState } from 'react'

import MobileNavBar from '../components/layout/MobileNavBar'
import { Movie } from '../utils/constants'
import MovieDetails from '../components/movies/MovieDetails'
import { MovieFilterProvider } from '../utils/MovieFilterContext'
import MovieList from '../components/movies/MovieList'
import NavBar from '../components/layout/NavBar'
import useScreenSize from '../utils/useScreenSize'

function App () {
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>()
  const isDesktopScreen = useScreenSize()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  const clearSelectedMovie = useCallback(() => setSelectedMovie(undefined), [])

  const desktopLayout = useMemo(
    () => (
      <div className='flex flex-row w-full px-4 py-2 flex-grow'>
        <div className='w-2/5'>
          <MovieList onSelect={setSelectedMovie} />
        </div>
        <div className='divider divider-horizontal'></div>
        <div className='w-3/5'>
          <MovieDetails movie={selectedMovie} />
        </div>
      </div>
    ),
    [selectedMovie]
  )

  const mobileLayout = useMemo(
    () => (
      <div
        className='flex flex-col w-full px-4 py-2 min-h-[calc(100
      vh+var(--mobile-nav-footer-height))]'
      >
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} />
        ) : (
          <MovieList onSelect={setSelectedMovie} />
        )}
      </div>
    ),
    [selectedMovie]
  )

  return (
    <MovieFilterProvider>
      <div className='h-screen flex flex-col'>
        <NavBar />
        {isDesktopScreen ? desktopLayout : mobileLayout}
        {!isDesktopScreen && (
          <MobileNavBar onClearSelection={clearSelectedMovie} />
        )}
      </div>
    </MovieFilterProvider>
  )
}

export default App
