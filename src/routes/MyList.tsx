import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { myListState } from "../atoms/myListState";
import MediaGrid from "../components/common/MediaGrid";
import { IMovie } from "../api/moviesApi";
import { ITvSeries } from "../api/tvApi";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white.primary};
  padding: 0 clamp(20px, 4vw, 50px);
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${(props) => props.theme.white.second};
  font-size: 16px;
  margin-top: 40px;
  padding: 0 20px;
`;

function MyList() {
  const myList = useRecoilValue(myListState);

  const movies = myList.filter(
    (item) => item.mediaType === "movies"
  ) as IMovie[];
  const series = myList.filter(
    (item) => item.mediaType === "series"
  ) as ITvSeries[];

  return (
    <Wrapper>
      <Title>My List</Title>
      {myList.length === 0 ? (
        <EmptyMessage>
          Your list is empty. What do you want to keep?
        </EmptyMessage>
      ) : (
        <>
          {movies.length > 0 && <MediaGrid data={movies} mediaType="movies" />}
          {series.length > 0 && <MediaGrid data={series} mediaType="series" />}
        </>
      )}
    </Wrapper>
  );
}

export default MyList;

//jetflix
