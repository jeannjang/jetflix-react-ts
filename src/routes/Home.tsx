import { useQuery } from "@tanstack/react-query";
import {
  IMovie,
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
  IGetMoviesResponse,
} from "../api/moviesApi";
import {
  ITvSeries,
  getTrendingTvSeries,
  getTopRatedTvSeries,
  getPopularTvSeries,
  IGetTvSeriesResponse,
} from "../api/tvApi";
import styled from "styled-components";
import Banner from "../components/common/Banner";
import MediaGrid from "../components/common/MediaGrid";
import { useRecoilState } from "recoil";
import { homeFilterState } from "../atoms/filterMedia";
import FilterButtons from "../components/common/FilterButtons";
import Spinner from "../components/utility/Spinner";

type Media = IMovie | ITvSeries;
type MediaList = Media[];

const Wrapper = styled.div`
  height: 200vh;
`;

const ContentContainer = styled.div`
  position: relative;
  margin-top: -60px;
  padding-bottom: 50px;
`;

function Home() {
  const [selectedCategory] = useRecoilState(homeFilterState);

  // Movies Data Fetching
  const { data: moviesTrending, isLoading: isMoviesTrendingLoading } =
    useQuery<IGetMoviesResponse>({
      queryKey: ["movies", "trending"],
      queryFn: getTrendingMovies,
    });

  const { data: moviesPopular, isLoading: isMoviesPopularLoading } =
    useQuery<IGetMoviesResponse>({
      queryKey: ["movies", "popular"],
      queryFn: () => getPopularMovies(),
    });

  const { data: moviesTopRated, isLoading: isMoviesTopRatedLoading } =
    useQuery<IGetMoviesResponse>({
      queryKey: ["movies", "topRated"],
      queryFn: () => getTopRatedMovies(),
    });

  // TV Series Data Fetching
  const { data: seriesTrending, isLoading: isSeriesTrendingLoading } =
    useQuery<IGetTvSeriesResponse>({
      queryKey: ["series", "trending"],
      queryFn: getTrendingTvSeries,
    });

  const { data: seriesPopular, isLoading: isSeriesPopularLoading } =
    useQuery<IGetTvSeriesResponse>({
      queryKey: ["series", "popular"],
      queryFn: () => getPopularTvSeries(),
    });

  const { data: seriesTopRated, isLoading: isSeriesTopRatedLoading } =
    useQuery<IGetTvSeriesResponse>({
      queryKey: ["series", "topRated"],
      queryFn: () => getTopRatedTvSeries(),
    });

  const isLoading =
    isMoviesTrendingLoading ||
    isMoviesPopularLoading ||
    isMoviesTopRatedLoading ||
    isSeriesTrendingLoading ||
    isSeriesPopularLoading ||
    isSeriesTopRatedLoading;

  const getFilteredContent = (): MediaList => {
    // Helper function to combine and deduplicate media
    const combineMedia = (
      movies: Media[] = [],
      series: Media[] = []
    ): Media[] => {
      const combined = [...movies, ...series];
      return combined.reduce((unique, item) => {
        const exists = unique.find((u) => u.id === item.id);
        if (!exists) {
          unique.push(item);
        }
        return unique;
      }, [] as Media[]);
    };

    switch (selectedCategory) {
      case "mustWatch":
        return combineMedia(moviesTopRated?.results, seriesTopRated?.results);
      case "trending":
        return combineMedia(moviesTrending?.results, seriesTrending?.results);
      case "popular":
        return combineMedia(moviesPopular?.results, seriesPopular?.results);
      case "all":
        return combineMedia(
          [
            ...(moviesTopRated?.results || []),
            ...(moviesTrending?.results || []),
            ...(moviesPopular?.results || []),
          ],
          [
            ...(seriesTopRated?.results || []),
            ...(seriesTrending?.results || []),
            ...(seriesPopular?.results || []),
          ]
        );
      default:
        return [];
    }
  };

  const filteredContent = getFilteredContent();

  // 랜덤 배너 컨텐츠 선택
  const bannerContent =
    filteredContent[Math.floor(Math.random() * filteredContent.length)];

  // 아이템이 영화인지 확인하는 타입 가드
  const isMovie = (media: Media): media is IMovie => {
    return "title" in media;
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {bannerContent && <Banner mediaData={bannerContent} />}
          <ContentContainer>
            <FilterButtons mediaType="home" />
            {/* MediaGrid를 여러 개로 나누어 영화와 시리즈를 분리하여 렌더링 */}
            <MediaGrid
              data={filteredContent.filter((item) => isMovie(item))}
              mediaType="movies"
            />
            <MediaGrid
              data={filteredContent.filter((item) => !isMovie(item))}
              mediaType="series"
            />
          </ContentContainer>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

//jetflix
