import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, IGetMoviesResponse } from "../api/moviesApi";
import { getTrendingTvSeries, IGetTvSeriesResponse } from "../api/tvApi";
import styled from "styled-components";
import Banner from "../components/common/Banner";

const Wrapper = styled.div`
  height: 200vh;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.primary};
`;

function Home() {
  // 두 개의 API 요청을 동시에 수행
  const { data: movieData, isLoading: isMovieLoading } =
    useQuery<IGetMoviesResponse>({
      queryKey: ["movies", "trending"],
      queryFn: getTrendingMovies,
    });

  const { data: seriesData, isLoading: isSeriesLoading } =
    useQuery<IGetTvSeriesResponse>({
      queryKey: ["series", "trending"],
      queryFn: getTrendingTvSeries,
    });

  // 데이터 조합 및 랜덤 선택 로직
  const getRandomMedia = () => {
    if (!movieData || !seriesData) return null;

    // 영화와 시리즈 데이터를 하나의 배열로 합침
    const allMedia = [...movieData.results, ...seriesData.results];

    // 랜덤으로 하나 선택
    return allMedia[Math.floor(Math.random() * allMedia.length)];
  };

  const randomMedia = getRandomMedia();
  const isLoading = isMovieLoading || isSeriesLoading;

  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        randomMedia && <Banner mediaData={randomMedia} />
      )}
    </Wrapper>
  );
}

export default Home;

//jetflix
