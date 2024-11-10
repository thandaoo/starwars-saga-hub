import MovieSearchBox from '../movies/MovieSearchBox'
import MovieSortByButton from '../movies/MovieSortByButton'

const NavBar = () => {
  return (
    <div className='navbar bg-base-300 shadow gap-2 px-4'>
      <div className='flex-initial'>
        <MovieSortByButton />
      </div>
      <div className='flex-auto'>
        <MovieSearchBox />
      </div>
    </div>
  )
}

export default NavBar
