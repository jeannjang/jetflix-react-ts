import { API_CONFIG } from "./configApi";

export interface ITvSeries {
  id: number;
  name: string; // TV shows use 'name' instead of 'title'
  backdrop_path: string;
  poster_path: string;
  overview: string;
  first_air_date: string; // instead of release_date
  vote_average: number;
  genre_ids: number[];
}

export interface IGetTvSeriesResponse {
  page: number;
  results: ITvSeries[];
  total_pages: number;
  total_results: number;
}

export async function getTopRatedTvSeries(page: number = 1) {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}/tv/top_rated?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: API_CONFIG.BEARER_TOKEN,
        accept: "application/json",
      },
    }
  );
  return response.json();
}

export async function getTrendingTvSeries() {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}/trending/tv/week?language=en-US`,
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
