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
import { moviesFilterState } from "../atoms/filterMedia";
import { useRecoilState } from "recoil";
import FilterButtons from "../components/common/FilterButtons";
import Spinner from "../components/utility/Spinner";

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  margin-top: -60px; // Banner와의 겹침 효과
  padding-bottom: 50px; // 하단 여백 추가
`;

function Movies() {
  const [selectedCategory] = useRecoilState(moviesFilterState);

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
      case "all": {
        const allContent = [
          ...(topRatedData?.results || []),
          ...(trendingData?.results || []),
          ...(popularData?.results || []),
        ];

        // id를 기준으로 중복 제거
        const uniqueContent = allContent.reduce((unique, item) => {
          const exists = unique.find((u) => u.id === item.id);
          if (!exists) {
            unique.push(item);
          }
          return unique;
        }, [] as typeof allContent);

        return uniqueContent;
      }
      default:
        return [];
    }
  };
  const filteredContent = getFilteredContent();

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {trendingData?.results[0] && (
            <Banner mediaData={trendingData.results[0]} />
          )}
          <ContentContainer>
            <FilterButtons mediaType="movies" />
            {filteredContent && (
              <MediaGrid data={filteredContent} mediaType="movies" />
            )}
          </ContentContainer>
        </>
      )}
    </Wrapper>
  );
}
export default Movies;

//jetflix
