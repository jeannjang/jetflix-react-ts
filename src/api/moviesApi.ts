import { API_CONFIG } from "./configApi";

export interface IMovie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface IGetMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getTopRatedMovies(
  page: number = 1,
  region: string = "nz"
) {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}/movie/top_rated?language=en-US&page=${page}&region=${region}`,
    {
      headers: {
        Authorization: API_CONFIG.BEARER_TOKEN,
        accept: "application/json",
      },
    }
  );
  return response.json();
}

export async function getPopularMovies(page: number = 1) {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}/movie/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: API_CONFIG.BEARER_TOKEN,
        accept: "application/json",
      },
    }
  );
  return response.json();
}

export async function getTrendingMovies() {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}/trending/movie/week?language=en-US`,
    {
      headers: {
        Authorization: API_CONFIG.BEARER_TOKEN,
        accept: "application/json",
      },
    }
  );
  return response.json();
}

//jetflix
