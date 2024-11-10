export const APIS = {
OMDB_URL: 'https://www.omdbapi.com/' , // ratings & poster
SW_FILMS_URL: 'https://swapi.dev/api/films/?format=json' // movie list
}

export const DEFAULT_SORT_BY: SortByType = 'episode';

export interface Movie {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
}

export interface MovieDetailsInfo {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string | null;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string | null;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string | null;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export type SortByType = 'episode' | 'year' | 'title'

export interface Rating {
  Source: string
  Value: string
}