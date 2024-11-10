import { SortByType } from '../../utils/constants'
import { useFilterContext } from '../../utils/MovieFilterContext'

const MovieSortByButton = () => {
  const { sortBy, setSortBy } = useFilterContext()

  const sortingItems: {
    label: string
    value: SortByType
  }[] = [
    { label: 'Episode', value: 'episode' },
    { label: 'Title', value: 'title' },
    { label: 'Year', value: 'year' }
  ]

  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-sm rounded-box bg-slate-50 min-w-24 md:min-w-40 px-2 md:px-4 capitalize hover:ring-2 hover:ring-offset-1 hover:ring-secondary'
        aria-label='Sort by button'
      >
        <span className='inline-flex w-full justify-between'>
          <span className='flex'>
            <span className='sm:flex hidden'>Sort by &nbsp;</span>
            {sortBy}
          </span>

          <span className='text-accent-content'>&#9660;</span>
        </span>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content bg-slate-100 menu rounded z-[1] mt-2 w-full shadow'
      >
        {sortingItems.map(item => (
          <li key={item.value}>
            <button
              className='btn btn-sm btn-ghost'
              onClick={() => setSortBy(item.value as SortByType)}
              disabled={sortBy === item.value}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieSortByButton
