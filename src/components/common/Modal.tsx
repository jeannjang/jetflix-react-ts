import { motion, AnimatePresence } from "motion/react";
import styled from "styled-components";
import { makeImagePath } from "../../utils/imagePath";
import { IMovie } from "../../api/moviesApi";
import { ITvSeries } from "../../api/tvApi";
import { useRecoilState } from "recoil";
import { myListState, MyListItem } from "../../atoms/myListState";
import { Plus, Check } from "lucide-react";
import { useLocation } from "react-router-dom";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId?: string;
  mediaData?: IMovie | ITvSeries;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.black.primaryTransparent};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.black.second};
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  // 모바일: 95% 너비
  width: 95%;
  height: 90vh;

  // 태블릿 이상: 고정 크기
  @media (min-width: 768px) {
    width: 700px;
    height: 90vh;
    max-height: 800px;
  }
`;

const BannerImage = styled.div<{ $bgPhoto: string }>`
  height: 300px;
  background-image: linear-gradient(
      to bottom,
      transparent 40%,
      ${(props) => props.theme.black.second}
    ),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center top;
  padding-bottom: 56.25%;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${(props) => props.theme.black.thirdTransparent};
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.white.primary};
  z-index: 1;

  &:hover {
    background: ${(props) => props.theme.black.third};
  }
`;
const MyListButton = styled.button`
  position: relative;
  margin: -10px 20px 15px;
  background: ${(props) => props.theme.white.secondTransparent};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.white.primary};
  z-index: 2; // 배너 이미지 위에 오도록 z-index 설정

  &:hover {
    background: ${(props) => props.theme.black.third};
  }

  &.active {
    background: ${(props) => props.theme.white.secondTransparent};
  }
`;

const ModalContent = styled.div`
  padding: 0 20px 20px;
  color: ${(props) => props.theme.white.primary};
`;

const ModalTitle = styled.h2`
  font-family: "Bebas Neue", sans-serif;
  font-size: 24px;
  margin-bottom: 10px;
`;

const MediaType = styled.div`
  color: ${(props) => props.theme.white.second};
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const MetaInfo = styled.div`
  color: ${(props) => props.theme.white.second};
  font-size: 12px;
  margin-bottom: 15px;
`;

const Overview = styled.p`
  font-size: 13px;
  font-weight: 300;
  line-height: 1.5;
  color: ${(props) => props.theme.white.primary};
`;

function Modal({ isOpen, onClose, mediaData, layoutId }: IModalProps) {
  const [myList, setMyList] = useRecoilState(myListState);
  const location = useLocation();

  const getTitle = (data?: IMovie | ITvSeries) => {
    if (!data) return "";
    return "title" in data ? data.title : data.name;
  };

  const getDate = (data?: IMovie | ITvSeries) => {
    if (!data) return "";
    return "release_date" in data ? data.release_date : data.first_air_date;
  };

  const getMediaType = (data?: IMovie | ITvSeries) => {
    if (!data) return "";
    return "title" in data ? "Movie" : "Series";
  };

  const isInMyList = mediaData
    ? myList.some((item) => item.id === mediaData.id)
    : false;

  const handleMyList = () => {
    if (!mediaData) return;

    // mediaData가 영화인지 시리즈인지 확인
    const isMovie = "title" in mediaData;

    const newItem: MyListItem = {
      ...mediaData, // 기본 속성들 복사
      title: isMovie ? mediaData.title : mediaData.name,
      name: isMovie ? mediaData.title : mediaData.name,
      mediaType: isMovie ? "movies" : "series",
    };

    if (isInMyList) {
      setMyList((current) =>
        current.filter((item) => item.id !== mediaData.id)
      );
      // MyList 페이지에서 제거할 때만 모달창 닫기
      if (location.pathname.includes("/browse/my-list")) {
        onClose();
      }
    } else {
      setMyList((current) => [...current, newItem]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            layoutId={layoutId}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>

            {mediaData && (
              <>
                <BannerImage
                  $bgPhoto={makeImagePath(mediaData.backdrop_path, "w780")}
                />
                <MyListButton
                  onClick={handleMyList}
                  className={isInMyList ? "active" : ""}
                >
                  {isInMyList ? <Check size={20} /> : <Plus size={20} />}
                </MyListButton>
                <ModalContent>
                  <ModalTitle>{getTitle(mediaData)}</ModalTitle>
                  <MediaType>{getMediaType(mediaData)}</MediaType>
                  <MetaInfo>
                    {getDate(mediaData)} • ⭐️{" "}
                    {mediaData.vote_average.toFixed(1)}
                  </MetaInfo>
                  <Overview>{mediaData.overview}</Overview>
                </ModalContent>
              </>
            )}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default Modal;

//jetflix
