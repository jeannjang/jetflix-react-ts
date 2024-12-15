import { useQuery } from "@tanstack/react-query";
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

function Series() {
  const { data, isLoading } = useQuery<IGetTvSeriesResponse>({
    queryKey: ["movies", "trending"],
    queryFn: getTrendingTvSeries,
  });

  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        data?.results[0] && <Banner mediaData={data.results[0]} />
      )}
    </Wrapper>
  );
}

export default Series;

//jetflix
