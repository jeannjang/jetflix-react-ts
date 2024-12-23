import styled from "styled-components";
import { motion } from "motion/react";
import { IMovie } from "../../api/moviesApi";
import { ITvSeries } from "../../api/tvApi";
import { MediaType } from "../../atoms/filterMedia";
import { makeImagePath } from "../../utils/imagePath";
import { useNavigate, useMatch, useLocation } from "react-router-dom";
import Modal from "./Modal";

interface IMediaGridProps {
  data: (IMovie | ITvSeries)[];
  mediaType: MediaType;
}

const GridSection = styled.section`
  padding: clamp(20px, 4vw, 50px);
  margin-top: 10px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
  position: relative;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const PosterCard = styled(motion.div)`
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: visible;
  aspect-ratio: 2/3;
  background-color: ${(props) => props.theme.black.second};
  &:hover {
    z-index: 99;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  transform-origin: center center;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }
`;

function MediaGrid({ data, mediaType }: IMediaGridProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyList = location.pathname.includes("my-list");

  const browseMatch = useMatch(`/browse/${mediaType}/:id`);
  const myListMatch = useMatch(`/browse/my-list/${mediaType}/:id`);
  const modalMatch = isMyList ? myListMatch : browseMatch;

  const getTitle = (item: IMovie | ITvSeries) => {
    return "title" in item ? item.title : item.name;
  };

  const onModalClicked = (id: number) => {
    if (isMyList) {
      navigate(`/browse/my-list/${mediaType}/${id}`);
    } else {
      navigate(`/browse/${mediaType}/${id}`);
    }
  };

  const onModalClose = () => {
    navigate(-1);
  };

  const clickedItem = modalMatch?.params.id
    ? data.find((item) => item.id === Number(modalMatch.params.id))
    : undefined;

  return (
    <GridSection>
      <GridContainer>
        {data.map((item) => (
          <PosterCard
            key={item.id}
            whileHover="hover"
            initial="normal"
            layoutId={item.id.toString()}
            onClick={() => onModalClicked(item.id)}
          >
            <PosterImage
              src={makeImagePath(item.poster_path, "w500")}
              alt={getTitle(item)}
            />
          </PosterCard>
        ))}
      </GridContainer>

      <Modal
        isOpen={!!modalMatch}
        onClose={onModalClose}
        mediaData={clickedItem}
        layoutId={modalMatch?.params.id || ""}
      />
    </GridSection>
  );
}

export default MediaGrid;

//jetflix
