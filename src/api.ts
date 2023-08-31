const API_KEY = "29c019fea4f2e354d5ff4103cee96f3f";
const BASE_PATH = "https://api.themoviedb.org/3";
const TAIL_PATH = `api_key=${API_KEY}`;
export const LIST_TYPE = [
  "nowPlaying",
  "upcomingMovies",
  "popularMovies",
  "tvShow",
];

export interface IData {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

export interface IGetDataResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface IGenre {
  id: number;
  name: string;
}
interface INetworks {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}
export interface IDetailInfo {
  id: number;
  overview: string;
  title?: string;
  original_title?: string;
  name?: string;
  vote_average: number;
  runtime: number;
  backdrop_path: string;
  poster_path: string;
  genres: IGenre[];
  release_date?: string;
  first_air_date?: string;
  networks: INetworks[];
  tagline?: string;
}

export function getNowPlayingMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

export function getPopularTvShows() {
  return fetch(`${BASE_PATH}/tv/popular?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

export function getDetailData(requestUrl: string, movieId: number) {
  return fetch(`${BASE_PATH}/${requestUrl}/${movieId}?${TAIL_PATH}`).then(
    (response) => response.json()
  );
}

export interface IGetSearchResult {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}
interface ISearch {
  id: number;
  overview: string;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  media_type: string;
}
export function searchData(keyword: string) {
  return fetch(`${BASE_PATH}/search/multi?${TAIL_PATH}&query=${keyword}`)
    .then((response) => response.json())
    .catch((err) => err);
}
