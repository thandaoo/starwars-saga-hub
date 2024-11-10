import { DEFAULT_SORT_BY, SortByType } from './constants'
import React, { createContext, useContext, useState } from 'react'

interface SortContextType {
  sortBy: SortByType
  setSortBy: (value: SortByType) => void
  searchFilter: string
  setSearchFilter: (filter: string) => void
  resetFilters: () => void
}

interface SortProviderProps {
  children: React.ReactNode
}

const FilterContext = createContext<SortContextType | undefined>(undefined)

// Custom hook for context access
export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error(
      'useFilterContext must be used within a MovieFilterProvider'
    )
  }
  return context
}

// Provider component
export const MovieFilterProvider = ({
  children
}: SortProviderProps): JSX.Element => {
  const [sortBy, setSortBy] = useState<SortByType>(DEFAULT_SORT_BY)
  const [searchFilter, setSearchFilter] = useState<string>('')

  const resetFilters = () => {
    setSortBy(DEFAULT_SORT_BY)
    setSearchFilter('')
  }

  return (
    <FilterContext.Provider
      value={{ sortBy, setSortBy, searchFilter, setSearchFilter, resetFilters }}
    >
      {children}
    </FilterContext.Provider>
  )
}
