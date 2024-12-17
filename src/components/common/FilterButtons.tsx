// components/common/FilterButtons.tsx
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { mediaFilterState, MediaType } from "../../atoms/filterMedia";

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: clamp(20px, 4vw, 50px);
`;

const FilterButton = styled.button`
  padding: 7px 30px;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  font-size: clamp(8px, 1.3vw, 16px);
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.theme.white.secondTransparent};
  color: ${(props) => props.theme.white.primary};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.black.thirdTransparent};
  }

  &.active {
    background-color: ${(props) => props.theme.black.thirdTransparent};
  }
`;

interface FilterButtonsProps {
  mediaType: MediaType;
}

function FilterButtons({ mediaType }: FilterButtonsProps) {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    mediaFilterState(mediaType)
  );

  return (
    <ButtonContainer>
      <FilterButton
        className={selectedCategory === "all" ? "active" : ""}
        onClick={() => setSelectedCategory("all")}
      >
        All
      </FilterButton>
      <FilterButton
        className={selectedCategory === "mustWatch" ? "active" : ""}
        onClick={() => setSelectedCategory("mustWatch")}
      >
        Must Watch
      </FilterButton>
      <FilterButton
        className={selectedCategory === "trending" ? "active" : ""}
        onClick={() => setSelectedCategory("trending")}
      >
        Trending Now
      </FilterButton>
      <FilterButton
        className={selectedCategory === "popular" ? "active" : ""}
        onClick={() => setSelectedCategory("popular")}
      >
        Popular
      </FilterButton>
    </ButtonContainer>
  );
}

export default FilterButtons;

//jetflix
