import styled from "styled-components";
import { IMovie } from "../../api/moviesApi";
import { ITvSeries } from "../../api/tvApi";
import { makeImagePath } from "../../utils/imagePath";

interface IBannerProps {
  mediaData: IMovie | ITvSeries;
}

const BannerWrapper = styled.div<{ $bgPhoto: string }>`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; // 16:9 비율 유지를 위한 padding-bottom 설정

  background-image: linear-gradient(
      77deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 45%
    ),
    linear-gradient(
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 45%,
      rgba(0, 0, 0, 0.1) 90%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    url(${(props) => props.$bgPhoto});
  background-size: contain; // 전체 이미지가 보이도록
  background-repeat: no-repeat;
  background-position: center;
`;

const BannerContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(20px, 4vw, 50px);
  transition: padding 0.3s linear;
`;

const Title = styled.h2`
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(18px, 4vw, 42px);
  margin-bottom: 10px;
  transition: font-size 0.3s linear, margin-bottom 0.3s linear;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 0px;

  @media (max-width: 768px) {
    margin-top: 0px;
    flex-wrap: wrap;
  }
`;

const InfoButton = styled.button`
  padding: 9px 33px;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  font-size: clamp(8px, 1.3vw, 16px);
  cursor: pointer;
  transition: padding 0.3s linear, font-size 0.3s linear;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.theme.white.secondTransparent};
  color: ${(props) => props.theme.white.primary};

  &:hover {
    background-color: ${(props) => props.theme.black.thirdTransparent};
  }

  @media (max-width: 768px) {
    padding: 3px 11px;
  }
`;

function Banner({ mediaData }: IBannerProps) {
  const getTitle = (data: IMovie | ITvSeries) => {
    return "title" in data ? data.title : data.name;
  };

  return (
    <BannerWrapper $bgPhoto={makeImagePath(mediaData.backdrop_path)}>
      <BannerContent>
        <Title>{getTitle(mediaData)}</Title>
        <ButtonGroup>
          <InfoButton>More Info</InfoButton>
        </ButtonGroup>
      </BannerContent>
    </BannerWrapper>
  );
}

export default Banner;

//jetflix
