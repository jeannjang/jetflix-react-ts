import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import MediaGrid from "../components/common/MediaGrid";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../api/moviesApi";
import {
  getPopularTvSeries,
  getTopRatedTvSeries,
  getTrendingTvSeries,
} from "../api/tvApi";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const ResultsText = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.primary};
  padding: 0 clamp(20px, 4vw, 50px);
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  // client-side 데이터 재사용
  const { data: moviesTrending } = useQuery({
    queryKey: ["movies", "trending"],
    queryFn: getTrendingMovies,
  });

  const { data: moviesPopular } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => getPopularMovies(),
  });

  const { data: moviesTopRated } = useQuery({
    queryKey: ["movies", "topRated"],
    queryFn: () => getTopRatedMovies(),
  });

  const { data: seriesTrending } = useQuery({
    queryKey: ["series", "trending"],
    queryFn: getTrendingTvSeries,
  });

  const { data: seriesPopular } = useQuery({
    queryKey: ["series", "popular"],
    queryFn: () => getPopularTvSeries(),
  });

  const { data: seriesTopRated } = useQuery({
    queryKey: ["series", "topRated"],
    queryFn: () => getTopRatedTvSeries(),
  });

  // 모든 영화 데이터 합치기
  const allMovies = [
    ...(moviesTrending?.results || []),
    ...(moviesPopular?.results || []),
    ...(moviesTopRated?.results || []),
  ];

  // 모든 시리즈 데이터 합치기
  const allSeries = [
    ...(seriesTrending?.results || []),
    ...(seriesPopular?.results || []),
    ...(seriesTopRated?.results || []),
  ];

  // 중복 제거
  const uniqueMovies = Array.from(
    new Map(allMovies.map((movie) => [movie.id, movie])).values()
  );
  const uniqueSeries = Array.from(
    new Map(allSeries.map((series) => [series.id, series])).values()
  );

  // 검색 로직
  const filteredMovies = keyword
    ? uniqueMovies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : [];

  const filteredSeries = keyword
    ? uniqueSeries.filter((series) =>
        series.name.toLowerCase().includes(keyword.toLowerCase())
      )
    : [];

  const noResults =
    keyword && filteredMovies.length === 0 && filteredSeries.length === 0;

  return (
    <Wrapper>
      <ResultsText>
        {keyword
          ? noResults
            ? `No results found for "${keyword}"`
            : `Search results for "${keyword}"`
          : "Please enter a search term"}
      </ResultsText>
      {filteredMovies.length > 0 && (
        <MediaGrid data={filteredMovies} mediaType="movies" />
      )}
      {filteredSeries.length > 0 && (
        <MediaGrid data={filteredSeries} mediaType="series" />
      )}
    </Wrapper>
  );
}

export default Search;

//jetflix
