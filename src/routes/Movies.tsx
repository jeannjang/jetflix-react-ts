import { useQuery } from "@tanstack/react-query";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
  IGetMoviesResponse,
} from "../api/moviesApi";
import styled from "styled-components";
import Banner from "../components/common/Banner";
import MediaGrid from "../components/common/MediaGrid";
import { mediaFilterState } from "../atoms/filterMedia";
import { useRecoilState } from "recoil";
import FilterButtons from "../components/common/FilterButtons";

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.primary};
`;

const ContentContainer = styled.div`
  position: relative;
  margin-top: -60px; // Banner와의 겹침 효과
  padding-bottom: 50px; // 하단 여백 추가
`;

function Movies() {
  const [selectedCategory] = useRecoilState(mediaFilterState("movies"));

  const { data: trendingData, isLoading: isTrendingLoading } =
    useQuery<IGetMoviesResponse>({
      queryKey: ["movies", "trending"],
      queryFn: getTrendingMovies,
    });

  const { data: popularData, isLoading: isPopularLoading } =
    useQuery<IGetMoviesResponse>({
      queryKey: ["movies", "popular"],
      queryFn: () => getPopularMovies(),
    });

  const { data: topRatedData, isLoading: isTopRatedLoading } =
    useQuery<IGetMoviesResponse>({
      queryKey: ["movies", "topRated"],
      queryFn: () => getTopRatedMovies(),
    });

  const isLoading = isTrendingLoading || isPopularLoading || isTopRatedLoading;

  const getFilteredContent = () => {
    switch (selectedCategory) {
      case "mustWatch":
        return topRatedData?.results;
      case "trending":
        return trendingData?.results;
      case "popular":
        return popularData?.results;
      case "all":
        return [
          ...(topRatedData?.results || []),
          ...(trendingData?.results || []),
          ...(popularData?.results || []),
        ];
      default:
        return [];
    }
  };
  const filteredContent = getFilteredContent();

  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          {trendingData?.results[0] && (
            <Banner mediaData={trendingData.results[0]} />
          )}
          <ContentContainer>
            <FilterButtons mediaType="movies" />
            {filteredContent && (
              <MediaGrid
                data={filteredContent}
                mediaType="movie"
                title="" // GridTitle을 표시하지 않도록 빈 문자열 전달
              />
            )}
          </ContentContainer>
        </>
      )}
    </Wrapper>
  );
}
export default Movies;

//jetflix
