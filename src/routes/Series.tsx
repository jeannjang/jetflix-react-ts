import { useQuery } from "@tanstack/react-query";
import {
  getTrendingTvSeries,
  getTopRatedTvSeries,
  getPopularTvSeries,
  IGetTvSeriesResponse,
} from "../api/tvApi";
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
  margin-top: -60px;
  padding-bottom: 50px;
`;

function Series() {
  const [selectedCategory] = useRecoilState(mediaFilterState("series"));

  const { data: trendingData, isLoading: isTrendingLoading } =
    useQuery<IGetTvSeriesResponse>({
      queryKey: ["series", "trending"],
      queryFn: getTrendingTvSeries,
    });

  const { data: popularData, isLoading: isPopularLoading } =
    useQuery<IGetTvSeriesResponse>({
      queryKey: ["series", "popular"],
      queryFn: () => getPopularTvSeries(),
    });

  const { data: topRatedData, isLoading: isTopRatedLoading } =
    useQuery<IGetTvSeriesResponse>({
      queryKey: ["series", "topRated"],
      queryFn: () => getTopRatedTvSeries(),
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
        <Loading>Loading...</Loading>
      ) : (
        <>
          {trendingData?.results[0] && (
            <Banner mediaData={trendingData.results[0]} />
          )}
          <ContentContainer>
            <FilterButtons mediaType="series" />
            {filteredContent && (
              <MediaGrid data={filteredContent} mediaType="series" />
            )}
          </ContentContainer>
        </>
      )}
    </Wrapper>
  );
}

export default Series;

//jetflix
